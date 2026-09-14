// lib/translate.js
//
// SERVER-ONLY. Thin wrapper around the DeepL API. Requires DEEPL_API_KEY in
// Vercel's environment variables (free tier: 500,000 characters/month).
const DEEPL_CODES = {
  en: "EN-GB",
  es: "ES",
  ca: "CA",
  fr: "FR",
  it: "IT",
  nl: "NL",
};

// Translates one or more strings from sourceLang to targetLang. Pass
// isHtml=true to preserve HTML tags (e.g. "<b>...</b>") and only translate
// the text inside them -- this is what we want for the rich-text email body.
export async function translateText(texts, sourceLang, targetLang, isHtml) {
  if (sourceLang === targetLang) {
    return Array.isArray(texts) ? texts : [texts];
  }
  if (!process.env.DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY is not set on the server.");
  }

  const body = {
    text: Array.isArray(texts) ? texts : [texts],
    source_lang: DEEPL_CODES[sourceLang] ? DEEPL_CODES[sourceLang].split("-")[0] : undefined,
    target_lang: DEEPL_CODES[targetLang] || targetLang.toUpperCase(),
    tag_handling: isHtml ? "html" : undefined,
  };

  const apiUrl = process.env.DEEPL_API_URL || "https://api-free.deepl.com/v2/translate";
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: "DeepL-Auth-Key " + process.env.DEEPL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || "DeepL request failed with status " + res.status);
  }

  const data = await res.json();
  return data.translations.map((t) => t.text);
}
