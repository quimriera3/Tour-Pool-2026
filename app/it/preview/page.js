import { getPreviewArticle } from "../../../lib/previewArticle";
import PreviewArticleContent from "../../../components/PreviewArticleContent";

const article = getPreviewArticle("it");

export const metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
  alternates: { canonical: "/it/preview" },
  robots: { index: true, follow: true },
};

export default function Preview() {
  return <PreviewArticleContent lang="it" variant="page" />;
}
