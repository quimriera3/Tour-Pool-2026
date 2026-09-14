"use client";
// lib/store.js
// Real shared backend, backed by Supabase (Postgres + Auth). Every signed-up user
// shares the same data, so the leaderboard is the same for everyone -- unlike the
// old localStorage-only prototype.
//
// Required setup (see README.md):
// 1. Create a free project at supabase.com
// 2. Run the SQL in supabase-schema.sql (SQL Editor) to create the tables
// 3. In Vercel, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// 4. In Supabase, Authentication > Providers > Email, turn OFF "Confirm email"
//    so people can sign up and play immediately without checking their inbox.

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { STAGES, pointsForPick, ACTIVE_RACE_SLUG, getRace } from "./data";

// --- Auth ---------------------------------------------------------------

export async function registerUser(name, email, password, preferredLanguage, emailOptIn) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };

  // A database trigger (see supabase-schema.sql) already created a baseline
  // profile row the instant the auth account was made -- this just fills in
  // the real name and preferences the person actually chose. If this fails
  // (e.g. no session yet because email confirmation is required), we don't
  // block sign-up over it: thanks to the trigger, they still have a working
  // account and a profile row, just possibly with a placeholder name until
  // they log in again.
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        name,
        email_opt_in: emailOptIn === true,
        preferred_language: preferredLanguage || "en",
      });
    if (profileError) {
      console.error("Could not save profile details (non-blocking):", profileError.message);
    }
  }
  return { ok: true };
}

export async function loginUser(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function requestPasswordReset(email) {
  const redirectTo = (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin) + "/reset-password";
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function logoutUser() {
  await supabase.auth.signOut();
}

function mapAuthUser(user) {
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.user_metadata?.name || user.email };
}

// React hook giving the current session, kept in sync with Supabase auth state.
export function useSession() {
  const [session, setSession] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      await hydrate(data.session);
      setLoaded(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => {
      hydrate(authSession);
    });

    async function hydrate(authSession) {
      if (!authSession?.user) {
        setSession(null);
        return;
      }
      // Prefer the display name stored in profiles (always available),
      // falling back to auth metadata or the email.
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", authSession.user.id)
        .maybeSingle();
      setSession({
        id: authSession.user.id,
        email: authSession.user.email,
        name: profile?.name || mapAuthUser(authSession.user).name,
      });
    }

    return () => listener.subscription.unsubscribe();
  }, []);

  return loaded ? session : session; // session is null until loaded; ready state handled by callers via loaded if needed
}

// --- Picks ---------------------------------------------------------------

