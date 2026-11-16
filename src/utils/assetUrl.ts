/**
 * Resolves a public or static asset path against Vite's configured BASE_URL
 * so images work both at root ('/') and on GitHub Pages ('/<repo-name>/').
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}
