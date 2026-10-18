# smppforge.com

Marketing site for SMPP Forge: product, solutions, security, comparison, migration, pricing
and company pages, a demo-request form, two slide decks, privacy and terms. Static React + Vite
build, prerendered to HTML per route, deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender every route + sitemap into dist/
```

## How the build works

`npm run build` runs `scripts/prerender.mjs` after the Vite builds. For each route in `ROUTES`
(`src/seo.ts`) it writes `dist/<route>.html` with the page already rendered and its own
`<title>`, description, canonical, Open Graph / Twitter tags and JSON-LD (Organization,
WebSite, SoftwareApplication, FAQPage, BreadcrumbList). It also writes `dist/404.html`
(`noindex`) and `dist/sitemap.xml`. The browser then hydrates the page.

GitHub Pages serves `/platform` from `platform.html` with a 200, and serves `404.html` (status
404) for anything else; the app then renders whichever route matches, so `/contact/` still works.

Adding a page: create it in `src/pages/`, add a `<Route>` in `src/App.tsx` and its metadata to
`ROUTES` in `src/seo.ts`. The prerender and sitemap pick it up automatically.

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
6. After the first deploy, submit `https://smppforge.com/sitemap.xml` in Google Search
   Console and Bing Webmaster Tools.

## Demo-request form

The form posts JSON from the browser — no server of our own. Provider order (`src/lib/leads.ts`):

| Repository variable (Settings → Secrets and variables → Actions → **Variables**) | Provider | Free tier |
|---|---|---|
| `WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) — enter `sales@smppforge.com` there to get a key | 250 submissions / month |
| `FORM_ENDPOINT` | Any JSON form endpoint (Formspree, Getform, Basin…) | Varies |
| *(neither set — default)* | [FormSubmit](https://formsubmit.co) AJAX → `sales@smppforge.com` | Free, no account |

**Default (FormSubmit) needs one activation:** after deploying, submit the form once on
`https://smppforge.com/contact`. FormSubmit emails an **Activate Form** link to
`sales@smppforge.com`; click it, and every later request arrives in that inbox as a table
(the visitor's email is set as reply-to). Until activation, visitors see a fallback with a
pre-filled email and a copy-details button, so no lead is lost.

Either key is public by design (it only allows sending to your inbox), so a repository
*variable* is fine. A hidden honeypot field silently drops bot submissions.

## Content

| What | Where |
|------|-------|
| Brand name, emails, domain, office location | `src/site.ts` |
| Page titles, descriptions, sitemap priorities | `src/seo.ts` |
| FAQs, comparison tables, sender-ID rules, roadmap, proof points | `src/content.ts` |
| Pages | `src/pages/*.tsx` |
| Slide decks (`/slides/sales`, `/slides/overview`) | `src/slides/decks.tsx` |
| Colors, fonts, slide sizing | `src/index.css` (`@theme` tokens) |
| Logo, favicons, social image | `public/` |
| Privacy policy / terms | `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` — have counsel review |

### Brand

Midnight navy (`ink-*`) for the network, signal blue (`brand-*`) for the brand, cyan for data in
motion, amber for the spark in the logo. Display font Space Grotesk, text font Inter — both
self-hosted, so the site makes no third-party requests.

### Slide decks

Written for non-technical buyers. Every size inside a slide is in container-query units, so a
slide scales as one picture on screen, in full screen (F) and in **Save PDF**, which prints one
16:9 slide per page. `#5` in the URL opens slide 5.

### Claims

- Describe what the product does for the business, never how it is built: no languages,
  frameworks, databases, queues, ports or protocol internals.
- Performance is stated qualitatively ("thousands of messages per second on a single server").
  Publish exact figures only when a prospect can reproduce them in a proof of concept
  (`crates/loadtest/bench.py` in the product repository).
- Competitor tables reflect public vendor documentation (October 2026); the sender-ID table
  (`senderRules` in `src/content.ts`) summarizes regulator guidance as of September 2026.
  Re-check both before major campaigns — comparative claims must stay accurate.
- The savings calculator is labeled illustrative; keep it that way.
