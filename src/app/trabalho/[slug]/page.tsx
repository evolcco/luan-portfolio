import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCase, getCaseSlugs } from "@/lib/cases";
import { mdxComponents } from "@/components/mdx/components";
import { CaseHeader } from "@/components/case/CaseHeader";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return {};
  return {
    title: `${data.meta.title} — Luan Andrade`,
    description: data.meta.summary,
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) notFound();

  return (
    <main>
      <CaseHeader meta={data.meta} />
      <article>
        <MDXRemote source={data.content} components={mdxComponents} />
      </article>
    </main>
  );
}
