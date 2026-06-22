// lib/seo.js
export const LANGUAGES = {
  en: "/",
  es: "/es",
  fr: "/fr",
  it: "/it",
  nl: "/nl",
  ca: "/ca",
  "x-default": "/",
};

export function alternatesFor(path) {
  return {
    canonical: path,
    languages: LANGUAGES,
  };
}
