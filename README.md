# smppforge.com

Marketing site for SMPP Forge: landing page, demo request, slide decks, privacy and
terms. Static React + Vite build, deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build to dist/ (with per-route index.html files)
```

## One-time GitHub Pages setup

1. Push this directory to its own **public** repository (Pages on private repos needs
   a paid GitHub plan). It must not contain product source code.
2. Repository → Settings → Pages → Source: **GitHub Actions**.
3. Settings → Pages → Custom domain: `smppforge.com`, then tick **Enforce HTTPS**
   once the certificate is issued. `public/CNAME` already carries the domain.
4. DNS at your registrar:

   | Type  | Name  | Value |
   |-------|-------|-------|
   | A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | `www` | `<your-github-user>.github.io` |

   Keep your existing MX records for `sales@` / `info@` untouched.
5. Recommended: verify the domain under your GitHub account (Settings → Pages →
   Verified domains) so nobody else can claim it.

## Demo-request form

Without configuration the form opens a pre-filled email to `sales@smppforge.com`.
To receive submissions directly, create a form endpoint (e.g. Formspree) and set the
repository variable `FORM_ENDPOINT` (Settings → Secrets and variables → Actions →
Variables). The form POSTs JSON to it.

## Content

| What | Where |
|------|-------|
| Brand name, emails, domain | `src/site.ts` |
| Landing page, comparison tables | `src/pages/Home.tsx` |
| Slide decks (`/slides/overview`, `/slides/sales`) | `src/pages/Slides.tsx` |
| Privacy policy / terms | `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` — have counsel review |
| Performance figures | `src/bench.json` + `PUBLISHED` in `src/benchmark.ts` |

Adding a route? Add it to `src/App.tsx`, `scripts/static-routes.mjs` and
`public/sitemap.xml`.

### Performance figures

`src/bench.json` is the output of `crates/loadtest/bench.py` in the product
repository. The section stays hidden until `PUBLISHED` is `true` — publish only
numbers a prospect can reproduce in a proof of concept.

### Comparison claims

The competitor tables reflect public vendor documentation (October 2026). Re-check
them before major campaigns; comparative claims must stay accurate.


