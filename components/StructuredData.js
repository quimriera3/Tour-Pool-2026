// components/StructuredData.js
import { getWebSiteSchema, getSportsEventSchema } from "../lib/structuredData";

export default function StructuredData({ lang }) {
  const website = getWebSiteSchema(lang);
  const sportsEvent = getSportsEventSchema(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEvent) }}
      />
    </>
  );
}
