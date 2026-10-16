/**
 * Build-time GitHub integration.
 *
 * - Fetches the public repos of `site.githubUsername` from the GitHub REST API.
 * - Merges live stats (stars, forks, language, topics, last push) into curated projects.
 * - Uncurated repos render as basic cards in the "More on GitHub" section.
 * - Responses are cached in .cache/ to survive rate limits; a stale cache is
 *   always preferred over a failed fetch.
 * - Optional GITHUB_TOKEN env var raises the rate limit to 5,000/hour.
 */
import fs from 'node:fs';
import path from 'node:path';
import { site } from './site.config';

export interface RepoInfo {
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  archived: boolean;
  fork: boolean;
}

const API = 'https://api.github.com';
const CACHE_DIR = path.resolve('node_modules/.cache/portfolio-github');
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const username = site.githubUsername;
export const isConfigured = /^\[/.test(username) === false && username.length > 0;

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-builder',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

function readCache<T>(file: string): { fetchedAt: number; data: T } | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(CACHE_DIR, file), 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(file: string, data: unknown) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(path.join(CACHE_DIR, file), JSON.stringify(data));
  } catch (e) {
    console.warn(`[github] could not write cache:`, (e as Error).message);
  }
}

export async function fetchRepos(): Promise<RepoInfo[] | null> {
  if (!isConfigured) {
    console.warn(`[github] githubUsername is still a placeholder (${username}) — skipping GitHub stats. Set it in src/lib/site.config.ts.`);
    return null;
  }
  const cacheFile = 'repos.json';
  const cached = readCache<RepoInfo[]>(cacheFile);

  try {
    const repos: RepoInfo[] = [];
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `${API}/users/${username}/repos?per_page=100&sort=pushed&direction=desc&page=${page}`,
        { headers: headers() }
      );
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const batch = (await res.json()) as RepoInfo[];
      repos.push(...batch);
      if (batch.length < 100) break;
    }
    writeCache(cacheFile, { fetchedAt: Date.now(), data: repos });
    return repos;
  } catch (e) {
    console.warn(`[github] fetch failed (${(e as Error).message}); ${cached ? 'using stale cache' : 'no cache available'}.`);
    return cached?.data ?? null;
  }
}

export function byName(repos: RepoInfo[]): Map<string, RepoInfo> {
  const map = new Map<string, RepoInfo>();
  for (const r of repos) map.set(r.name.toLowerCase(), r);
  return map;
}

/** Fetch and render a repo README as sanitized HTML. Returns null when unavailable. */
export async function fetchReadmeHtml(
  repoFullName: string,
  fallbackMarkdown?: string,
  isPrivate = false
): Promise<string | null> {
  const { marked } = await import('marked');
  const sanitizeHtml = (await import('sanitize-html')).default;

  const render = (md: string) => {
    const html = marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'del']),
      allowedAttributes: {
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        code: ['class'],
        span: ['class'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      transformTags: {
        a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
      },
    });
  };

  // Private repos can't be fetched without a token that can see them — use bundled content.
  if (isPrivate) {
    return fallbackMarkdown ? render(fallbackMarkdown) : null;
  }

  // Placeholder repos fall back to bundled content (sample projects).
  if (!isConfigured || /^\[/.test(repoFullName)) {
    return fallbackMarkdown ? render(fallbackMarkdown) : null;
  }

  const safeName = repoFullName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const cacheFile = `readme-${safeName}.json`;
  const cached = readCache<{ md: string }>(cacheFile);

  let md = cached?.md;
  try {
    const res = await fetch(`${API}/repos/${repoFullName}/readme`, {
      headers: { ...headers(), Accept: 'application/vnd.github.raw' },
    });
    if (!res.ok) throw new Error(`responded ${res.status}`);
    md = await res.text();
    writeCache(cacheFile, { md });
  } catch (e) {
    console.warn(`[github] README fetch for ${repoFullName} failed (${(e as Error).message}); ${cached ? 'using cache' : 'skipping'}.`);
  }

  return md ? render(md) : null;
}
