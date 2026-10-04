import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Shield, Globe, BarChart3, ArrowRight, CheckCircle2, Clock, Radio, GitBranch,
  Phone, CreditCard, Lock, Gauge, Code2, Eye, Cpu, MemoryStick, Building2, Satellite,
  Webhook, Scale, Server, Cloud, Terminal, ArrowLeftRight, Users, Minus,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import { SiteNav, SiteFooter } from '../components/Chrome';
import { BENCH, PUBLISHED, fmt } from '../benchmark';
import { SITE } from '../site';

/* ───────────────────────── Platform ───────────────────────── */

const features = [
  { icon: Radio, title: 'SMPP 3.3 / 3.4 / 5.0', description: 'Client and server roles with TLS and mutual TLS, automatic re-binding, and delivery receipts tracked end to end.' },
  { icon: GitBranch, title: 'Intelligent routing', description: 'Static, weighted round-robin, failover with circuit breakers, least-cost with quality weighting, and number-portability-aware routes.' },
  { icon: CreditCard, title: 'Real-time billing', description: 'Prepaid and postpaid accounts, rate cards by country and network, credit reserved before submit and refunded on failure, PDF invoices.' },
  { icon: Scale, title: 'Regulatory controls', description: 'Sender-ID registry, consent and opt-in rules, quiet hours, content rules and number blacklists — enforced on every send path.' },
  { icon: Phone, title: 'HLR & number portability', description: 'Multi-provider HLR lookups with caching, country-specific providers, and a local ported-number database you can import.' },
  { icon: Code2, title: 'REST API & OpenAPI', description: 'JSON API with interactive documentation, bulk sends with live progress, and Jasmin-compatible HTTP endpoints.' },
  { icon: Webhook, title: 'Webhooks & DLR callbacks', description: 'HMAC-signed events with retries and delivery history; every callback URL is checked against internal-network targets.' },
  { icon: Eye, title: 'Operator console', description: '30+ screens for users, groups, connectors, routes, filters, interceptors, billing, analytics, reports and audit.' },
  { icon: Shield, title: 'Security & observability', description: 'TOTP two-factor sign-in, role-based access, IP allow/deny lists, API throttling, full audit trail and Prometheus metrics.' },
];

const roadmap = {
  available: [
    'Single-node gateway: SMPP + HTTP + console',
    'Advanced & MNP-aware routing',
    'Prepaid / postpaid billing and invoicing',
    'Regulatory engine & sender-ID registry',
    'Signed webhooks and DLR callbacks',
    'Analytics dashboards and scheduled reports',
  ],
  next: [
    'Active-active clustering and high availability',
    'Kubernetes Helm charts',
    'Provider SLA monitoring and automated alerting',
    'White-label console branding',
  ],
};

const useCases = [
  { icon: Users, title: 'SMS aggregators & hubs', desc: 'Onboard customers over SMPP or HTTP, bill them per message, and route each destination to the cheapest healthy carrier.' },
  { icon: Satellite, title: 'Mobile operators & MVNOs', desc: 'Front your SMSC with an A2P edge that authenticates, rates, filters and accounts for enterprise traffic.' },
  { icon: Building2, title: 'Enterprise platforms', desc: 'Run OTP, alerts and notifications on your own infrastructure — your carrier contracts, your margins, your data.' },
  { icon: Lock, title: 'Regulated industries', desc: 'Keep message data in your region with an audit trail, encryption in transit and role-based access for every action.' },
];

/* ───────────────────────── Comparison ───────────────────────── */

type Cell = { v: string; ok?: boolean | null };
const yes = (v: string): Cell => ({ v, ok: true });
const no = (v: string): Cell => ({ v, ok: false });
const part = (v: string): Cell => ({ v, ok: null });

