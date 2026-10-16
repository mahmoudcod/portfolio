/**
 * Project data layer: merges curated Markdown content with live GitHub stats.
 * Used by every page that lists or renders projects.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { fetchRepos, byName, type RepoInfo } from './github';

/** All project images, resolved by Astro/Vite to hashed URLs with dimensions. */
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/**/assets/*.{svg,png,jpg,jpeg,webp,avif,gif}',
  { eager: true }
);
const imageByPath = new Map(Object.entries(imageModules).map(([k, v]) => [k, v.default]));

/**
 * Resolve a frontmatter image path ("./assets/cover.svg") relative to the
 * project's Markdown file. Convention: images live in <slug>/assets/.
 */
function resolveImage(entry: CollectionEntry<'projects'>, relPath: string): ImageMetadata {
  const key = `/src/content/projects/${entry.id}/${relPath.replace(/^\.\//, '')}`;
  const img = imageByPath.get(key);
  if (!img) {
    throw new Error(
      `[content] ${entry.id}: image "${relPath}" not found. Expected at src/content/projects/${entry.id}/${relPath.replace(/^\.\//, '')}`
    );
  }
  return img;
}

export type Project = {
  slug: string;
  entry: CollectionEntry<'projects'>;
  data: CollectionEntry<'projects'>['data'];
  cover: ImageMetadata;
  gallery: { src: ImageMetadata; alt: string; caption?: string; frame: 'browser' | 'phone' }[];
  repo: RepoInfo | null;
  /** Live demo URL: explicit frontmatter first, then repo homepage. */
  demoUrl: string | null;
  githubUrl: string | null;
};

export type Portfolio = {
  projects: Project[];
  /** Repos with no curated Markdown file → "More on GitHub" section. */
  moreRepos: RepoInfo[];
};

export async function getPortfolio(): Promise<Portfolio> {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  const repos = await fetchRepos();
  const map = repos ? byName(repos) : null;
  // Frontmatter holds "owner/name"; the API list is keyed by repo name.
  const repoName = (full: string) => full.trim().toLowerCase().split('/').pop() ?? '';

  const projects: Project[] = entries
    .map((entry) => {
      const repo = map?.get(repoName(entry.data.repo)) ?? null;
      return {
        slug: entry.data.slug ?? entry.id,
        entry,
        data: entry.data,
        cover: resolveImage(entry, entry.data.cover),
        gallery: entry.data.gallery.map((g) => ({
          src: resolveImage(entry, g.src),
          alt: g.alt,
          caption: g.caption,
          frame: g.frame,
        })),
        repo,
        demoUrl: entry.data.demo ?? repo?.homepage ?? null,
        githubUrl:
          repo?.html_url ??
          (!entry.data.privateRepo && entry.data.repo ? `https://github.com/${entry.data.repo}` : null),
      };
    })
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));

  const curatedNames = new Set(entries.map((e) => repoName(e.data.repo)));
  const moreRepos = (repos ?? [])
    .filter((r) => !curatedNames.has(r.name.toLowerCase()) && !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return { projects, moreRepos };
}

export function getFeatured(projects: Project[], limit = 4): Project[] {
  return projects.filter((p) => p.data.featured).slice(0, limit);
}

export function getNeighbors(projects: Project[], slug: string): { prev: Project | null; next: Project | null } {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
}
