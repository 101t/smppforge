/**
 * Per-route metadata. The prerender script writes it into each page's <head> (with structured data)
 * and builds the sitemap from it; the client keeps title and tags current on in-app navigation.
 * Adding a page: add its route here and in App.tsx.
 */
import { SITE } from './site';
import { homeFaq, platformFaq, pricingFaq, migrateFaq, type Faq } from './content';

export interface RouteMeta {
  path: string;
  /** Full document title. */
  title: string;
  description: string;
  /** Short name for breadcrumbs. */
  name: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  faq?: Faq[];
  software?: boolean;
  noindex?: boolean;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/', name: 'Home', priority: 1.0, changefreq: 'weekly', faq: homeFaq, software: true,
    title: `${SITE.name} — SMS Gateway & SMPP Platform You Own`,
    description: 'Carrier-grade SMS gateway software for operators, aggregators and enterprises. Connect customers, route to carriers worldwide, bill every message and stay compliant — on infrastructure you own.',
  },
  {
    path: '/platform', name: 'Platform', priority: 0.9, changefreq: 'monthly', faq: platformFaq, software: true,
    title: `Platform — SMS Routing, Billing & Delivery | ${SITE.name}`,
    description: 'One SMS platform to connect customers over SMPP and HTTP, route each message to the best carrier, bill automatically and deliver reliably — with nothing ever sent twice.',
  },
  {
    path: '/solutions', name: 'Solutions', priority: 0.8, changefreq: 'monthly',
    title: `Solutions for Aggregators, MVNOs & Enterprises | ${SITE.name}`,
    description: 'How SMS aggregators, mobile operators, MVNOs, banks, healthcare providers and enterprises use SMPP Forge to launch, grow and protect their messaging business.',
  },
  {
    path: '/security', name: 'Security & compliance', priority: 0.8, changefreq: 'monthly',
    title: `Security & SMS Compliance | ${SITE.name}`,
    description: 'Two-factor sign-in, audit trails, encrypted connections and a built-in compliance engine for sender IDs, consent and quiet hours — on infrastructure you control.',
  },
  {
    path: '/compare', name: 'Compare', priority: 0.8, changefreq: 'monthly',
    title: `${SITE.name} vs Jasmin, Kannel & CPaaS — Comparison`,
    description: 'Compare SMPP Forge with Jasmin, Kannel, commercial SMS gateways and hosted CPaaS APIs on routing, billing, compliance, support and ownership.',
  },
  {
    path: '/migrate-from-jasmin', name: 'Migrate from Jasmin', priority: 0.8, changefreq: 'monthly', faq: migrateFaq,
    title: `Jasmin SMS Gateway Alternative — Migrate in Weeks | ${SITE.name}`,
    description: 'Outgrown Jasmin? SMPP Forge keeps your Jasmin HTTP API and CLI working and adds billing, compliance and a full console. Most teams switch in about five weeks.',
  },
  {
    path: '/pricing', name: 'Pricing', priority: 0.8, changefreq: 'monthly', faq: pricingFaq, software: true,
    title: `Pricing — Licensing Without Per-Message Fees | ${SITE.name}`,
    description: 'SMPP Forge is licensed per deployment, with no markup on every message. Start with a guided evaluation, then choose Business or Enterprise support.',
  },
  {
    path: '/company', name: 'Company', priority: 0.6, changefreq: 'monthly',
    title: `About ${SITE.name} — Messaging Infrastructure You Own`,
    description: `${SITE.name} builds carrier-grade SMS software for operators, aggregators and enterprises worldwide. Headquartered in ${SITE.hq.city}.`,
  },
  {
    path: '/contact', name: 'Request a demo', priority: 0.9, changefreq: 'monthly',
    title: `Request a Demo | ${SITE.name}`,
    description: `See ${SITE.name} on your own traffic. Tell us about your messaging business and our team will reply within ${SITE.responseTime} with a tailored demo.`,
  },
  {
    path: '/slides/overview', name: 'Company overview deck', priority: 0.5, changefreq: 'monthly',
    title: `Company Overview Deck | ${SITE.name}`,
    description: `A plain-language overview of ${SITE.name}: the problem we solve, how the platform works, who it is for and where it is going.`,
  },
  {
    path: '/slides/sales', name: 'Sales deck', priority: 0.5, changefreq: 'monthly',
    title: `Why ${SITE.name} — Sales Deck`,
    description: `Why messaging businesses choose ${SITE.name}: keep your margin, never lose a message, comply in every market, and switch in weeks.`,
  },
  {
    path: '/privacy', name: 'Privacy policy', priority: 0.2, changefreq: 'yearly',
    title: `Privacy Policy | ${SITE.name}`,
    description: `How ${SITE.name} handles personal data collected through this website and when you contact us.`,
  },
  {
    path: '/terms', name: 'Terms of use', priority: 0.2, changefreq: 'yearly',
    title: `Terms of Use | ${SITE.name}`,
    description: `Terms governing the use of the ${SITE.name} website.`,
  },
];

