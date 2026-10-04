// GitHub Pages serves files, not routes. Give every client route its own
// index.html so deep links return 200 and are crawlable; anything else falls
// back to the SPA through 404.html. Keep in sync with the routes in src/App.tsx.
import { copyFileSync, mkdirSync } from 'node:fs';

const routes = ['contact', 'privacy', 'terms', 'slides/overview', 'slides/sales'];
for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
copyFileSync('dist/index.html', 'dist/404.html');
