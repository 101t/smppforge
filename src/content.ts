/**
 * Copy and data shared by several pages, the slide decks and the structured data.
 * Keep claims in step with the product: describe what it does for the business, never how it is built.
 */
import { SITE } from './site';

export interface Faq { q: string; a: string }

export const homeFaq: Faq[] = [
  {
    q: `What is ${SITE.name}?`,
    a: `${SITE.name} is SMS gateway software for businesses that send, sell or carry text messages at scale. It connects your customers and applications to mobile carriers worldwide, picks the best route for every message, bills each customer automatically and enforces local messaging rules — on infrastructure you control.`,
  },
  {
    q: 'Is it a hosted SMS API like Twilio or Vonage?',
    a: `No. ${SITE.name} is self-hosted: it runs in your own cloud account or data center, over your own carrier agreements. You keep the margin, the customer relationships and the data. We provide the software, updates and support.`,
  },
  {
    q: 'Who is it for?',
    a: 'SMS aggregators and wholesale hubs, mobile operators and MVNOs, and enterprises with high-volume one-time passcode, alert and notification traffic — including banks, fintechs, healthcare providers and public-sector organizations.',
  },
  {
    q: 'How is it priced?',
    a: 'Licensing is quoted per deployment, based on your traffic, deployment model and support level — not as a markup on every message you send. Every engagement starts with a guided evaluation on your own traffic profile.',
  },
  {
    q: 'We run Jasmin today. How hard is it to switch?',
    a: `${SITE.name} accepts the same HTTP requests and command-line operations as Jasmin and uses the same configuration model, so existing integrations keep working. Most teams run both side by side and move traffic route by route over about five weeks.`,
  },
  {
    q: 'What happens when a carrier goes down?',
    a: 'Traffic moves to the next-best route automatically. Every message is stored safely the moment it is accepted and delivered as soon as a route is available — and it is never sent twice, even if a server restarts mid-delivery.',
  },
];

export const platformFaq: Faq[] = [
  {
    q: 'Which protocols and interfaces are supported?',
    a: 'Customers and carriers connect over SMPP versions 3.3, 3.4 and 5.0, with encrypted sessions available. Applications use a modern REST API with interactive documentation or the Jasmin-compatible HTTP API, and your team works in a web console or a scriptable command line.',
  },
  {
    q: 'Can our customers manage their own accounts?',
    a: 'Yes. Every customer gets a self-service portal to send messages, follow delivery, see their balance, prices, refund terms, credit history and invoices — and receives email alerts when their balance runs low.',
  },
  {
    q: 'Does it support high availability?',
    a: `Today ${SITE.name} runs as a single server per deployment, with automatic failover between carriers and durable message storage that survives restarts. Active-active clustering is on our public roadmap — ask us for timing.`,
  },
  {
    q: 'Where does our data live?',
    a: 'Entirely in your environment. Messages, phone numbers and customer records stay on infrastructure you control and are never sent to us. Phone numbers are masked in logs and message text is never written to them.',
  },
  {
    q: 'Can we test without touching live carriers?',
    a: 'Yes. A built-in carrier simulator lets you exercise routing, billing, delivery reports and refunds end to end before a single real message is sent.',
  },
];

export const pricingFaq: Faq[] = [
  {
    q: 'Do you charge per message?',
    a: `No. ${SITE.name} is licensed per deployment, so your cost does not climb with every message you send. Your carrier termination costs are between you and your carriers.`,
  },
  {
    q: 'How does an evaluation work?',
    a: 'We start with a discovery call about your traffic, destinations and carriers, then run a guided proof of concept — usually on the built-in carrier simulator first, then on a share of real traffic — with a solutions engineer alongside your team.',
  },
  {
    q: 'Can we buy through AWS Marketplace?',
    a: 'An AWS Marketplace listing is coming soon. Until then we contract directly, and enterprise buyers can request a private offer.',
  },
  {
    q: 'What does support include?',
    a: 'Business plans include business-hours support and every platform update. Enterprise plans add 24×7 support with response-time commitments, hands-on deployment and migration assistance, and input into the roadmap.',
  },
];

