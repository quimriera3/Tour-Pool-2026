// app/api/admin/save-final-results/route.js
//
// Server-side only. Called from the admin panel's "Final jersey winners"
// section, once the Tour is over. Upserts the single id=1 row in
// final_results with the real winner of each of the 4 jerseys. There is
// deliberately no public write policy on that table -- only the service
// role key (used here) can write to it.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { riderById } from "../../../../lib/data";

export async function POST(request) {
  const { password, yellow, green, polka, white } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  }
  if (!yellow || !green || !polka || !white) {
    return NextResponse.json({ error: "All 4 jersey winners are required." }, { status: 400 });
  }
  for (const id of [yellow, green, polka, white]) {
    if (!riderById(id)) {
      return NextResponse.json({ error: "One of the selected riders was not recognised." }, { status: 400 });
    }
  }

  const { error } = await supabaseAdmin
    .from("final_results")
    .upsert({ id: 1, yellow, green, polka, white }, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
