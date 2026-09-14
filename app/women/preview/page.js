// app/women/preview/page.js
import { getPreviewArticle } from "../../../lib/previewArticle";
import PreviewArticleContent from "../../../components/PreviewArticleContent";

const RACE = "worlds-2026-women";
const article = getPreviewArticle("en", RACE);

export const metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
};

export default function WomenPreview() {
  return <PreviewArticleContent lang="en" variant="page" raceSlug={RACE} />;
}
