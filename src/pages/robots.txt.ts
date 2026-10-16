import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const sitemapPath = `${base}/sitemap-index.xml`.replace(/\/{2,}/g, '/');
  const sitemapUrl = site ? new URL(sitemapPath, site).href : sitemapPath;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
