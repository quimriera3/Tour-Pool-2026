import { getPreviewArticle } from "../../../lib/previewArticle";
import PreviewArticleContent from "../../../components/PreviewArticleContent";

const article = getPreviewArticle("nl");

export const metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
  alternates: { canonical: "/nl/preview" },
  robots: { index: true, follow: true },
};

export default function Preview() {
  return <PreviewArticleContent lang="nl" variant="page" />;
}
