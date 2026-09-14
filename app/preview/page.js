import { getPreviewArticle } from "../../lib/previewArticle";
import PreviewArticleContent from "../../components/PreviewArticleContent";

const article = getPreviewArticle("en");

export const metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
  alternates: { canonical: "/preview", languages: { en: "/preview", es: "/es/preview" } },
};

export default function Preview() {
  return <PreviewArticleContent lang="en" variant="page" />;
}
