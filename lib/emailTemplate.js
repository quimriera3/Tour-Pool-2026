// lib/emailTemplate.js
//
// SERVER-ONLY. Shared branded wrapper for every email the app sends
// (welcome email, admin reminders; password reset uses Supabase's own
// template separately). Pass in the body text -- everything else (header,
// countdown to the next stage, footer) is added automatically.
import { nextStage, stageStartDate } from "./data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

function countdownBlock() {
  const stage = nextStage();
  if (!stage) {
    return (
      '<tr><td style="background:#111111;padding:24px;text-align:center;">' +
      '<p style="color:#ffd400;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">That is a wrap</p>' +
      '<p style="color:#ffffff;font-size:16px;margin:10px 0 0;">All 21 stages are done. See you next July!</p>' +
      "</td></tr>"
    );
  }
  const diff = Math.max(0, stageStartDate(stage).getTime() - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const dateLabel = stage.date.split("-").reverse().join("/");

  return (
    '<tr><td style="background:#111111;padding:28px 24px;text-align:center;">' +
    '<p style="color:#ffd400;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">Next stage in</p>' +
    '<p style="color:#ffffff;font-size:32px;font-weight:900;margin:10px 0 0;font-family:Arial,sans-serif;">' +
    d + "d " + h + "h " + m + "m</p>" +
    '<p style="color:#cccccc;font-size:14px;margin:10px 0 0;">Stage ' + stage.n + ": " + stage.from + " to " + stage.to + " &middot; " + dateLabel + "</p>" +
    '<a href="' + SITE_URL + '/predictions" style="display:inline-block;margin-top:16px;background:#ffd400;color:#111111;font-weight:800;padding:11px 26px;border-radius:999px;text-decoration:none;font-size:14px;">Make your picks &rarr;</a>' +
    "</td></tr>"
  );
}

// bodyHtml: a string of already-escaped HTML (e.g. "<p>...</p><p>...</p>").
export function buildEmailHtml({ name, bodyHtml }) {
  return (
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;border:1px solid #eeeeee;">' +
    '<tr><td style="background:#111111;padding:22px 24px;text-align:center;">' +
    '<span style="color:#ffd400;font-weight:900;font-size:20px;letter-spacing:-0.5px;">TOUR DE FRANCE</span>' +
    '<span style="color:#ffffff;font-weight:900;font-size:20px;letter-spacing:-0.5px;"> POOL</span>' +
    "</td></tr>" +
    '<tr><td style="padding:26px 24px;color:#222222;font-size:15px;line-height:1.6;">' +
    "<p>Hi " + (name || "there") + ",</p>" +
    bodyHtml +
    "</td></tr>" +
    countdownBlock() +
    '<tr><td style="padding:16px 24px;text-align:center;font-size:11px;color:#999999;">' +
    "You are getting this because you opted in to essential game emails when you signed up for Tour de France Pool." +
    "</td></tr>" +
    "</table>"
  );
}

// Turns plain admin-written text (one paragraph per line) into safe HTML.
export function textToHtmlParagraphs(text) {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => "<p>" + escapeHtml(line) + "</p>")
    .join("");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
