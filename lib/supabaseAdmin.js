// lib/supabaseAdmin.js
//
// SERVER-ONLY. Uses the Supabase service role key, which can read everything
// (including real emails from auth.users) bypassing Row Level Security. This
// file must never be imported from a "use client" component or sent to the
// browser -- it's only ever used inside app/api/admin/route.js, which runs on
// the server.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;
