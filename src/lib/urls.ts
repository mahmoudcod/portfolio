/** URL helper: prefixes the configured base path (for GitHub Pages project sites). */
export function u(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!path.startsWith('/')) path = '/' + path;
  // Normalize trailing slashes (astro.config uses trailingSlash: 'never').
  const clean = path.replace(/\/+$/, '');
  return `${base}${clean === '' ? '/' : clean}`;
}
