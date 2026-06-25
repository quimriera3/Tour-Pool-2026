// app/es/page.js
//
// Same component as app/page.js (the Dashboard) -- it detects the language
// itself from the URL via useLang(), so there's only one real
// implementation to maintain. SEO metadata for this route lives in
// app/es/layout.js since this file can't export metadata (the Dashboard is
// a client component).
export { default } from "../page";
