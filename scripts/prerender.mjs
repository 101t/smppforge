// Prerenders every route to static HTML so each page is crawlable, has its own <head> (title, description,
// canonical, social tags, structured data) and loads with content before JavaScript runs.
//
// GitHub Pages serves /platform from platform.html with a 200 (a platform/ directory would 301 to /platform/),
// and serves 404.html with a 404 status for anything else; the app then renders whatever route matches.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const SSR_DIR = 'dist-ssr';
const { render, ROUTES, NOT_FOUND, headTags, canonical } = await import(pathToFileURL(`${SSR_DIR}/entry-server.js`).href);

const template = readFileSync('dist/index.html', 'utf8');
if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo--> block or the empty #root element');
}

// Preload the two Latin font files so text renders in the brand faces without a flash.
const fonts = readdirSync('dist/assets').filter(f => /^(inter|space-grotesk)-latin-wght-normal-.*\.woff2$/.test(f));
const preload = fonts.map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('\n    ');

function page(meta, url) {
  const html = render(url);
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `${headTags(meta)}\n    ${preload}`)
    .replace('<div id="root"></div>', `<div id="root" data-path="${meta.path}">${html}</div>`);
}

function write(file, html) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const meta of ROUTES) {
  write(meta.path === '/' ? 'dist/index.html' : `dist${meta.path}.html`, page(meta, meta.path));
}
write('dist/404.html', page(NOT_FOUND, '/404'));

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter(r => !r.noindex).map(r => [
  '  <url>',
  `    <loc>${canonical(r.path)}</loc>`,
  `    <lastmod>${today}</lastmod>`,
  `    <changefreq>${r.changefreq}</changefreq>`,
  `    <priority>${r.priority.toFixed(1)}</priority>`,
  '  </url>',
].join('\n'));
write('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);

rmSync(SSR_DIR, { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} routes + 404.html, sitemap with ${urls.length} URLs, ${fonts.length} font preloads`);
