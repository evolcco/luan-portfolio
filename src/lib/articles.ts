import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "src/content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  /** short kicker / section, e.g. "Ensaio · Sistemas". */
  topic: string;
  /** standfirst / deck shown under the title. */
  deck: string;
  author: string;
  date: string; // ISO "2026-05-12"
  /** human reading estimate, e.g. "6 min de leitura". */
  readingTime?: string;
  cover?: string;
  summary?: string;
};

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<ArticleMeta, "slug">) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(
  slug: string,
): { meta: ArticleMeta; content: string } | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<ArticleMeta, "slug">) }, content };
}

/** "2026-05-12" (or a YAML-parsed Date) → "12 mai 2026" (pt-BR, compact). */
export function formatDate(iso: string | Date): string {
  const s =
    iso instanceof Date ? iso.toISOString().slice(0, 10) : String(iso);
  const [y, m, d] = s.split("-").map(Number);
  const months = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ];
  if (!y || !m || !d) return s;
  return `${d} ${months[m - 1]} ${y}`;
}
