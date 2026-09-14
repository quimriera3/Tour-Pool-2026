import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRace, ACTIVE_RACE_SLUG, hasJerseys } from "../../../../lib/races";
import { riderById } from "../../../../lib/data";

export async function POST(request) {
  const { password, race: requestedRace, yellow, green, polka, white } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  const race = getRace(requestedRace || ACTIVE_RACE_SLUG);
  if (!race) return NextResponse.json({ error: "Unknown race." }, { status: 400 });
  if (!hasJerseys(race)) return NextResponse.json({ error: "This race has no jersey classifications." }, { status: 400 });
  const ids = [yellow, green, polka, white];
  if (ids.some((id) => !id)) return NextResponse.json({ error: "All 4 jersey winners are required." }, { status: 400 });
  if (ids.some((id) => !riderById(id, race))) return NextResponse.json({ error: "One selected rider is not in this race." }, { status: 400 });
  const { error } = await supabaseAdmin.from("final_results")
    .upsert({ race: race.slug, yellow, green, polka, white }, { onConflict: "race" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
