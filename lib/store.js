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
import { STAGES, pointsForPick } from "./data";

// --- Auth ---------------------------------------------------------------

export async function registerUser(name, email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };

  // If email confirmation is ON, there may be no active session yet -- the
  // profile insert below still works because Supabase issues the user a
  // temporary session during sign-up in most project configurations.
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, name });
    if (profileError) return { ok: false, error: profileError.message };
  }
  return { ok: true };
}

export async function loginUser(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
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

export async function savePick(userId, stageN, riderId) {
  const { error } = await supabase
    .from("picks")
    .upsert({ user_id: userId, stage_number: stageN, rider_id: riderId }, { onConflict: "user_id,stage_number" });
  if (error) console.error("savePick error:", error.message);
}

export async function getPicksFor(userId) {
  if (!userId) return {};
  const { data, error } = await supabase.from("picks").select("stage_number, rider_id").eq("user_id", userId);
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

async function getAllPicks() {
  const { data, error } = await supabase.from("picks").select("user_id, stage_number, rider_id");
  if (error) {
    console.error("getAllPicks error:", error.message);
    return [];
  }
  return data || [];
}

// --- Results (entered by you directly in the Supabase Table Editor) -----

export async function getResults() {
  const { data, error } = await supabase.from("results").select("stage_number, first, second, third");
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

export async function saveFinals(userId, finals) {
  const { error } = await supabase
    .from("finals")
    .upsert({ user_id: userId, ...finals }, { onConflict: "user_id" });
  if (error) console.error("saveFinals error:", error.message);
}

export async function getFinalsFor(userId) {
  if (!userId) return {};
  const { data, error } = await supabase
    .from("finals")
    .select("yellow, green, polka, white")
    .eq("user_id", userId)
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
export async function getFinalResults() {
  const { data, error } = await supabase
    .from("final_results")
    .select("yellow, green, polka, white")
    .eq("id", 1)
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

export async function computeLeaderboard() {
  const [{ data: profiles, error: profileError }, picks, results, allFinals, finalResults] = await Promise.all([
    supabase.from("profiles").select("id, name"),
    getAllPicks(),
    getResults(),
    supabase.from("finals").select("user_id, yellow, green, polka, white"),
    getFinalResults(),
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

  return (profiles || [])
    .map((u) => {
      const userPicks = picksByUser[u.id] || {};
      let total = 0;
      let correctCount = 0;
      const lastFive = [];
      STAGES.forEach((stage) => {
        const result = results[stage.n];
        if (!result) return;
        const pts = pointsForPick(userPicks[stage.n], result);
        total += pts;
        if (pts === 10) correctCount += 1;
        lastFive.push(pts > 0);
      });
      total += pointsForFinals(finalsByUser[u.id], finalResults);
      return {
        name: u.name,
        id: u.id,
        total,
        correctCount,
        lastFive: lastFive.slice(-5),
      };
    })
    .sort((a, b) => b.total - a.total);
}