const openSource: { feature: string; forge: Cell; jasmin: Cell; kannel: Cell }[] = [
  { feature: 'Licence & support', forge: yes('Commercial, vendor-supported'), jasmin: part('Open source (Apache-2.0)'), kannel: part('Open source (BSD-style)') },
  { feature: 'SMPP versions', forge: yes('3.3 · 3.4 · 5.0'), jasmin: part('3.4'), kannel: part('3.3 · 3.4') },
  { feature: 'SMPP server for customer binds', forge: yes('Built in'), jasmin: yes('Built in'), kannel: part('Add-on (opensmppbox)') },
  { feature: 'Web operator console', forge: yes('Built in, 30+ screens'), jasmin: part('Community add-on'), kannel: no('Status page only') },
  { feature: 'JSON REST API with OpenAPI docs', forge: yes('Yes'), jasmin: part('Separate REST service'), kannel: no('Query-string HTTP') },
  { feature: 'Failover / round-robin / least-cost routing', forge: yes('Yes, with circuit breakers'), jasmin: yes('Yes'), kannel: part('Prefix & SMSC rules') },
  { feature: 'HLR / number-portability routing', forge: yes('Built in + local MNP DB'), jasmin: part('HLR lookup routes'), kannel: no('No') },
  { feature: 'Customer billing, rate cards & invoices', forge: yes('Prepaid, postpaid, PDF invoices'), jasmin: part('Balance & quotas'), kannel: no('External') },
  { feature: 'Regulatory controls (sender ID, consent, quiet hours)', forge: yes('Built in'), jasmin: part('Via filters & interceptors'), kannel: no('External') },
  { feature: 'Signed webhooks & DLR callbacks', forge: yes('HMAC-signed, retried'), jasmin: part('DLR callbacks'), kannel: part('DLR URL callbacks') },
  { feature: 'Two-factor sign-in & audit trail', forge: yes('TOTP 2FA + full audit log'), jasmin: no('No'), kannel: no('No') },
  { feature: 'Prometheus metrics', forge: yes('Yes'), jasmin: yes('Yes'), kannel: part('XML status page') },
  { feature: 'Jasmin HTTP API & jcli compatibility', forge: yes('Yes'), jasmin: yes('Native'), kannel: no('No') },
];

const landscape = [
  { product: 'Restcomm SMSC (now Mobius Software)', kind: 'Operator SMSC with SS7 / SIGTRAN', licence: 'AGPL-3.0 or commercial', fit: 'Core-network SMSC that must speak SS7 MAP', diff: 'SMPP Forge sits at the SMPP / HTTP edge — hubbing, billing and routing — alongside your SMSC rather than replacing SS7 signalling.' },
  { product: 'NowSMS', kind: 'SMS & MMS gateway', licence: 'Commercial · Windows, Linux', fit: 'Enterprise SMS / MMS, MMSC and modem deployments', diff: 'Built for aggregators: SMPP 5.0, customer billing and invoicing, regulatory engine and a multi-customer operator console.' },
  { product: 'Ozeki SMS Gateway', kind: 'SMS gateway / SMPP server', licence: 'Commercial · Windows-first', fit: 'Corporate messaging on Windows estates', diff: 'Linux-native and container-ready, with least-cost and MNP-aware routing and per-customer rating built in.' },
  { product: 'Alaris SMS Platform', kind: 'Wholesale SMS hubbing platform', licence: 'Commercial', fit: 'Carriers hubbing A2P / P2P across many protocols', diff: 'Focused SMPP / HTTP footprint, fast time to production, and a direct migration path from Jasmin.' },
  { product: 'CPaaS APIs (Twilio, Vonage, Infobip, Sinch)', kind: 'Hosted messaging APIs', licence: 'Usage-based, vendor-hosted', fit: 'Teams that want SMS without running infrastructure', diff: 'You own the routing, carrier contracts, margins and data residency — no per-message platform fee.' },
];

/* ───────────────────────── Benchmarks ───────────────────────── */

const PRO = '#6366f1';
type BenchTab = 'throughput' | 'latency' | 'cpu' | 'memory';