export const migrateFaq: Faq[] = [
  {
    q: 'Do our customers need to change their integrations?',
    a: 'No. The Jasmin HTTP endpoints for sending, balance and rate queries keep working, and SMPP customers simply point their connection at the new gateway.',
  },
  {
    q: 'Can we run Jasmin and SMPP Forge side by side?',
    a: 'Yes — that is the recommended path. Move a share of traffic, compare delivery, latency and billing, then cut over route by route with nothing to roll back.',
  },
  {
    q: 'What about our operations scripts?',
    a: 'Your team keeps the familiar command-line operations for users, groups, connectors, routes, filters and interceptors, so runbooks carry over.',
  },
  {
    q: 'How long does a migration take?',
    a: 'A typical cut-over takes about five weeks: one week of evaluation, two to four weeks of parallel running, and a monitored final cut-over.',
  },
];

/* ───────── Comparison ───────── */

export type Mark = true | false | 'partial';

/** Hosted APIs vs open-source gateways vs SMPP Forge — what a buyer weighs. */
export const threeWay: { label: string; cpaas: Mark; oss: Mark; forge: Mark }[] = [
  { label: 'Keep your margin — no markup on every message', cpaas: false, oss: true, forge: true },
  { label: 'Message data stays on your own servers', cpaas: false, oss: true, forge: true },
  { label: 'Bill your own customers: rate cards, invoices, refunds', cpaas: false, oss: 'partial', forge: true },
  { label: 'Compliance controls built in', cpaas: true, oss: false, forge: true },
  { label: 'Ready-made console for operators and customers', cpaas: true, oss: 'partial', forge: true },
  { label: 'Vendor support with a response-time SLA', cpaas: true, oss: false, forge: true },
  { label: 'Live without building in-house tooling', cpaas: true, oss: false, forge: true },
];

export type Cell = { v: string; ok: Mark };
const yes = (v: string): Cell => ({ v, ok: true });
const no = (v: string): Cell => ({ v, ok: false });
const part = (v: string): Cell => ({ v, ok: 'partial' });

/** Public vendor documentation, October 2026. Re-check before campaigns. */
export const openSource: { feature: string; forge: Cell; jasmin: Cell; kannel: Cell }[] = [
  { feature: 'License & support', forge: yes('Commercial, vendor-supported'), jasmin: part('Open source, community'), kannel: part('Open source, community') },
  { feature: 'SMPP versions', forge: yes('3.3 · 3.4 · 5.0'), jasmin: part('3.4'), kannel: part('3.3 · 3.4') },
  { feature: 'Accept customer SMPP connections', forge: yes('Built in'), jasmin: yes('Built in'), kannel: part('Separate add-on') },
  { feature: 'Web console for operators & customers', forge: yes('Built in, 30+ screens'), jasmin: part('Community add-on'), kannel: no('Status page only') },
  { feature: 'Modern REST API with interactive docs', forge: yes('Built in'), jasmin: part('Separate service'), kannel: no('Basic HTTP only') },
  { feature: 'Least-cost & automatic failover routing', forge: yes('Built in, health-aware'), jasmin: yes('Yes'), kannel: part('Prefix rules') },
  { feature: 'Number-portability routing', forge: yes('Built in + local database'), jasmin: part('Lookup routes'), kannel: no('No') },
  { feature: 'Customer billing, rate cards & invoices', forge: yes('Prepaid, postpaid, invoices'), jasmin: part('Balance & quotas'), kannel: no('External') },
  { feature: 'Refunds for undelivered messages', forge: yes('Per country, network & customer'), jasmin: no('No'), kannel: no('External') },
  { feature: 'Sender-ID protection & compliance rules', forge: yes('Built in'), jasmin: part('Via filters & scripts'), kannel: no('External') },
  { feature: 'Signed webhooks & delivery callbacks', forge: yes('Signed, retried'), jasmin: part('Delivery callbacks'), kannel: part('Delivery callbacks') },
  { feature: 'Two-factor sign-in & audit trail', forge: yes('Built in'), jasmin: no('No'), kannel: no('No') },
  { feature: 'Monitoring integration', forge: yes('Dashboards + metrics export'), jasmin: yes('Metrics export'), kannel: part('Status page') },
  { feature: 'Jasmin API & CLI compatibility', forge: yes('Yes'), jasmin: yes('Native'), kannel: no('No') },
];

