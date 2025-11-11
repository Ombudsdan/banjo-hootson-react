import { promises as fs } from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const BASE_URL = process.env.SITE_URL || 'https://banjohootson.com';

// Keep in sync with app.routes.tsx (public routes only)
const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/calendar',
  '/calendar/view',
  // Dynamic routes not included directly; rely on canonical links if needed
  '/login',
  '/signup'
];

function xmlEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function generate() {
  const urls = ROUTES.map(r => `${BASE_URL}${r}`);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${xmlEscape(u)}</loc></url>`).join('\n') +
    `\n</urlset>\n`;

  // The output path is derived from __dirname and static segments only
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.mkdir(DIST_DIR, { recursive: true });
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');

  console.info('Sitemap generated:', path.join(DIST_DIR, 'sitemap.xml'));
}

generate().catch(err => {
  console.error('Failed to generate sitemap', err);
  process.exit(1);
});