export const NOT_FOUND: RouteMeta = {
  path: '/404', name: 'Page not found', priority: 0, changefreq: 'yearly', noindex: true,
  title: `Page not found | ${SITE.name}`,
  description: 'The page you were looking for does not exist.',
};

export const OG_IMAGE = `${SITE.url}/og-image.png`;
export const canonical = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`;

export function routeFor(pathname: string): RouteMeta {
  const p = pathname.replace(/\/+$/, '') || '/';
  return ROUTES.find(r => r.path === p) ?? NOT_FOUND;
}

/* ───────── Structured data ───────── */

const ORG_ID = `${SITE.url}/#organization`;

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    email: SITE.infoEmail,
    slogan: SITE.tagline,
    address: { '@type': 'PostalAddress', addressLocality: SITE.hq.city, addressRegion: SITE.hq.region, addressCountry: SITE.hq.countryCode },
    areaServed: 'Worldwide',
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', email: SITE.salesEmail, areaServed: 'Worldwide', availableLanguage: ['English'] },
      { '@type': 'ContactPoint', contactType: 'customer support', email: SITE.infoEmail, areaServed: 'Worldwide', availableLanguage: ['English'] },
    ],
  };
}

function software() {
  return {
    '@type': 'SoftwareApplication',
    name: SITE.name,
    url: SITE.url,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'SMS gateway',
    operatingSystem: 'Linux',
    description: 'Self-hosted, carrier-grade SMPP and SMS gateway with routing, billing, compliance and an operator console for mobile operators, SMS aggregators and enterprises.',
    publisher: { '@id': ORG_ID },
    featureList: [
      'SMPP 3.3, 3.4 and 5.0 client and server',
      'REST and Jasmin-compatible HTTP APIs',
      'Least-cost, failover and number-portability routing',
      'Prepaid and postpaid billing, rate cards, invoices and refund rules',
      'Store-and-forward delivery with no duplicate sends',
      'Sender-ID registry and regional compliance engine',
      'Operator console and customer self-service portal',
    ],
  };
}

export function structuredData(meta: RouteMeta): object {
  const graph: object[] = [organization()];
  if (meta.path === '/') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-US' });
  } else if (!meta.noindex) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: canonical('/') },
        { '@type': 'ListItem', position: 2, name: meta.name, item: canonical(meta.path) },
      ],
    });
  }
  if (meta.software) graph.push(software());
  if (meta.faq) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: meta.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/* ───────── <head> markup for prerendered pages ───────── */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function headTags(meta: RouteMeta): string {
  const url = canonical(meta.path);
  const json = JSON.stringify(structuredData(meta)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    ...(meta.noindex ? [] : [`<link rel="canonical" href="${url}" />`]),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE.name} — ${esc(SITE.tagline)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ');
}
