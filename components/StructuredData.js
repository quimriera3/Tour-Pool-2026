import { getWebSiteSchema, getSportsEventSchema } from "../lib/structuredData";
export default function StructuredData({ lang = "en", raceSlug }) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteSchema(lang, raceSlug)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSportsEventSchema(lang, raceSlug)) }} />
  </>;
}
