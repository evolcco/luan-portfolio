import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCases, getCase, getCaseSlugs } from "@/lib/cases";
import { mdxComponents } from "@/components/mdx/components";
import mdxStyles from "@/components/mdx/mdx.module.css";
import { CaseHeader } from "@/components/case/CaseHeader";
import { NextCase } from "@/components/case/NextCase";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return {};
  return {
    title: `${data.meta.title}, Luan Andrade`,
    description: data.meta.summary,
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) notFound();

  const all = getAllCases();
  const idx = all.findIndex((c) => c.slug === slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

  return (
    <main>
      <CaseHeader meta={data.meta} />
      <article className={mdxStyles.colorScope}>
        <MDXRemote source={data.content} components={mdxComponents} />
      </article>
      {next ? <NextCase meta={next} /> : null}
    </main>
  );
}
