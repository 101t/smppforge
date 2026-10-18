import {
  CodeXml, Network, MonitorSmartphone, Webhook, Zap, Contact, Link2, Music, Activity, Languages, ChartColumn, Truck,
  ChartPie, MapPinned, Clock3, FileSpreadsheet, SearchCheck, History, Cloud, Building, Server, CircleCheck, Clock,
  GitBranch, Send, Receipt, ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Page } from '../components/Layout';
import {
  Container, Section, SectionHead, ButtonLink, TextLink, IconBadge, CheckList, StatTile, PageHero, DarkBackdrop, FaqSection, CtaBand,
} from '../components/ui';
import { ConsoleMock, RouteCard, InvoiceCard, ComplianceCard } from '../components/Visuals';
import { platformFaq, roadmap, proofPoints } from '../content';
import { SITE } from '../site';

const ANCHORS = [
  ['connect', 'Connect'], ['route', 'Route'], ['deliver', 'Deliver'], ['bill', 'Bill'],
  ['protect', 'Protect'], ['insights', 'Insights'], ['operate', 'Operate'], ['deploy', 'Deploy'],
] as const;

const MODULES: { id: string; icon: LucideIcon; name: string; sub: string }[] = [
  { id: 'connect', icon: Network, name: 'Connect', sub: 'SMPP, API and portal' },
  { id: 'route', icon: GitBranch, name: 'Route', sub: 'Least-cost and failover' },
  { id: 'deliver', icon: Send, name: 'Deliver', sub: 'Stored, never sent twice' },
  { id: 'bill', icon: Receipt, name: 'Bill', sub: 'Rates, invoices, refunds' },
  { id: 'protect', icon: ShieldCheck, name: 'Protect', sub: 'Sender IDs and consent' },
  { id: 'insights', icon: ChartColumn, name: 'Insights', sub: 'Traffic, delivery, margin' },
  { id: 'operate', icon: MonitorSmartphone, name: 'Operate', sub: 'Console and roles' },
  { id: 'deploy', icon: Cloud, name: 'Deploy', sub: 'Cloud or on-premise' },
];

function ModuleMap() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MODULES.map(({ id, icon: Icon, name, sub }) => (
        <a key={id} href={`#${id}`} className="group rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/[0.08] hover:ring-cyan-400/40">
          <Icon className="h-5 w-5 text-cyan-300" aria-hidden />
          <div className="mt-3 font-semibold text-white">{name}</div>
          <div className="text-xs text-ink-300">{sub}</div>
        </a>
      ))}
    </div>
  );
}

