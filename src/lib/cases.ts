import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "src/content/cases");

export type Metric = { value: string; label: string };

export type CaseMeta = {
  slug: string;
  title: string;
  category: string;
  year: number;
  client?: string;
  role?: string;
  summary: string;
  /** Public path to the cover image, e.g. "/images/case-arch.jpg". */
  cover?: string;
  metrics?: Metric[];
};

export function getCaseSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllCases(): CaseMeta[] {
  return getCaseSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<CaseMeta, "slug">) };
    })
    .sort((a, b) => b.year - a.year);
}

export function getCase(
  slug: string,
): { meta: CaseMeta; content: string } | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<CaseMeta, "slug">) }, content };
}