export const landscape = [
  { product: 'Restcomm SMSC (now Mobius Software)', kind: 'Operator SMSC with SS7 / SIGTRAN', licence: 'AGPL-3.0 or commercial', fit: 'Core-network SMSC that must speak SS7', diff: `${SITE.name} sits at the SMPP and HTTP edge — hubbing, billing and routing — alongside your SMSC rather than replacing core signalling.` },
  { product: 'NowSMS', kind: 'SMS & MMS gateway', licence: 'Commercial · Windows, Linux', fit: 'Enterprise SMS / MMS and modem deployments', diff: 'Built for businesses that resell messaging: customer billing and invoicing, refund rules, a compliance engine and a multi-customer console.' },
  { product: 'Ozeki SMS Gateway', kind: 'SMS gateway / SMPP server', licence: 'Commercial · Windows-first', fit: 'Corporate messaging on Windows estates', diff: 'Linux-native and cloud-ready, with least-cost and number-portability routing and per-customer pricing built in.' },
  { product: 'Alaris SMS Platform', kind: 'Wholesale SMS hubbing platform', licence: 'Commercial', fit: 'Carriers hubbing A2P / P2P across many protocols', diff: 'Focused SMPP and HTTP footprint, fast time to production and a direct migration path from Jasmin.' },
  { product: 'CPaaS APIs (Twilio, Vonage, Infobip, Sinch)', kind: 'Hosted messaging APIs', licence: 'Usage-based, vendor-hosted', fit: 'Teams that want SMS without running infrastructure', diff: 'You own the routing, carrier contracts, margins and data residency — no per-message platform fee.' },
];

/* ───────── Sender-ID compliance (public regulator guidance, September 2026) ───────── */

export type Regime = 'required' | 'brand' | 'numeric';
export const regimes: Record<Regime, { label: string; cls: string }> = {
  required: { label: 'Registration required', cls: 'bg-brand-50 text-brand-800 ring-brand-200' },
  brand: { label: 'Brand-protection registry', cls: 'bg-cyan-50 text-cyan-800 ring-cyan-200' },
  numeric: { label: 'Numeric senders only', cls: 'bg-ink-50 text-ink-700 ring-ink-200' },
};

export const senderRules: { market: string; authority: string; regime: Regime; rule: string }[] = [
  { market: 'United States', authority: 'CTIA · The Campaign Registry', regime: 'numeric', rule: 'Business texting uses registered 10DLC numbers, verified toll-free numbers or short codes' },
  { market: 'Canada', authority: 'CWTA · CRTC · CASL', regime: 'numeric', rule: 'Short codes are vetted by CWTA; commercial messages require consent' },
  { market: 'United Kingdom', authority: 'MEF SenderID Protection Registry', regime: 'brand', rule: 'Registered brands — and thousands of look-alike variants — are blocked for everyone else' },
  { market: 'Spain', authority: 'CNMC alias registry', regime: 'required', rule: 'Every alphanumeric sender name sent to Spanish numbers must be pre-registered' },
  { market: 'India', authority: 'TRAI DLT', regime: 'required', rule: 'The business, its 6-character header and each message template must be registered' },
  { market: 'Singapore', authority: 'SGNIC SSIR (IMDA)', regime: 'required', rule: 'Unregistered sender names are shown as “Likely-SCAM” since January 2023' },
  { market: 'Australia', authority: 'ACMA Sender ID Register', regime: 'required', rule: 'All alphanumeric sender names, new and existing, must be registered from July 2026' },
  { market: 'Türkiye', authority: 'BTK · İYS · KVKK', regime: 'required', rule: 'Names must match a trade name or brand; commercial SMS needs İYS consent' },
];
export const regimeCount = (r: Regime) => senderRules.filter(x => x.regime === r).length;

/* ───────── Roadmap ───────── */

export const roadmap = {
  available: [
    'SMPP and HTTP gateway with operator console and customer portal',
    'Least-cost, failover and number-portability routing',
    'Prepaid and postpaid billing, rate cards, invoices and refund rules',
    'Store-and-forward delivery that never sends a message twice',
    'Bulk campaigns of up to 100,000 messages that resume after a restart',
    'Sender-ID registry and regional compliance engine',
    'Rich messages: flash alerts, contact cards, push links and more',
    'Analytics, revenue and margin reports, low-balance alerts',
  ],
  next: [
    'Active-active clustering and high availability',
    'Kubernetes Helm charts',
    'Carrier SLA monitoring and automated alerting',
    'White-label console branding',
    'AWS Marketplace listing',
  ],
};

/** Plain-language figures that are true of the product today. */
export const proofPoints = [
  { value: '1,000s', label: 'messages per second', sub: 'on a single server' },
  { value: '100K', label: 'messages per campaign', sub: 'paced, tracked and resumable' },
  { value: '30+', label: 'console screens', sub: 'for your team and your customers' },
  { value: '0', label: 'duplicate sends', sub: 'even when a server restarts' },
];
