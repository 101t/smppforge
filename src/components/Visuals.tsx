import {
  LayoutDashboard, Send, History, Users, Receipt, GitBranch, ShieldCheck, ChartColumn, FileText, Search, Bell, Check,
  ArrowUpRight, RotateCcw, Signal,
} from 'lucide-react';
import { useId } from 'react';
import { SITE } from '../site';

/* ───────── Hero: messages flowing from customers, through the gateway, to carriers worldwide ───────── */

const SOURCES = [
  { y: 112, label: 'Apps & APIs', sub: 'REST · HTTP' },
  { y: 230, label: 'SMPP customers', sub: 'Aggregators · resellers' },
  { y: 348, label: 'Customer portal', sub: 'Self-service' },
];
const REGIONS = ['North America', 'Europe', 'Middle East', 'Africa', 'Asia-Pacific', 'Latin America'].map((label, i) => ({ label, y: 50 + i * 72 }));
const HUB = { x: 300, y: 230 };
const inPath = (y: number) => `M172,${y} C212,${y} 214,${HUB.y} 244,${HUB.y}`;
const outPath = (y: number) => `M356,${HUB.y} C398,${HUB.y} 402,${y} 446,${y}`;
const journey = (s: number, r: number) => `${inPath(SOURCES[s].y)} L356,${HUB.y} C398,${HUB.y} 402,${REGIONS[r].y} 446,${REGIONS[r].y}`;
const TRIPS: [number, number, number][] = [[0, 0, 0], [1, 1, 0.5], [2, 4, 1.1], [0, 2, 1.7], [1, 5, 2.2], [2, 3, 2.7], [1, 0, 3.3], [0, 4, 3.9]];

export function SignalFlow() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (name: string) => `${name}-${uid}`;
  return (
    <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label={`Messages from apps, SMPP customers and the customer portal flow through ${SITE.name} to carriers in every region`}>
      <defs>
        <linearGradient id={id('hub')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f55f2" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <radialGradient id={id('glow')}>
          <stop offset="0" stopColor="#3a6bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3a6bff" stopOpacity="0" />
        </radialGradient>
        <filter id={id('dot')} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx={HUB.x} cy={HUB.y} r="150" fill={`url(#${id('glow')})`} />

      {SOURCES.map(s => (
        <g key={s.label}>
          <path d={inPath(s.y)} fill="none" stroke="rgb(143 163 204 / 0.22)" strokeWidth="1.5" />
          <path d={inPath(s.y)} fill="none" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="2 12" className="animate-flow" />
        </g>
      ))}
      {REGIONS.map(r => (
        <g key={r.label}>
          <path d={outPath(r.y)} fill="none" stroke="rgb(143 163 204 / 0.22)" strokeWidth="1.5" />
          <path d={outPath(r.y)} fill="none" stroke="#5f8cff" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="2 12" className="animate-flow" />
        </g>
      ))}

      <g className="motion-dot" filter={`url(#${id('dot')})`}>
        {TRIPS.map(([s, r, delay]) => (
          <circle key={`${s}-${r}-${delay}`} r="3.2" fill="#67e8f9" opacity="0">
            <animateMotion dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" path={journey(s, r)} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {SOURCES.map(s => (
        <g key={s.label} transform={`translate(22 ${s.y - 26})`}>
          <rect width="150" height="52" rx="12" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.14)" />
          <text x="14" y="23" fill="#fff" fontSize="13" fontWeight="600">{s.label}</text>
          <text x="14" y="40" fill="#8fa3cc" fontSize="11">{s.sub}</text>
        </g>
      ))}

      {REGIONS.map(r => (
        <g key={r.label} transform={`translate(446 ${r.y - 19})`}>
          <rect width="138" height="38" rx="10" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.14)" />
          {[0, 1, 2].map(b => <rect key={b} x={13 + b * 5} y={24 - b * 4} width="3" height={5 + b * 4} rx="1" fill={b < 2 ? '#22d3ee' : '#5f8cff'} />)}
          <text x="36" y="24" fill="#e3e9f5" fontSize="12" fontWeight="500">{r.label}</text>
        </g>
      ))}

      <g style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }} className="animate-pulse-ring">
        <circle cx={HUB.x} cy={HUB.y} r="64" fill="none" stroke="#22d3ee" strokeOpacity="0.5" />
      </g>
      <circle cx={HUB.x} cy={HUB.y} r="58" fill={`url(#${id('hub')})`} />
      <circle cx={HUB.x} cy={HUB.y} r="58" fill="none" stroke="rgb(255 255 255 / 0.35)" />
      <g transform={`translate(${HUB.x - 39} ${HUB.y - 47}) scale(1.4)`}>
        <path fill="#fff" fillRule="evenodd" d="M19 13h18a11 11 0 0 1 11 11v10a11 11 0 0 1-11 11H26l-13 9 2.6-9.4A11 11 0 0 1 8 34V24a11 11 0 0 1 11-11Zm13 5L21 31h6.5L24 40l11-13h-6.5L32 18Z" />
        <path stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" d="M47 9.5 48 4.5M52 10l4-4M54.5 15l5-1" />
      </g>
      <g transform={`translate(${HUB.x - 90} ${HUB.y + 74})`}>
        <rect width="180" height="26" rx="13" fill="rgb(3 10 28 / 0.85)" stroke="rgb(255 255 255 / 0.14)" />
        <text x="90" y="17" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontWeight="600">Check · Bill · Route · Deliver</text>
      </g>
    </svg>
  );
}

