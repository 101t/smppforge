import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, Printer, Presentation as PresentationIcon } from 'lucide-react';
import { SITE } from '../site';

interface Slide {
  title: string;
  content: React.ReactNode;
  cover?: boolean;
}

/* ───────────── Building blocks ───────────── */

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-lg">
      {items.map(i => <li key={i} className="flex items-start gap-3"><span className="text-indigo-500 mt-1">▸</span>{i}</li>)}
    </ul>
  );
}

function Cards({ items, cols = 2, tone = 'indigo' }: { items: [string, string][]; cols?: 2 | 3; tone?: 'indigo' | 'emerald' | 'rose' | 'gray' }) {
  const tones = {
    indigo: 'bg-indigo-50 border-indigo-100 [&_b]:text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-100 [&_b]:text-emerald-700',
    rose: 'bg-rose-50 border-rose-100 [&_b]:text-rose-700',
    gray: 'bg-gray-50 border-gray-100 [&_b]:text-gray-900',
  };
  return (
    <div className={`grid gap-4 ${cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {items.map(([t, d]) => (
        <div key={t} className={`p-4 rounded-xl border ${tones[tone]}`}>
          <b className="block font-semibold mb-1">{t}</b>
          <span className="text-sm text-gray-600">{d}</span>
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows, highlight }: { head: string[]; rows: string[][]; highlight?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm sm:text-base">
        <thead><tr className="border-b-2 border-gray-200">
          {head.map((h, i) => <th key={h} className={`py-3 pr-4 font-semibold ${i === highlight ? 'text-indigo-600' : 'text-gray-500'}`}>{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r[0]} className="border-b border-gray-100">
              {r.map((c, i) => <td key={i} className={`py-2.5 pr-4 ${i === 0 ? 'font-medium text-gray-800' : i === highlight ? 'text-indigo-700 font-medium' : 'text-gray-600'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium">{s}</span>
          {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-indigo-300" />}
        </span>
      ))}
    </div>
  );
}

function Cover({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-start gap-8 py-8">
      <img src="/smppforge-logo.svg" alt="" className="w-20 h-20 rounded-2xl" />
      <div>
        <div className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">{SITE.tagline}</div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900">{SITE.name}</h1>
        <p className="mt-3 text-2xl text-gray-600">{title}</p>
      </div>
      <p className="text-lg text-gray-500 max-w-2xl">{subtitle}</p>
      <div className="text-sm text-gray-400">{SITE.url.replace('https://', '')} · {SITE.salesEmail}</div>
    </div>
  );
}

/* ───────────── Platform overview deck ───────────── */

