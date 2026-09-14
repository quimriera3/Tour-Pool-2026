import { getPreviewArticle } from "../../../lib/previewArticle";
import PreviewArticleContent from "../../../components/PreviewArticleContent";

const article = getPreviewArticle("es");

export const metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
  alternates: { canonical: "/es/preview", languages: { en: "/preview", es: "/es/preview" } },
};

export default function Preview() {
  return <PreviewArticleContent lang="es" variant="page" />;
}