/* ───────── Console preview ───────── */

const HOURS = [22, 18, 15, 13, 12, 14, 20, 32, 48, 62, 70, 74, 76, 73, 71, 74, 78, 82, 80, 72, 60, 48, 36, 28];
const SIDEBAR = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Send, label: 'Send SMS' },
  { icon: History, label: 'Message history' },
  { icon: Users, label: 'Customers' },
  { icon: Receipt, label: 'Billing & invoices' },
  { icon: GitBranch, label: 'Routing' },
  { icon: ShieldCheck, label: 'Compliance' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
];
const KPIS = [
  { label: 'Messages today', value: '1.28M', delta: '+12.4%' },
  { label: 'Delivery rate', value: '97.6%', delta: '+0.8%' },
  { label: 'Revenue today', value: '$8,412', delta: '+9.1%' },
  { label: 'Carriers online', value: '14 / 14', delta: 'All healthy' },
];
const DESTS = [['United States', 32], ['United Kingdom', 18], ['India', 14], ['Brazil', 11], ['Germany', 8]] as const;
const FEED = [
  { tone: 'ok', text: 'Delivered', to: '+1 212 ••• ••47', meta: 'Carrier A · 1.4 s' },
  { tone: 'warn', text: 'Rerouted', to: '+91 98••• •••12', meta: 'Carrier C → B' },
  { tone: 'ok', text: 'Delivered', to: '+44 79•• ••• 210', meta: 'Carrier D · 2.1 s' },
  { tone: 'info', text: 'Refunded', to: '+55 11 ••••-••88', meta: 'Expired · 100%' },
] as const;
const feedTone = { ok: 'bg-emerald-50 text-emerald-700', warn: 'bg-amber-50 text-amber-700', info: 'bg-brand-50 text-brand-700' };