const overview: Slide[] = [
  { title: '', cover: true, content: <Cover title="Platform Overview" subtitle="High-performance SMPP & SMS gateway, engineered for carrier scale." /> },
  {
    title: `What is ${SITE.name}?`,
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-600">A <strong>self-hosted, enterprise-grade SMS gateway</strong> for operators, aggregators and messaging platforms.</p>
        <Bullets items={[
          'Routes messages between your customers or applications and upstream carriers',
          'SMPP 3.3 / 3.4 / 5.0 as client and server, plus REST and Jasmin-compatible HTTP APIs',
          'Billing, routing, compliance and analytics built in — not bolted on',
          'Operator console, CLI and API over one consistent core',
        ]} />
        <p className="text-lg font-semibold text-indigo-600 pt-2">One appliance. Every interface. Your infrastructure.</p>
      </div>
    ),
  },
  {
    title: 'Architecture',
    content: (
      <div className="space-y-4">
        <Cards cols={3} tone="gray" items={[
          ['Customers & apps', 'ESMEs over SMPP · applications over HTTP'],
          ['Operations', 'Web console · CLI · automation via API'],
          ['Carriers', 'Upstream SMSCs, hubs and aggregators'],
        ]} />
        <div className="rounded-2xl bg-indigo-600 text-white p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-3">Messaging core — identical gates on every path</div>
          <Flow steps={['Authenticate', 'Compliance', 'HLR / MNP', 'Reserve credit', 'Route', 'Submit', 'Receipt']} />
        </div>
        <Cards cols={3} items={[
          ['Interfaces', 'SMPP server, REST, Jasmin HTTP, CLI, console'],
          ['Carrier connectivity', 'Connector pool, TLS / mTLS, circuit breakers'],
          ['Data', 'Durable message log, ledger and audit trail in your database'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Interfaces',
    content: (
      <Table head={['Interface', 'Purpose', 'Details']} rows={[
        ['SMPP server', 'Customer binds (ESMEs)', 'TCP 2775 · TLS · TX / RX / TRX'],
        ['REST API', 'Sending, management, reporting', 'JSON · interactive OpenAPI docs'],
        ['Jasmin HTTP API', 'Drop-in for existing integrations', '/send · /balance · /rate'],
        ['Operator CLI', 'Scripting and runbooks', 'jcli-compatible · TCP 8990'],
        ['Web console', 'Day-to-day operations', '30+ screens, role-based'],
        ['Webhooks', 'Events to your systems', 'HMAC-signed · retried · SSRF-guarded'],
        ['Metrics', 'Monitoring', 'Prometheus endpoint · health checks'],
      ]} />
    ),
  },
  {
    title: 'SMPP protocol support',
    content: (
      <div className="space-y-6">
        <Cards cols={3} items={[
          ['SMPP 3.3', 'Automatic version negotiation on bind'],
          ['SMPP 3.4', 'Complete PDU set and TLV support'],
          ['SMPP 5.0', 'Broadcast commands and enhanced receipts'],
        ]} />
        <Bullets items={[
          'TLS 1.2 / 1.3 on inbound and outbound sessions, with optional mutual TLS',
          'Connectors re-bind automatically and report health to the router',
          'submit_sm, submit_multi, replace_sm, cancel_sm, deliver_sm, alert_notification, outbind',
          'Long messages split and reassembled with UDH across GSM-7, UCS-2 and 8-bit',
        ]} />
      </div>
    ),
  },
  {
    title: 'Message routing',
    content: (
      <div className="space-y-6">
        <Cards items={[
          ['Static', 'Fixed connector per route, matched by filters'],
          ['Weighted round-robin', 'Spread load across connectors, optionally sticky'],
          ['Failover', 'Primary → secondary, with circuit breakers on unhealthy links'],
          ['Least-cost', 'Cheapest route by prefix, weighted by delivery quality'],
        ]} />
        <p className="text-gray-600">Filters match on user, group, connector, source, destination, content, tags and time windows. Number-portability lookups steer each message to the subscriber's current network.</p>
      </div>
    ),
  },
  {
    title: 'Security',
    content: (
      <Cards items={[
        ['Authentication', 'API credentials, signed console sessions, TOTP two-factor sign-in, strong password hashing'],
        ['Network', 'Per-IP throttling, CIDR allow / deny lists, trusted-proxy handling, TLS on SMPP'],
        ['Data protection', 'Parameterised queries, input validation at every boundary, secrets and phone numbers masked in logs'],
        ['Accountability', 'Full audit trail of administrative actions, role-based access (admin / user)'],
      ]} />
    ),
  },
  {
    title: 'Billing & revenue',
    content: (
      <div className="space-y-6">
        <Cards items={[
          ['Prepaid & postpaid', 'Credits deducted per message, or send up to a credit limit and invoice'],
          ['Rate cards', 'Price by country and network prefix, per customer'],
          ['Reserve, charge, settle', 'Credit is held before submit; refund rules per country and network settle rejected, undelivered or expired messages, exactly once'],
          ['Invoices', 'PDF invoices, CSV exports, self-service balance and history'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Regulatory controls',
    content: (
      <div className="space-y-6">
        <Bullets items={[
          'Sender-ID registry with approval workflow and look-alike brand protection',
          'Consent and opt-in rules by region, with quiet-hours windows',
          'Content rules (keywords and patterns) and destination blacklists',
          'Per-region message-segment caps',
        ]} />
        <p className="text-lg font-semibold text-indigo-600">Enforced identically on single, bulk and SMPP traffic — no side door.</p>
      </div>
    ),
  },
  {
    title: 'Deployment & operations',
    content: (
      <Cards items={[
        ['Amazon Web Services', 'EC2 or ECS in your own account and region. AWS Marketplace listing coming soon.'],
        ['On-premise', 'Container image for any Linux host, including air-gapped operator networks'],
        ['Safe testing', 'Built-in SMSC simulator: exercise routes and billing without touching carriers'],
        ['Observability', 'Health endpoints, Prometheus metrics, analytics dashboards, scheduled reports'],
      ]} />
    ),
  },
  {
    title: 'Roadmap',
    content: (
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">Available now</h3>
          <Bullets items={['Advanced and MNP-aware routing', 'Billing, rate cards, refund rules and invoicing', 'Regulatory engine', 'Signed webhooks', 'Analytics and reports']} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-600 mb-3">Next</h3>
          <Bullets items={['Active-active clustering and HA', 'Kubernetes Helm charts', 'Provider SLA monitoring', 'White-label console branding']} />
        </div>
      </div>
    ),
  },
];

/* ───────────── Sales deck ───────────── */

const sales: Slide[] = [
  { title: '', cover: true, content: <Cover title="Sales Overview" subtitle="Run your own carrier-grade SMS platform — routing, billing and compliance in one appliance." /> },
  {
    title: 'The challenge',
    content: (
      <div className="space-y-5">
        <p className="text-xl text-gray-600">Messaging businesses hit the same four walls:</p>
        <Cards tone="rose" items={[
          ['Unpredictable cost', 'Per-message platform fees compound at scale — e.g. $0.0075 × 10M messages = $75,000 a month (illustrative).'],
          ['Vendor lock-in', 'Hosted gateways own your routing decisions, your data and your customer relationships.'],
          ['Compliance gaps', 'Regulators expect audit trails, consent records and data residency your provider may not offer.'],
          ['Patchwork stacks', 'Open-source gateways need separate tools for billing, console, routing logic and monitoring.'],
        ]} />
        <p className="text-lg font-semibold text-indigo-600">{SITE.name} solves all four — with full control and predictable licensing.</p>
      </div>
    ),
  },
  {
    title: `Introducing ${SITE.name}`,
    content: (
      <div className="space-y-8">
        <p className="text-2xl font-semibold text-gray-800">The SMS gateway for businesses that sell, route and account for messages.</p>
        <Cards items={[
          ['Carrier-grade protocol', 'SMPP 3.3 / 3.4 / 5.0 with TLS and mutual TLS'],
          ['A revenue engine', 'Rate cards, refund rules, prepaid and postpaid billing, invoices'],
          ['Compliance built in', 'Sender IDs, consent, quiet hours, content rules'],
          ['Your infrastructure', 'Self-hosted on AWS or on-premise; your data stays yours'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Why switch?',
    content: (
      <Table highlight={2} head={['Capability', 'Typical open-source gateway', SITE.name]} rows={[
        ['Web operator console', 'Add-on or none', 'Built in, 30+ screens'],
        ['Customer billing & invoices', 'Basic balance or external', 'Prepaid, postpaid, PDF invoices'],
        ['Refunds for undelivered traffic', 'No', 'Rules per country, network & customer'],
        ['Least-cost & failover routing', 'Partial', 'Built in, with circuit breakers'],
        ['Number portability routing', 'Rare', 'Built in, local MNP database'],
        ['Regulatory controls', 'Scripted by you', 'Built in, every send path'],
        ['Two-factor sign-in & audit', 'No', 'Yes'],
        ['SMPP 5.0', 'No', 'Yes'],
        ['Vendor support & SLA', 'Community', 'Business or 24×7 enterprise'],
      ]} />
    ),
  },
  {
    title: 'Smart routing',
    content: (
      <div className="space-y-6">
        <Flow steps={['Your traffic', SITE.name, 'Cheapest healthy route']} />
        <Cards tone="emerald" items={[
          ['Lower cost', 'Least-cost routing by destination prefix'],
          ['Higher reliability', 'Automatic failover, no manual intervention'],
          ['Right network', 'Portability lookups reach the subscriber’s current operator'],
          ['Quality-aware', 'Routes weighted by real delivery outcomes'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Use cases',
    content: (
      <Cards items={[
        ['SMS aggregators', 'Per-customer pricing and routing, invoicing and an operator console out of the box.'],
        ['Mobile operators & MVNOs', 'An A2P edge that authenticates, rates and polices enterprise traffic.'],
        ['Financial services', 'OTP and alerts with TLS, audit trails and data kept in your region.'],
        ['Healthcare', 'Reminders and notifications with role-based access and full accountability.'],
        ['Enterprise SaaS', 'Self-hosted messaging with no per-message platform fee.'],
        ['Public sector', 'Citizen notifications on sovereign infrastructure.'],
      ]} />
    ),
  },
  {
    title: 'Migrating from Jasmin',
    content: (
      <div className="space-y-6">
        <Cards items={[
          ['HTTP API compatible', '/send, /balance and /rate keep customer integrations working'],
          ['CLI compatible', 'jcli commands for users, groups, connectors, routes, filters'],
          ['Same model', 'Users, groups, MT / MO routes, filters and interceptors map 1:1'],
          ['Side-by-side', 'Run in parallel and move traffic route by route'],
        ]} />
        <Table head={['Phase', 'Duration', 'Outcome']} rows={[
          ['Evaluation', '1 week', 'Import config, test on the built-in simulator'],
          ['Parallel run', '2–4 weeks', 'Share of live traffic, compare delivery and billing'],
          ['Cut-over', '1 week', 'Remaining binds and routes, monitored'],
        ]} />
      </div>
    ),
  },
  {
    title: 'Talk to our team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-500">Licensing is tailored to your traffic, deployment model and support needs.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { tier: 'Evaluation', items: ['Guided proof of concept', 'Built-in SMSC simulator', 'Technical deep-dive'] },
            { tier: 'Business', items: ['Production licence', 'Business-hours support', 'All platform updates'], hi: true },
            { tier: 'Enterprise', items: ['24×7 support, response SLA', 'Deployment & migration help', 'Roadmap input'] },
          ].map(p => (
            <div key={p.tier} className={`p-5 rounded-xl border-2 ${p.hi ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200'}`}>
              <div className="text-lg font-bold">{p.tier}</div>
              <ul className="mt-3 space-y-1.5 text-sm">{p.items.map(i => <li key={i}>✓ {i}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500">{SITE.salesEmail} · {SITE.url.replace('https://', '')}/contact</p>
      </div>
    ),
  },
  {
    title: 'Get started',
    content: (
      <div className="space-y-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ['1. Request a demo', 'A solutions engineer walks through your traffic profile'],
            ['2. Evaluate', 'Guided proof of concept on your infrastructure'],
            ['3. Go live', 'Onboarding, migration support and an SLA that fits'],
          ].map(([t, d]) => (
            <div key={t} className="bg-gray-50 p-6 rounded-xl">
              <div className="font-semibold text-lg mb-2">{t}</div>
              <div className="text-sm text-gray-500">{d}</div>
            </div>
          ))}
        </div>
        <p className="text-xl font-semibold text-indigo-600">{SITE.name} — {SITE.tagline.toLowerCase()}, forged for carrier scale.</p>
        <p className="text-gray-500">{SITE.salesEmail} · {SITE.infoEmail}</p>
      </div>
    ),
  },
];

const decks: Record<string, { title: string; slides: Slide[] }> = {
  overview: { title: 'Platform Overview', slides: overview },
  sales: { title: 'Sales Overview', slides: sales },
};

/* ───────────── Viewer ───────────── */

export default function Slides() {
  const { deck } = useParams<{ deck: string }>();
  const pres = decks[deck ?? ''];
  const [index, setIndex] = useState(0);
  const last = (pres?.slides.length ?? 1) - 1;

  const next = useCallback(() => setIndex(i => Math.min(i + 1, last)), [last]);
  const prev = useCallback(() => setIndex(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!pres) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Presentation not found</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">Return to home</Link>
        </div>
      </div>
    );
  }

  const slide = pres.slides[index];

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <title>{`${pres.title} — ${SITE.name}`}</title>
      <nav className="bg-white/85 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/" className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-sm"><ChevronLeft className="w-4 h-4" /> {SITE.name}</Link>
            <span className="text-gray-300">|</span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 truncate"><PresentationIcon className="w-4 h-4 text-gray-400" />{pres.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{index + 1} / {pres.slides.length}</span>
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700" title="Print or save as PDF">
              <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 print:hidden">
        <div className="w-full max-w-4xl animate-scale-in" key={index}>
          {!slide.cover && <h2 className="text-3xl font-bold text-gray-900 mb-8">{slide.title}</h2>}
          <div className="text-gray-700">{slide.content}</div>
        </div>
      </main>

      <div className="border-t border-gray-200 py-4 print:hidden">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <button onClick={prev} disabled={index === 0} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <div className="hidden sm:flex gap-1.5">
            {pres.slides.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'}`} />
            ))}
          </div>
          <button onClick={next} disabled={index === last} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Print / PDF: every slide on its own landscape page */}
      <div className="hidden print:block">
        {pres.slides.map((s, i) => (
          <section key={i} className="break-after-page px-6 py-6">
            <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
              <span className="inline-flex items-center gap-2"><img src="/smppforge-logo.svg" alt="" className="w-4 h-4" />{SITE.name} — {pres.title}</span>
              <span>{i + 1} / {pres.slides.length}</span>
            </div>
            {!s.cover && <h2 className="text-2xl font-bold mb-6">{s.title}</h2>}
            <div>{s.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