const benchTabs: Record<BenchTab, { label: string; icon: typeof Gauge; title: string; desc: string; unit: string; x: string; data: { name: string; value: number }[] }> = {
  throughput: {
    label: 'Throughput', icon: Gauge, unit: 'msg/s', x: 'Concurrent API clients',
    title: 'Sustained throughput (messages / second)',
    desc: 'Higher is better — every message is a full API → billing → routing → SMPP submit round trip, acknowledged by the SMSC.',
    data: BENCH.sweep.map(p => ({ name: `${p.concurrency}`, value: Math.round(p.msgPerSec) })),
  },
  latency: {
    label: 'Latency', icon: Clock, unit: 'ms', x: 'Percentile',
    title: `End-to-end latency at ${BENCH.latency.concurrency} concurrent clients (ms)`,
    desc: 'Lower is better — time from API request to SMSC-acknowledged message ID.',
    data: [
      { name: 'P50', value: BENCH.latency.p50 }, { name: 'P90', value: BENCH.latency.p90 },
      { name: 'P99', value: BENCH.latency.p99 }, { name: 'P99.9', value: BENCH.latency.p999 },
    ],
  },
  cpu: {
    label: 'CPU', icon: Cpu, unit: '% of 1 core', x: 'Offered load (msg/s)',
    title: 'Gateway CPU at fixed load (% of one core)',
    desc: 'Lower is better — gateway process only, measured from the OS while traffic is paced.',
    data: [{ name: 'Idle', value: BENCH.idle.cpuPct }, ...BENCH.paced.map(p => ({ name: fmt(p.rate), value: p.cpuPct }))],
  },
  memory: {
    label: 'Memory', icon: MemoryStick, unit: 'MB', x: 'Offered load (msg/s)',
    title: 'Gateway resident memory at fixed load (MB)',
    desc: 'Lower is better — resident set size of the gateway process.',
    data: [{ name: 'Idle', value: BENCH.idle.rssMb }, ...BENCH.paced.map(p => ({ name: fmt(p.rate), value: p.rssMb }))],
  },
};

const peak = BENCH.sweep.reduce((a, b) => (b.msgPerSec > a.msgPerSec ? b : a));
const peakRss = Math.round(Math.max(...BENCH.paced.map(p => p.rssMb)));
// Performance figures appear only once PUBLISHED is set (see benchmark.ts).
const heroStats = PUBLISHED ? [
  { label: 'Messages / sec, single node', value: `${fmt(Math.floor(peak.msgPerSec / 100) * 100)}+`, icon: Gauge },
  { label: `P99 latency at ${BENCH.latency.concurrency} clients`, value: `${BENCH.latency.p99} ms`, icon: Clock },
  { label: 'Peak resident memory under load', value: `~${peakRss} MB`, icon: MemoryStick },
  { label: 'SMPP protocol versions', value: '3.3 · 3.4 · 5.0', icon: Radio },
] : [
  { label: 'SMPP protocol versions', value: '3.3 · 3.4 · 5.0', icon: Radio },
  { label: 'Operator console screens', value: '30+', icon: Eye },
  { label: 'Encrypted SMPP sessions', value: 'TLS · mTLS', icon: Lock },
  { label: 'Jasmin-compatible API & CLI', value: 'Drop-in', icon: ArrowLeftRight },
];

function BenchTooltip({ active, payload, label, unit }: { active?: boolean; payload?: { value: number }[]; label?: string; unit: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 text-xs">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p><span className="font-bold text-gray-900">{payload[0].value.toLocaleString()}</span> <span className="text-gray-500">{unit}</span></p>
    </div>
  );
}