export function ConsoleMock() {
  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-2xl bg-white text-ink-900 shadow-2xl shadow-black/40 ring-1 ring-white/20">
        <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-[11px] text-ink-500 ring-1 ring-ink-100">
            <ShieldCheck className="h-3 w-3 text-emerald-600" aria-hidden /> console.your-company.com
          </div>
        </div>
        <div className="grid md:grid-cols-[190px_1fr]">
          <aside className="hidden border-r border-ink-100 bg-ink-50/60 p-3 md:block">
            <div className="mb-3 flex items-center gap-2 px-2 py-1.5">
              <img src="/smppforge-logo.svg" alt="" className="h-5 w-5" />
              <span className="font-display text-sm font-bold">Your brand</span>
            </div>
            <ul className="space-y-0.5">
              {SIDEBAR.map(({ icon: I, label, active }) => (
                <li key={label} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium ${active ? 'bg-brand-600 text-white' : 'text-ink-600'}`}>
                  <I className="h-3.5 w-3.5" aria-hidden />{label}
                </li>
              ))}
            </ul>
          </aside>
          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-base font-bold">Dashboard</div>
                <div className="text-[11px] text-ink-500">Live · last 24 hours</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-lg bg-ink-50 px-2.5 py-1.5 text-[11px] text-ink-400 ring-1 ring-ink-100 sm:flex"><Search className="h-3 w-3" aria-hidden />Search messages</div>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-50 ring-1 ring-ink-100"><Bell className="h-3.5 w-3.5 text-ink-500" aria-hidden /></span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {KPIS.map(k => (
                <div key={k.label} className="rounded-xl p-3 ring-1 ring-ink-100">
                  <div className="text-[10px] font-medium uppercase tracking-wide text-ink-500">{k.label}</div>
                  <div className="mt-1 font-display text-lg font-bold">{k.value}</div>
                  <div className="text-[10px] font-semibold text-emerald-600">{k.delta}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col rounded-xl p-3 ring-1 ring-ink-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold">Traffic by hour</span>
                  <span className="flex items-center gap-1 text-ink-500"><span className="h-2 w-2 rounded-sm bg-brand-500" />Delivered</span>
                </div>
                <div className="mt-3 flex min-h-24 flex-1 items-end gap-[3px]" aria-hidden>
                  {HOURS.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-600 to-cyan-400" style={{ height: `${h}%`, opacity: 0.55 + h / 220 }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-3 ring-1 ring-ink-100">
                <div className="text-[11px] font-semibold">Top destinations</div>
                <ul className="mt-2 space-y-1.5">
                  {DESTS.map(([c, p]) => (
                    <li key={c} className="text-[10.5px]">
                      <div className="flex justify-between text-ink-600"><span>{c}</span><span className="font-semibold text-ink-900">{p}%</span></div>
                      <div className="mt-0.5 h-1.5 rounded-full bg-ink-100"><div className="h-1.5 rounded-full bg-brand-500" style={{ width: `${p * 2.6}%` }} /></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-3 rounded-xl p-3 ring-1 ring-ink-100">
              <div className="text-[11px] font-semibold">Live delivery</div>
              <ul className="mt-2 divide-y divide-ink-50">
                {FEED.map(f => (
                  <li key={f.to} className="flex items-center gap-2 py-1.5 text-[10.5px]">
                    <span className={`rounded-full px-2 py-0.5 font-semibold ${feedTone[f.tone]}`}>{f.text}</span>
                    <span className="font-mono text-ink-700">{f.to}</span>
                    <span className="ml-auto truncate text-ink-500">{f.meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-400">Console preview · illustrative data · phone numbers are masked by design</figcaption>
    </figure>
  );
}

/* ───────── Mini cards for the capability grid ───────── */

export function RouteCard() {
  const carriers = [
    { name: 'Carrier A', price: '$0.0062', quality: '96%', state: 'ok' },
    { name: 'Carrier B', price: '$0.0041', quality: '98%', state: 'best' },
    { name: 'Carrier C', price: '$0.0038', quality: 'Offline', state: 'down' },
  ] as const;
  return (
    <div className="rounded-xl bg-ink-950 p-3 text-white ring-1 ring-white/10 sm:p-4" aria-hidden>
      <div className="flex items-center justify-between text-[11px] text-ink-300">
        <span>Destination · United Kingdom</span><span>Price · Quality</span>
      </div>
      <ul className="mt-3 space-y-2">
        {carriers.map(c => (
          <li key={c.name} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${c.state === 'best' ? 'bg-brand-600/30 ring-1 ring-brand-400/60' : 'bg-white/[0.04] ring-1 ring-white/10'} ${c.state === 'down' ? 'opacity-55' : ''}`}>
            <Signal className={`h-3.5 w-3.5 flex-shrink-0 ${c.state === 'down' ? 'text-ink-400' : 'text-cyan-300'}`} />
            <span className="truncate font-medium">{c.name}</span>
            {c.state === 'best' && <span className="hidden rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-200 sm:inline">Selected</span>}
            <span className="ml-auto tabular-nums text-ink-200">{c.price}</span>
            <span className={`w-12 flex-shrink-0 text-right tabular-nums ${c.state === 'down' ? 'text-amber-300' : 'text-ink-200'}`}>{c.quality}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InvoiceCard() {
  const lines = [
    ['SMS to United States', '$6,820.00'],
    ['SMS to United Kingdom', '$2,061.50'],
    ['SMS to India', '$1,104.75'],
  ];
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-ink-100" aria-hidden>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-ink-900">Invoice · October</div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Sent</span>
      </div>
      <ul className="mt-3 space-y-1.5 text-[11px] text-ink-600">
        {lines.map(([l, v]) => <li key={l} className="flex justify-between"><span>{l}</span><span className="tabular-nums text-ink-900">{v}</span></li>)}
        <li className="flex justify-between text-brand-700"><span className="inline-flex items-center gap-1"><RotateCcw className="h-3 w-3" />Refunds · undelivered</span><span className="tabular-nums">−$41.20</span></li>
      </ul>
      <div className="mt-3 flex justify-between border-t border-ink-100 pt-2 text-xs font-bold text-ink-950"><span>Total</span><span className="tabular-nums">$9,945.05</span></div>
    </div>
  );
}

export function ComplianceCard() {
  return (
    <div className="space-y-2 rounded-xl bg-white p-4 ring-1 ring-ink-100" aria-hidden>
      <div className="text-[11px] font-medium text-ink-500">Sender name requested</div>
      <div className="flex flex-wrap items-center gap-1.5">
        {['ACM3 BANK', 'Acme-Bank'].map(v => <code key={v} className="rounded-md bg-rose-50 px-2 py-1 text-[11px] text-rose-700 line-through decoration-rose-400">{v}</code>)}
        <ArrowUpRight className="h-3.5 w-3.5 rotate-45 text-ink-400" />
        <code className="rounded-md bg-brand-600 px-2 py-1 text-[11px] font-semibold text-white">ACME Bank</code>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700"><Check className="h-3.5 w-3.5" />Verified owner · approved for 4 countries</div>
    </div>
  );
}
