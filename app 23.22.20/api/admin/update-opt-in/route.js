// app/api/admin/update-opt-in/route.js
//
// Server-side only. Lets you flip a single user's email_opt_in preference
// -- e.g. when someone emails you asking to be added or removed.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const { password, userId, emailOptIn } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  }
  if (!userId) {
    return NextResponse.json({ error: "userId is required." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ email_opt_in: emailOptIn === true })
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
