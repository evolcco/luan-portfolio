import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle, getArticleSlugs } from "@/lib/articles";
import { articleComponents } from "@/components/article/components";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { MoreReading } from "@/components/article/MoreReading";
import styles from "@/components/article/article.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getArticle(slug);
  if (!data) return {};
  return {
    title: `${data.meta.title}, Luan Andrade`,
    description: data.meta.summary ?? data.meta.deck,
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const data = getArticle(slug);
  if (!data) notFound();

  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

  return (
    <main>
      <ArticleHeader meta={data.meta} />
      <article className={styles.body}>
        <MDXRemote source={data.content} components={articleComponents} />
      </article>
      {next ? <MoreReading meta={next} /> : null}
    </main>
  );
}
