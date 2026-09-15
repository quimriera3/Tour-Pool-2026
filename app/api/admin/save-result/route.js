import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRace, ACTIVE_RACE_SLUG } from "../../../../lib/races";
import { riderById, riderEligibleForStage } from "../../../../lib/data";

export async function POST(request) {
  const { password, race: requestedRace, stageNumber, first, second, third } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });

  const race = getRace(requestedRace || ACTIVE_RACE_SLUG);
  if (!race) return NextResponse.json({ error: "Unknown race." }, { status: 400 });
  const n = Number(stageNumber);
  const stage = race.stages.find((s) => s.n === n);
  if (!stage) return NextResponse.json({ error: "Not a valid event number for this race." }, { status: 400 });
  if (!first || !second || !third) return NextResponse.json({ error: "Winner, 2nd and 3rd are all required." }, { status: 400 });
  if (new Set([first, second, third]).size !== 3) return NextResponse.json({ error: "Winner, 2nd and 3rd must be three different riders." }, { status: 400 });
  const podiumRiders = [first, second, third].map((id) => riderById(id, race));
  if (podiumRiders.some((rider) => !rider)) return NextResponse.json({ error: "One of the selected riders is not in this race's startlist." }, { status: 400 });
  if (!podiumRiders.every((rider) => riderEligibleForStage(rider, stage))) return NextResponse.json({ error: "One of the selected riders is not eligible for this event." }, { status: 400 });

  const { error } = await supabaseAdmin.from("results")
    .upsert({ race: race.slug, stage_number: n, first, second, third }, { onConflict: "race,stage_number" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, saved: true, race: race.slug, stageNumber: n });
}