function Block({ id, tone = 'white', eyebrow, title, lead, points, aside, reverse = false, children }: {
  id: string; tone?: 'white' | 'muted'; eyebrow: string; title: string; lead: string; points: React.ReactNode[];
  aside: React.ReactNode; reverse?: boolean; children?: React.ReactNode;
}) {
  return (
    <Section id={id} tone={tone}>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className={`min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
          <SectionHead align="left" eyebrow={eyebrow} title={title} lead={lead} />
          <CheckList className="mt-8" items={points} />
          {children}
        </div>
        <div className={`min-w-0 ${reverse ? 'lg:order-1' : ''}`}>{aside}</div>
      </Container>
    </Section>
  );
}

function Tiles({ items }: { items: { icon: LucideIcon; title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(({ icon, title, body }) => (
        <div key={title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
          <IconBadge icon={icon} />
          <div className="mt-4 font-semibold text-ink-950">{title}</div>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">{body}</p>
        </div>
      ))}
    </div>
  );
}

function Panel({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-6 sm:p-10">
      <DarkBackdrop />
      <div className="relative">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{label}</div>
        {children}
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <Page>
      <PageHero
        eyebrow="Platform"
        title={<>One platform to connect, route, bill and <span className="text-gradient">protect every message.</span></>}
        lead={`${SITE.name} replaces the patchwork of gateways, billing scripts, spreadsheets and compliance checklists with a single product your whole team can run.`}
        actions={<><ButtonLink to="/contact" size="lg" arrow>Request a demo</ButtonLink><ButtonLink to="/pricing" size="lg" variant="ghost-dark">See pricing</ButtonLink></>}
        aside={<ModuleMap />}
      />

      <nav aria-label="On this page" className="sticky top-16 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-lg">
        <Container className="flex gap-1 overflow-x-auto py-3 text-sm font-medium [scrollbar-width:none]">
          {ANCHORS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-ink-600 hover:bg-ink-50 hover:text-ink-950">{label}</a>
          ))}
        </Container>
      </nav>

      <Block id="connect" eyebrow="Connect" title="Let customers connect any way they like"
        lead="Aggregators connect over SMPP. Developers call a modern API. Business users click Send in a portal. One platform serves all three — with the same rules for each."
        points={[
          'SMPP versions 3.3, 3.4 and 5.0, with encrypted connections available',
          'A modern REST API with interactive documentation',
          'Jasmin-compatible HTTP API, so existing integrations keep working',
          'A web portal for sending, history and account self-service',
          'Per-customer throughput limits, IP allowlists and message-type permissions',
        ]}
        aside={<Tiles items={[
          { icon: CodeXml, title: 'Developers', body: 'A clean REST API with interactive docs and instant quotes for any message.' },
          { icon: Network, title: 'Aggregators & resellers', body: 'Standard SMPP connections with their own credentials and limits.' },
          { icon: MonitorSmartphone, title: 'Business users', body: 'Send, schedule and follow messages from the web portal.' },
          { icon: Webhook, title: 'Your systems', body: 'Signed real-time notifications for every event that matters.' },
        ]} />}
      />

      <Block id="route" tone="muted" reverse eyebrow="Route" title="Send every message the smartest way"
        lead="Routing is where SMS businesses make or lose money. SMPP Forge picks the best carrier for every message — on price, on quality and on the subscriber’s current network."
        points={[
          'Least-cost routing by country and network, weighted by delivery quality and time of day',
          'Automatic failover — a struggling carrier is taken out of rotation and tested before traffic returns',
          'Weighted load balancing across carriers, optionally sticky per customer',
          'Number portability from a local ported-number database, with country-specific lookup providers as backup',
          'Lookups run on a strict time budget, so a slow provider never holds a message',
        ]}
        aside={<Panel label="Live route selection"><RouteCard /><p className="mt-4 text-sm text-ink-300">The cheapest carrier is offline, so traffic goes to the next-best route automatically — and comes back when it recovers.</p></Panel>}
      />

      <Block id="deliver" eyebrow="Deliver" title="Delivery you can promise your customers"
        lead="Messages are accepted instantly, stored safely and delivered at each carrier’s pace. Outages, throttling and restarts are handled for you — invisibly."
        points={[
          'Every message is stored the moment it is accepted — before your customer even gets a reply',
          'Busy or unavailable carriers are retried patiently, or skipped for the next route',
          'Never sent twice, even when a server stops mid-delivery',
          'Bulk campaigns of up to 100,000 messages — paced, tracked, cancellable and resumed after a restart',
          'Scheduled delivery and validity periods; expired messages reported and refunded by your rules',
          'Delivery reports matched reliably, even when carriers format message IDs differently',
        ]}
        aside={
          <div>
            <h3 className="mb-4 text-lg font-bold text-ink-950">Every message type your customers ask for</h3>
            <Tiles items={[
              { icon: Zap, title: 'Flash alerts', body: 'Appear on screen instantly — ideal for urgent and safety alerts.' },
              { icon: Languages, title: 'Any language', body: 'Long messages in every alphabet and emoji, split and rejoined seamlessly.' },
              { icon: Contact, title: 'Contact cards', body: 'Send a business card the phone can save in one tap.' },
              { icon: Link2, title: 'Push links', body: 'Deliver a web link that opens straight from the message.' },
              { icon: Activity, title: 'Reachability checks', body: 'Silent messages that confirm a phone is reachable, never shown.' },
              { icon: Music, title: 'Legacy formats', body: 'Ringtones and binary payloads for specialist devices.' },
            ]} />
          </div>
        }
      />

      <Block id="bill" tone="muted" reverse eyebrow="Bill" title="Billing that runs itself"
        lead="Price customers your way, charge every message exactly and invoice automatically. Finance gets numbers it can trust; customers get transparency they appreciate."
        points={[
          'Prepaid balances and postpaid credit limits, per customer',
          'Rate cards by country and network, with customer-specific prices',
          'Credit is reserved before sending, so simultaneous traffic can never overspend a balance',
          'Each message billed by the exact number of parts it is sent in — in any language',
          'Refund rules for rejected, undelivered or expired messages, with an optional hold window',
          'Invoices itemized by country and emailed to customers; low-balance alerts and top-up receipts',
        ]}
        aside={<Panel label="Automatic invoicing"><InvoiceCard /><p className="mt-4 text-sm text-ink-300">One line per destination country, refunds applied exactly once, ready to send.</p></Panel>}
      />

      <Block id="protect" eyebrow="Protect" title="Compliance and security on every message"
        lead="The same checks run on every path — API, SMPP, portal and bulk — so there is no side door for spam, spoofing or unconsented marketing."
        points={[
          'Sender-name registry that locks each name to its verified owner and approved countries',
          'Look-alike detection, so near-copies of a registered brand are caught',
          'Consent and opt-in rules, quiet hours and content rules by region',
          'Number blocklists and numeric-only destinations enforced before a carrier sees the message',
          'Two-factor sign-in, roles, IP allowlists and a complete audit trail',
        ]}
        aside={<div className="space-y-4"><ComplianceCard /><div className="rounded-2xl bg-ink-50 p-6 ring-1 ring-ink-100"><p className="text-sm text-ink-600">Regulators from Spain to Singapore now require registered sender names. See how each market works and how {SITE.name} enforces it.</p><div className="mt-4"><TextLink to="/security">Security & compliance</TextLink></div></div></div>}
      />

      <Section id="insights" tone="muted">
        <Container>
          <SectionHead eyebrow="Insights" title="Know exactly how your business is performing"
            lead="Live dashboards and scheduled reports answer the questions operations, finance and sales ask every day." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ChartColumn, title: 'Traffic & throughput', body: 'Volumes by hour, day and customer, as it happens.' },
              { icon: Truck, title: 'Delivery by carrier', body: 'Delivery rates per route, so you know who performs.' },
              { icon: ChartPie, title: 'Revenue & margin', body: 'What you charged, what carriers cost, what you kept.' },
              { icon: MapPinned, title: 'Destinations', body: 'Where your traffic goes, country by country.' },
              { icon: Clock3, title: 'Peak hours', body: 'Heatmaps of when your customers send the most.' },
              { icon: FileSpreadsheet, title: 'Scheduled reports', body: 'CSV and PDF reports for finance and customers.' },
              { icon: SearchCheck, title: 'Message search', body: 'Find any message by your ID or the carrier’s.' },
              { icon: History, title: 'Audit trail', body: 'Every administrative change, who made it and when.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-6 ring-1 ring-ink-100">
                <IconBadge icon={icon} />
                <div className="mt-4 font-semibold text-ink-950">{title}</div>
                <p className="mt-1 text-sm text-ink-600">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="operate" tone="dark" className="overflow-hidden">
        <DarkBackdrop />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHead dark align="left" eyebrow="Operate" title="Built for the team that runs it"
              lead="A console with more than 30 screens covers customers, carriers, routes, prices, compliance and reports — no command line required." />
            <CheckList dark className="mt-8" items={[
              'Administrator and customer roles, with two-factor sign-in',
              'Suspend an account or a whole customer group in one click',
              'A scriptable command line and a full API for automation',
              'Health checks and metrics that plug into your monitoring',
              'A built-in carrier simulator to test changes safely',
            ]} />
          </div>
          <ConsoleMock />
        </Container>
      </Section>

      <Section id="deploy">
        <Container>
          <SectionHead eyebrow="Deploy" title="Runs where you need it — and nowhere else"
            lead="SMPP Forge ships as a standard container image. Your messages, numbers and customer records stay inside the environment you choose." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: Cloud, title: 'Amazon Web Services', body: 'Run in your own AWS account and region. AWS Marketplace listing coming soon.' },
              { icon: Building, title: 'Private cloud', body: 'Any Linux host or container platform in the cloud provider you already trust.' },
              { icon: Server, title: 'On-premise', body: 'Inside your own data center — including isolated networks within an operator core.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100">
                <IconBadge icon={icon} size="lg" />
                <h3 className="mt-6 text-xl font-bold text-ink-950">{title}</h3>
                <p className="mt-2 text-ink-600">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(p => <StatTile key={p.label} value={p.value} label={p.label} sub={p.sub} />)}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHead eyebrow="Roadmap" title="A transparent roadmap"
            lead="We tell you what ships today and what is coming next, so you can plan your rollout with confidence." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-700"><CircleCheck className="h-5 w-5" aria-hidden />Available today</h3>
              <ul className="mt-5 space-y-3">{roadmap.available.map(r => <li key={r} className="flex gap-3 text-ink-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />{r}</li>)}</ul>
            </div>
            <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-amber-700"><Clock className="h-5 w-5" aria-hidden />Coming next</h3>
              <ul className="mt-5 space-y-3">{roadmap.next.map(r => <li key={r} className="flex gap-3 text-ink-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />{r}</li>)}</ul>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection items={platformFaq} title="Platform questions" />
      <CtaBand title="See the platform on your traffic" />
    </Page>
  );
}