function CellView({ cell, strong = false }: { cell: Cell; strong?: boolean }) {
  const icon = cell.ok === true
    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
    : cell.ok === false
      ? <Minus className="w-4 h-4 text-gray-300 flex-shrink-0" />
      : <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-amber-400" /></span>;
  return (
    <div className={`flex items-start gap-2 ${strong ? 'font-semibold text-indigo-800' : cell.ok === false ? 'text-gray-400' : 'text-gray-600'}`}>
      {icon}<span>{cell.v}</span>
    </div>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="text-center mb-14">
      {eyebrow && <div className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">{eyebrow}</div>}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      {children && <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{children}</p>}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<BenchTab>('throughput');
  const bench = benchTabs[tab];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <title>SMPP Forge — Enterprise SMPP &amp; SMS Gateway</title>
      <SiteNav />

      {/* ═════════════ HERO ═════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" /> {SITE.tagline}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            <span className="text-gray-900">High-performance</span><br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">SMPP &amp; SMS gateway</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Engineered for carrier scale. SMPP 3.3 / 3.4 / 5.0, intelligent routing, real-time billing,
            regulatory controls and a complete operator console — in one self-hosted appliance.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl text-base font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all">
              Request a demo <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PUBLISHED ? '#benchmarks' : '#comparison'} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-700 rounded-xl text-base font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
              {PUBLISHED ? 'See measured performance' : 'Compare gateways'}
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {heroStats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/90 rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                <Icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
          {PUBLISHED && <p className="mt-4 text-xs text-gray-400">Measured {BENCH.date} on a single node — <a href="#methodology" className="underline hover:text-gray-600">methodology</a>.</p>}
          <div className="mt-12 flex flex-wrap justify-center gap-2 text-sm font-medium text-gray-600">
            {['Mobile network operators', 'MVNOs', 'SMS aggregators & hubs', 'Enterprise messaging platforms'].map(a => (
              <span key={a} className="px-3 py-1 rounded-full bg-white/70 border border-gray-200">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ PLATFORM ═════════════ */}
      <section id="platform" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Platform" title="Everything a messaging operator needs">
            Protocol, routing, rating, compliance and operations in one product — no glue code between five open-source tools.
          </SectionHead>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ BENCHMARKS ═════════════ */}
      {PUBLISHED && <section id="benchmarks" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Measured performance" title="Real numbers, not targets">
            Every figure below comes from a recorded load test of the production build — throughput, tail latency and the gateway's own resource use.
          </SectionHead>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(Object.keys(benchTabs) as BenchTab[]).map(key => {
              const { label, icon: TabIcon } = benchTabs[key];
              return (
                <button key={key} onClick={() => setTab(key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === key ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <TabIcon className="w-4 h-4" /> {label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900">{bench.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{bench.desc}</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={bench.data} barCategoryGap="25%" margin={{ top: 24, right: 8, left: 0, bottom: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false}
                    label={{ value: bench.x, position: 'insideBottom', offset: -10, fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => (v >= 1000 ? `${v / 1000}K` : String(v))} />
                  <Tooltip cursor={{ fill: '#eef2ff' }} content={<BenchTooltip unit={bench.unit} />} />
                  <Bar dataKey="value" fill={PRO} radius={[6, 6, 0, 0]} maxBarSize={56}>
                    <LabelList dataKey="value" position="top" fontSize={11} fill="#475569"
                      formatter={(v: unknown) => (typeof v === 'number' && v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v))} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6">
                <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4">Key takeaways</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <KeyStat val={`${fmt(Math.round(peak.msgPerSec))}`} label={`msg/s with ${peak.concurrency} concurrent clients, zero failed messages`} />
                  <KeyStat val={`${BENCH.latency.p50} ms`} label={`median end-to-end latency at ${BENCH.latency.concurrency} clients`} />
                  <KeyStat val={`${BENCH.paced[BENCH.paced.length - 1].cpuPct}%`} label={`of one CPU core at ${fmt(BENCH.paced[BENCH.paced.length - 1].rate)} msg/s`} />
                  <KeyStat val={`${peakRss} MB`} label="peak resident memory under load" />
                </div>
              </div>
              <div id="methodology" className="bg-gray-900 rounded-2xl p-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Methodology</div>
                <ul className="text-xs text-gray-300 leading-relaxed space-y-1.5 list-disc pl-4">
                  <li>Single gateway node; {BENCH.env.cpu}, {BENCH.env.cores} threads, {BENCH.env.ramGb} GB RAM, Linux. Load generator and SMSC simulator on the same host.</li>
                  <li>Synchronous HTTP send API: authentication, billing reservation, routing and an SMPP <code>submit_sm</code> acknowledged by the SMSC — per message.</li>
                  <li>{BENCH.note}. Per-IP API throttle lifted (single load-generator address); all account-level gates on.</li>
                  <li>Production build, warm-up run discarded. Run {BENCH.date}.</li>
                </ul>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 hover:text-white">
                  Request the load-test kit to reproduce on your hardware <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* ═════════════ ARCHITECTURE ═════════════ */}
      <section id="architecture" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Architecture" title="One appliance, every interface">
            Customers connect over SMPP or HTTP; your team operates through the console, the API or a familiar CLI. A single core applies the same gates to all of it.
          </SectionHead>
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100 p-6 sm:p-10">
            <Tier label="Your customers & applications">
              {[
                { icon: Radio, label: 'ESMEs & aggregators', sub: 'SMPP binds' },
                { icon: Globe, label: 'Applications', sub: 'REST / HTTP' },
                { icon: Terminal, label: 'Operations team', sub: 'CLI & automation' },
                { icon: Eye, label: 'Staff & customers', sub: 'Web console' },
              ].map(({ icon: I, label, sub }) => (
                <div key={label} className="bg-white/80 rounded-xl border border-gray-200 p-3 text-center">
                  <I className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-gray-700">{label}</div>
                  <div className="text-[11px] text-gray-400">{sub}</div>
                </div>
              ))}
            </Tier>
            <Arrow />
            <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5">
              <div className="text-center text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Interfaces</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Radio, label: 'SMPP server', port: 'TCP 2775 · TLS', color: 'bg-violet-100 text-violet-700' },
                  { icon: Code2, label: 'REST & Jasmin HTTP API', port: 'HTTPS', color: 'bg-blue-100 text-blue-700' },
                  { icon: Terminal, label: 'jcli-compatible CLI', port: 'TCP 8990', color: 'bg-emerald-100 text-emerald-700' },
                  { icon: Eye, label: 'Operator console', port: 'HTTPS', color: 'bg-amber-100 text-amber-700' },
                ].map(({ icon: I, label, port, color }) => (
                  <div key={label} className={`${color} rounded-xl p-3 text-center`}>
                    <I className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-bold">{label}</div>
                    <div className="text-[11px] opacity-70">{port}</div>
                  </div>
                ))}
              </div>
            </div>
            <Arrow label="Auth · throttling · IP policy" />
            <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-xl shadow-indigo-600/20">
              <div className="text-center text-xs font-bold uppercase tracking-wider mb-4 text-indigo-200">Messaging core — same gates on every send path</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  ['Compliance', 'Blacklist · consent · sender ID'],
                  ['HLR / MNP', 'Portability lookups'],
                  ['Billing', 'Reserve · charge · refund'],
                  ['Routing', 'LCR · failover · RR'],
                  ['Long SMS', 'Split · UDH · encodings'],
                  ['DLR', 'Receipts · webhooks'],
                ].map(([label, desc]) => (
                  <div key={label} className="bg-white/15 rounded-lg p-2.5 text-center">
                    <div className="text-xs font-bold">{label}</div>
                    <div className="text-[11px] text-indigo-200 mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <Arrow />
            <div className="bg-white rounded-2xl border border-violet-200 shadow-sm p-5">
              <div className="text-center text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Carrier connectivity</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  ['Connector pool', 'Auto re-bind, health tracking'],
                  ['TLS / mTLS', 'Encrypted SMPP sessions'],
                  ['Circuit breakers', 'Fail over unhealthy routes'],
                ].map(([label, desc]) => (
                  <div key={label} className="bg-violet-50 rounded-xl p-3 text-center">
                    <div className="text-xs font-bold text-violet-700">{label}</div>
                    <div className="text-[11px] text-violet-500">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <Arrow />
            <div className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Upstream SMSCs, carriers and SMS hubs</div>
          </div>
        </div>
      </section>

      {/* ═════════════ USE CASES + ROADMAP ═════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Built for messaging businesses</h2>
            <div className="space-y-6">
              {useCases.map(({ icon: I, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-11 h-11 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0"><I className="w-5 h-5 text-violet-600" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">A transparent roadmap</h2>
            <p className="text-sm text-gray-600 mb-6">We tell you what ships today and what is coming — so you can plan your rollout with confidence.</p>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">Available now</h3>
            <ul className="space-y-2 mb-6">
              {roadmap.available.map(r => <li key={r} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />{r}</li>)}
            </ul>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">On the roadmap</h3>
            <ul className="space-y-2">
              {roadmap.next.map(r => <li key={r} className="flex gap-2 text-sm text-gray-600"><Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{r}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ═════════════ COMPARISON ═════════════ */}
      <section id="comparison" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Compare" title="How SMPP Forge compares">
            Side by side with the two most deployed open-source gateways, and positioned against the wider market.
          </SectionHead>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 w-[28%]">Capability</th>
                  <th className="p-4 text-left font-bold text-indigo-700 bg-indigo-50 w-[24%]"><span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4" />SMPP Forge</span></th>
                  <th className="p-4 text-left font-semibold text-gray-600 bg-gray-50 w-[24%]">Jasmin</th>
                  <th className="p-4 text-left font-semibold text-gray-600 bg-gray-50 w-[24%]">Kannel</th>
                </tr>
              </thead>
              <tbody>
                {openSource.map(row => (
                  <tr key={row.feature} className="border-b border-gray-50 align-top">
                    <td className="p-3.5 font-medium text-gray-800">{row.feature}</td>
                    <td className="p-3.5 bg-indigo-50/40"><CellView cell={row.forge} strong /></td>
                    <td className="p-3.5"><CellView cell={row.jasmin} /></td>
                    <td className="p-3.5"><CellView cell={row.kannel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Built in</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Partial, add-on or external</span>
            <span className="inline-flex items-center gap-1.5"><Minus className="w-3.5 h-3.5 text-gray-300" /> Not available</span>
          </div>

          <h3 className="mt-16 mb-6 text-xl font-bold text-gray-900 text-center">The wider market</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-gray-700">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Licence / platform</th>
                  <th className="p-4 font-semibold">Typical fit</th>
                  <th className="p-4 font-semibold text-indigo-700">Where SMPP Forge is different</th>
                </tr>
              </thead>
              <tbody>
                {landscape.map(r => (
                  <tr key={r.product} className="border-b border-gray-50 align-top">
                    <td className="p-4 font-semibold text-gray-900">{r.product}</td>
                    <td className="p-4 text-gray-600">{r.kind}</td>
                    <td className="p-4 text-gray-600">{r.licence}</td>
                    <td className="p-4 text-gray-600">{r.fit}</td>
                    <td className="p-4 text-indigo-900 bg-indigo-50/40">{r.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500 max-w-4xl">
            Based on publicly available vendor documentation as of October 2026; products change, so verify against current
            vendor material. Spotted something out of date? Tell us at <a className="underline" href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a>.
            Product names are trademarks of their respective owners.
          </p>
        </div>
      </section>

      {/* ═════════════ MIGRATION ═════════════ */}
      <section id="migration" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">Migration</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Running Jasmin today? Move without rewriting.</h2>
            <p className="mt-4 text-lg text-gray-600">
              SMPP Forge speaks the interfaces your customers and scripts already use, so you can run both side by side and cut over route by route.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ['Jasmin-compatible HTTP API', 'The /send, /balance and /rate endpoints keep working for existing customer integrations.'],
                ['jcli-compatible operator CLI', 'Same user, group, connector, router, filter and interceptor commands for your runbooks.'],
                ['Same configuration model', 'Users and groups, MT / MO routes, filters and interceptors map one to one.'],
                ['Standard SMPP everywhere', 'Customers re-point their binds; carriers see an ordinary ESME.'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <ArrowLeftRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div><div className="font-semibold text-gray-900">{t}</div><div className="text-sm text-gray-600">{d}</div></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">A typical cut-over</h3>
            <ol className="space-y-5">
              {[
                ['Week 1', 'Evaluation', 'Install, import users and routes, test against the built-in SMSC simulator.'],
                ['Weeks 2–4', 'Parallel run', 'Shift a share of live traffic; compare delivery, latency and billing.'],
                ['Week 5', 'Cut-over', 'Move remaining binds and routes with monitoring in place.'],
                ['Ongoing', 'Optimise', 'Tune least-cost and failover routes against real delivery data.'],
              ].map(([when, what, detail], i) => (
                <li key={what} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <div>
                    <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{when}</div>
                    <div className="font-semibold text-gray-900">{what}</div>
                    <div className="text-sm text-gray-600">{detail}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═════════════ DEPLOYMENT ═════════════ */}
      <section id="deployment" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Deployment" title="Your infrastructure, your data">
            SMPP Forge is self-hosted software. Message content, customer data and routing decisions never leave the environment you choose.
          </SectionHead>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cloud, title: 'Amazon Web Services', body: 'Run on Amazon EC2 or ECS with managed database and cache services (Amazon RDS, Amazon ElastiCache). AWS Marketplace listing coming soon.' },
              { icon: Server, title: 'On-premise & private cloud', body: 'Ships as a container image for any Linux host or orchestrator, including air-gapped networks inside an operator core.' },
              { icon: BarChart3, title: 'Operate with confidence', body: 'Health endpoints, Prometheus metrics, audit trail and a built-in SMSC simulator for safe testing before go-live.' },
            ].map(({ icon: I, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <I className="w-7 h-7 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ ENGAGEMENT ═════════════ */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Engagement" title="Talk to our team">
            Licensing is tailored to your traffic, deployment model and support needs. Every engagement starts with a guided evaluation.
          </SectionHead>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: 'Evaluation', desc: 'Prove it on your traffic profile.', items: ['Guided proof of concept', 'Built-in SMSC simulator', 'Technical deep-dive call'], cta: 'Request a demo', hi: false },
              { tier: 'Business', desc: 'Production licence for growing platforms.', items: ['Production licence', 'Business-hours support', 'All platform updates'], cta: 'Get a quote', hi: true },
              { tier: 'Enterprise', desc: 'For operators and large aggregators.', items: ['24×7 support with response-time SLA', 'Deployment & migration assistance', 'Roadmap input'], cta: 'Contact sales', hi: false },
            ].map(p => (
              <div key={p.tier} className={`rounded-2xl p-8 relative ${p.hi ? 'border-2 border-indigo-600 shadow-xl shadow-indigo-600/10' : 'border border-gray-200'}`}>
                {p.hi && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">Most popular</div>}
                <div className="text-lg font-semibold text-gray-900">{p.tier}</div>
                <p className="text-sm text-gray-500 mt-1 mb-5">{p.desc}</p>
                <ul className="space-y-2 mb-7">
                  {p.items.map(i => <li key={i} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />{i}</li>)}
                </ul>
                <Link to="/contact" className={`block w-full py-2.5 rounded-lg text-sm font-semibold text-center transition-colors ${p.hi ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ CTA ═════════════ */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to forge your messaging platform?</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-9">
            See SMPP Forge on your own traffic profile. Our engineers will walk you through routing, billing and migration in one session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 shadow-lg transition-all">
              Request a demo <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={`mailto:${SITE.salesEmail}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white rounded-xl font-semibold border border-white/25 hover:bg-white/20 transition-all">
              {SITE.salesEmail}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function KeyStat({ val, label }: { val: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-bold text-indigo-700 whitespace-nowrap">{val}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}

function Tier({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="text-center mb-3"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{children}</div>
    </>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex justify-center my-3">
      <div className="flex flex-col items-center">
        <div className="w-px h-4 bg-indigo-300" />
        {label && <div className="px-3 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[11px] font-semibold">{label}</div>}
        {label && <div className="w-px h-4 bg-indigo-300" />}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-400" />
      </div>
    </div>
  );
}