export async function savePick(userId, stageN, riderId, race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { error } = await supabase
    .from("picks")
    .upsert(
      { user_id: userId, race: raceSlug, stage_number: stageN, rider_id: riderId },
      { onConflict: "user_id,race,stage_number" }
    );
  if (error) {
    console.error("savePick error:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function getPicksFor(userId, race) {
  if (!userId) return {};
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { data, error } = await supabase
    .from("picks")
    .select("stage_number, rider_id")
    .eq("user_id", userId)
    .eq("race", raceSlug);
  if (error) {
    console.error("getPicksFor error:", error.message);
    return {};
  }
  const map = {};
  (data || []).forEach((row) => {
    map[row.stage_number] = row.rider_id;
  });
  return map;
}

async function getAllPicks(race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { data, error } = await supabase
    .from("picks")
    .select("user_id, stage_number, rider_id")
    .eq("race", raceSlug);
  if (error) {
    console.error("getAllPicks error:", error.message);
    return [];
  }
  return data || [];
}

// --- Results (entered by you directly in the Supabase Table Editor) -----

export async function getResults(race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { data, error } = await supabase
    .from("results")
    .select("stage_number, first, second, third")
    .eq("race", raceSlug);
  if (error) {
    console.error("getResults error:", error.message);
    return {};
  }
  const map = {};
  (data || []).forEach((row) => {
    map[row.stage_number] = { first: row.first, second: row.second, third: row.third };
  });
  return map;
}

// --- Final classification picks ------------------------------------------

export async function saveFinals(userId, finals, race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { error } = await supabase
    .from("finals")
    .upsert({ user_id: userId, race: raceSlug, ...finals }, { onConflict: "user_id,race" });
  if (error) console.error("saveFinals error:", error.message);
}

export async function getFinalsFor(userId, race) {
  if (!userId) return {};
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { data, error } = await supabase
    .from("finals")
    .select("yellow, green, polka, white")
    .eq("user_id", userId)
    .eq("race", raceSlug)
    .maybeSingle();
  if (error) {
    console.error("getFinalsFor error:", error.message);
    return {};
  }
  return data || {};
}

// The real, final winner of each of the 4 jerseys, once the Tour is over.
// You enter this yourself in Supabase (Table Editor > final_results), a
// single row with id = 1. Until that row exists, this just returns {} and
// jersey points simply don't count yet -- which is correct, since there's
// nothing to compare against during the race.
export async function getFinalResults(race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const { data, error } = await supabase
    .from("final_results")
    .select("yellow, green, polka, white")
    .eq("race", raceSlug)
    .maybeSingle();
  if (error) {
    console.error("getFinalResults error:", error.message);
    return {};
  }
  return data || {};
}

// 10 points for each jersey category where the user's pick matches the real
// final winner. Categories with no real result yet (final_results not filled
// in) simply contribute 0 -- they're not counted as wrong.
export function pointsForFinals(userFinals, finalResults) {
  if (!userFinals || !finalResults) return 0;
  const categories = ["yellow", "green", "polka", "white"];
  return categories.reduce((sum, cat) => {
    if (finalResults[cat] && userFinals[cat] && userFinals[cat] === finalResults[cat]) {
      return sum + 10;
    }
    return sum;
  }, 0);
}

// --- Leaderboard -----------------------------------------------------------

export async function computeLeaderboard(race) {
  const raceSlug = race || ACTIVE_RACE_SLUG;
  const raceDef = getRace(raceSlug);
  const raceStages = raceDef ? raceDef.stages : STAGES;
  const [{ data: profiles, error: profileError }, picks, results, allFinals, finalResults] = await Promise.all([
    supabase.from("profiles").select("id, name"),
    getAllPicks(raceSlug),
    getResults(raceSlug),
    supabase.from("finals").select("user_id, yellow, green, polka, white").eq("race", raceSlug),
    getFinalResults(raceSlug),
  ]);

  if (profileError) {
    console.error("computeLeaderboard error:", profileError.message);
    return [];
  }

  const picksByUser = {};
  picks.forEach((p) => {
    picksByUser[p.user_id] = picksByUser[p.user_id] || {};
    picksByUser[p.user_id][p.stage_number] = p.rider_id;
  });

  const finalsByUser = {};
  (allFinals.data || []).forEach((f) => {
    finalsByUser[f.user_id] = f;
  });

  const rows = (profiles || []).filter((u) => {
    const userPicks = picksByUser[u.id] || {};
    const userFinals = finalsByUser[u.id] || {};
    return Object.keys(userPicks).length > 0 || Object.values(userFinals).some(Boolean);
  }).map((u) => {
    const userPicks = picksByUser[u.id] || {};
    let total = 0;
    let winnerCount = 0;
    let podiumCount = 0;
    const eventPoints = {};
    const lastFive = [];
    raceStages.forEach((stage) => {
      const result = results[stage.n];
      const pts = result ? pointsForPick(userPicks[stage.n], result) : 0;
      eventPoints[stage.n] = result ? pts : null;
      if (!result) return;
      total += pts;
      if (pts === 10) winnerCount += 1;
      if (pts > 0) podiumCount += 1;
      lastFive.push(pts > 0);
    });
    const userFinals = finalsByUser[u.id];
    const jerseysWon = ["yellow", "green", "polka", "white"].filter(
      (cat) => finalResults[cat] && userFinals && userFinals[cat] && userFinals[cat] === finalResults[cat]
    ).length;
    total += pointsForFinals(userFinals, finalResults);
    return {
      name: u.name,
      id: u.id,
      total,
      correctCount: winnerCount,
      winnerCount,
      podiumCount,
      jerseysWon,
      eventPoints,
      lastFive: lastFive.slice(-5),
    };
  });

  rows.sort((a, b) =>
    b.total - a.total ||
    b.winnerCount - a.winnerCount ||
    b.podiumCount - a.podiumCount ||
    a.name.localeCompare(b.name)
  );

  let previousKey = null;
  let previousRank = 0;
  return rows.map((row, index) => {
    const key = `${row.total}|${row.winnerCount}|${row.podiumCount}`;
    const rank = key === previousKey ? previousRank : index + 1;
    previousKey = key;
    previousRank = rank;
    return { ...row, rank };
  });
}
