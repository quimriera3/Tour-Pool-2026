import { getPreviewArticle } from "../../../../lib/previewArticle";
import PreviewArticleContent from "../../../../components/PreviewArticleContent";
const RACE = "worlds-2026-women";
const article = getPreviewArticle("es", RACE);
export const metadata = { title: article.metaTitle, description: article.metaDescription, alternates: { canonical: "/es/women/preview", languages: { en: "/women/preview", es: "/es/women/preview" } } };
export default function Preview() { return <PreviewArticleContent lang="es" variant="page" raceSlug={RACE} />; }
