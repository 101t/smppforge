import { Link } from 'react-router-dom';
import {
  ArrowRight, CircleCheck, RadioTower, Network, Landmark, HeartPulse, Building2, Siren, Coins, PackageCheck, ShieldCheck,
  GitBranch, Repeat, Smartphone, Receipt, RotateCcw, BellRing, Megaphone, MessageSquareText, ChartColumn, Users, Webhook,
  Lock, Scale, Cloud, Server, Building, ArrowLeftRight,
} from 'lucide-react';
import { Page } from '../components/Layout';
import {
  Container, Section, SectionHead, ButtonLink, TextLink, FeatureCard, IconBadge, CheckList, MarkIcon, StatTile,
  DarkBackdrop, FaqSection, CtaBand,
} from '../components/ui';
import { SignalFlow, ConsoleMock, RouteCard, ComplianceCard } from '../components/Visuals';
import { SavingsCalculator } from '../components/SavingsCalculator';
import { homeFaq, threeWay, proofPoints } from '../content';
import { SITE } from '../site';

const AUDIENCES = [
  { icon: RadioTower, label: 'Mobile operators & MVNOs' },
  { icon: Network, label: 'SMS aggregators' },
  { icon: Landmark, label: 'Banks & fintech' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Building2, label: 'Enterprise & SaaS' },
  { icon: Siren, label: 'Public sector' },
];

const STEPS = [
  { n: '01', title: 'Connect', body: 'Customers and applications send over SMPP, a modern REST API or the web portal — each account with its own credentials, prices and limits.' },
  { n: '02', title: 'Check, bill & route', body: 'Every message is verified, checked against local rules, priced and charged, then sent over the best carrier for that number.' },
  { n: '03', title: 'Deliver & report', body: 'Messages reach phones worldwide. Delivery reports flow back in real time — to your customers, your systems and your dashboards.' },
];

const CAPABILITIES = [
  { icon: GitBranch, title: 'Least-cost routing', body: 'Send every message over the cheapest carrier that still delivers well — by country, by network, by time of day.' },
  { icon: Repeat, title: 'Automatic failover', body: 'When a carrier struggles, traffic moves to the next route on its own and returns once the carrier recovers.' },
  { icon: Smartphone, title: 'Number portability', body: 'Reach subscribers who switched networks, using a local ported-number database and leading lookup providers.' },
  { icon: Receipt, title: 'Billing & invoicing', body: 'Prepaid and postpaid accounts, rate cards by country and network, and invoices itemized by destination.' },
  { icon: RotateCcw, title: 'Refund rules', body: 'Decide per country, network and customer what happens to the charge when a message is rejected, undelivered or expires.' },
  { icon: BellRing, title: 'Low-balance alerts', body: 'Customers get an email before they run out of credit — and a receipt for every top-up — so traffic never stops by surprise.' },
  { icon: Megaphone, title: 'Bulk campaigns', body: 'Up to 100,000 messages per campaign, paced to each account, with live progress, cancel at any time and resume after a restart.' },
  { icon: MessageSquareText, title: 'Rich message types', body: 'Flash alerts that appear on screen instantly, contact cards, web links and long messages in any language or emoji.' },
  { icon: ChartColumn, title: 'Analytics & reports', body: 'Traffic, delivery by carrier, revenue and margin, destinations and peak hours — plus scheduled reports for finance.' },
  { icon: Users, title: 'Customer self-service', body: 'Every customer gets a portal to send, follow delivery and see their balance, prices, invoices and refund terms.' },
  { icon: Webhook, title: 'Live event feeds', body: 'Signed notifications to your systems the moment a message is sent, delivered, fails, is refunded or a reply arrives.' },
  { icon: Lock, title: 'Enterprise security', body: 'Two-factor sign-in, role-based access, IP allowlists and a complete audit trail of every change.' },
];

const PROMISES = [
  { icon: PackageCheck, title: 'Accepted means safely stored', body: 'Each message is stored the moment it is accepted, so a carrier outage or a server restart never loses it.' },
  { icon: Repeat, title: 'Rerouted, not refused', body: 'If a carrier is down or busy, messages retry or move to the next route — your customers never see the error.' },
  { icon: ShieldCheck, title: 'Never sent twice', body: 'Even if a server stops mid-delivery, no message goes out twice. Your customers’ end users get one text, not two.' },
  { icon: Scale, title: 'Every refund, exactly once', body: 'Charges and refunds settle exactly once, so customer balances, invoices and your ledger always agree.' },
];

function JourneyCard() {
  const steps = [
    { t: 'Accepted and stored', time: '09:41:02.110', tone: 'bg-brand-500' },
    { t: 'Carrier A busy — rerouted', time: '09:41:02.180', tone: 'bg-amber-500' },
    { t: 'Delivered via Carrier B', time: '09:41:03.940', tone: 'bg-emerald-500' },
    { t: 'Receipt sent to your customer', time: '09:41:03.960', tone: 'bg-emerald-500' },
  ];
  return (
    <ol className="space-y-2.5 rounded-xl bg-white p-4 ring-1 ring-ink-100" aria-hidden>
      {steps.map(s => (
        <li key={s.t} className="flex items-center gap-3 text-xs">
          <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${s.tone}`} />
          <span className="font-medium text-ink-800">{s.t}</span>
          <span className="ml-auto font-mono text-[10.5px] text-ink-400">{s.time}</span>
        </li>
      ))}
    </ol>
  );
}

const PILLARS = [
  {
    icon: Coins, title: 'Earn more on every message', to: '/platform#route', cta: 'How smart routing works', visual: <RouteCard />,
    body: 'Route each message over the cheapest healthy carrier, price customers by country and network, and keep the margin a hosted platform would take.',
  },
  {
    icon: PackageCheck, title: 'Never lose a message', to: '/platform#deliver', cta: 'How delivery works', visual: <JourneyCard />,
    body: 'Messages are stored the moment they arrive, delivered at each carrier’s pace, rerouted when a carrier fails — and never sent twice.',
  },
  {
    icon: ShieldCheck, title: 'Comply in every market', to: '/security', cta: 'Explore compliance', visual: <ComplianceCard />,
    body: 'A sender-name registry with look-alike protection, consent and quiet hours by region, content rules and blocklists — on every message.',
  },
];

export default function Home() {
  return (
    <Page>
      {/* ═════════ HERO ═════════ */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 text-white sm:pt-36">
        <DarkBackdrop strong />
        <Container className="relative grid items-center gap-12 pb-20 lg:grid-cols-[1fr_1.05fr] lg:pb-24">
          <div className="animate-fade-up">
            <Link to="/platform#deliver" className="group inline-flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3 text-xs font-medium text-ink-200 ring-1 ring-white/10 transition hover:ring-white/25">
              <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 font-semibold text-cyan-300">New</span>
              <span className="sm:hidden">Zero-duplicate delivery</span>
              <span className="hidden sm:inline">Store-and-forward delivery with zero duplicate sends</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-tight sm:text-6xl xl:text-[4.1rem]">
              <span className="sm:whitespace-nowrap">The SMS platform</span>{' '}
              <span className="text-gradient">you actually own.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl">
              {SITE.name} is the all-in-one SMS gateway for operators, aggregators and enterprises. Connect customers, route to
              carriers worldwide, bill every message and stay compliant in every market — on your own cloud or servers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/contact" size="lg" arrow>Request a demo</ButtonLink>
              <ButtonLink href="#savings" size="lg" variant="ghost-dark">Calculate your savings</ButtonLink>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-ink-300 sm:grid-cols-3">
              {['No per-message platform fees', 'Your data stays on your servers', 'Live in weeks, not quarters'].map(t => (
                <li key={t} className="flex items-center gap-2"><CircleCheck className="h-4 w-4 flex-shrink-0 text-cyan-400" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block">
            <SignalFlow />
          </div>
        </Container>
        <div className="relative border-t border-white/10 bg-ink-950/60">
          <Container className="flex flex-col items-center gap-5 py-8 lg:flex-row lg:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Built for</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-ink-200">
              {AUDIENCES.map(({ icon: I, label }) => (
                <li key={label} className="flex items-center gap-2"><I className="h-4 w-4 text-ink-400" aria-hidden />{label}</li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ═════════ PILLARS ═════════ */}
      <Section>
        <Container>
          <SectionHead
            eyebrow={`Why ${SITE.name}`}
            title={<>Three things every messaging business needs. <span className="text-gradient-light">One platform.</span></>}
            lead="Hosted APIs take a cut of every message. Open-source gateways leave you building billing, consoles and compliance yourself. SMPP Forge gives you the whole business, ready to run."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PILLARS.map(p => (
              <div key={p.title} className="flex min-w-0 flex-col rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-100 sm:p-8">
                <IconBadge icon={p.icon} size="lg" />
                <h3 className="mt-6 text-2xl font-bold text-ink-950">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{p.body}</p>
                <div className="mt-7 flex-1">{p.visual}</div>
                <div className="mt-7"><TextLink to={p.to}>{p.cta}</TextLink></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═════════ HOW IT WORKS ═════════ */}
      <Section tone="muted" className="overflow-hidden">
        <div aria-hidden className="bg-grid-light mask-fade-b absolute inset-0" />
        <Container className="relative">
          <SectionHead eyebrow="How it works" title="From your customers to phones worldwide — in three steps"
            lead={`${SITE.name} sits between the people who send messages and the carriers who deliver them, and runs the business in between.`} />
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink-100">
                <div className="font-display text-5xl font-bold text-gradient-light">{s.n}</div>
                <h3 className="mt-5 text-xl font-bold text-ink-950">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{s.body}</p>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg md:flex">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ═════════ CAPABILITIES ═════════ */}
      <Section>
        <Container>
          <SectionHead eyebrow="Platform" title="Everything you need to run messaging as a business"
            lead="Routing, billing, delivery, compliance and reporting in one product — no glue code between five different tools." />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(c => <FeatureCard key={c.title} icon={c.icon} title={c.title}>{c.body}</FeatureCard>)}
          </div>
          <div className="mt-12 text-center"><ButtonLink to="/platform" variant="secondary" arrow>Explore the platform</ButtonLink></div>
        </Container>
      </Section>

      {/* ═════════ CONSOLE ═════════ */}
      <Section tone="dark" className="overflow-hidden">
        <DarkBackdrop />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHead dark align="left" eyebrow="Operator console" title="Run your entire operation from one screen"
              lead="Customers, carriers, prices and live traffic — in a console your operations, finance and support teams can all use from day one." />
            <CheckList dark className="mt-8" items={[
              'Onboard a customer, set their prices and limits in minutes',
              'Watch traffic, delivery and revenue as it happens',
              'Role-based access with two-factor sign-in',
              'A self-service portal for every customer',
            ]} />
            <div className="mt-8"><TextLink dark to="/platform#operate">Tour the console</TextLink></div>
          </div>
          <ConsoleMock />
        </Container>
      </Section>

      {/* ═════════ SAVINGS ═════════ */}
      <Section id="savings" tone="muted">
        <Container>
          <SectionHead eyebrow="Savings calculator" title="How much is per-message markup costing you?"
            lead="Hosted messaging APIs add a platform fee to every message on top of what carriers charge. Move the sliders to see what that adds up to at your volume." />
          <div className="mt-14"><SavingsCalculator /></div>
        </Container>
      </Section>

      {/* ═════════ RELIABILITY ═════════ */}
      <Section>
        <Container>
          <SectionHead eyebrow="Reliability" title="Engineered so nothing slips through the cracks"
            lead="Every message is money and trust. SMPP Forge is built to account for each one — through carrier outages, traffic spikes and restarts." />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map(p => <FeatureCard key={p.title} icon={p.icon} title={p.title}>{p.body}</FeatureCard>)}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(p => <StatTile key={p.label} value={p.value} label={p.label} sub={p.sub} />)}
          </div>
        </Container>
      </Section>

      {/* ═════════ COMPARE ═════════ */}
      <Section tone="muted">
        <Container>
          <SectionHead eyebrow="Compare" title="The upside of hosted APIs and open source — without the trade-offs"
            lead="Hosted APIs are easy but expensive and rented. Open-source gateways are free but leave the business to you. SMPP Forge gives you both halves." />
          <div className="mt-14 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
            <table className="w-full min-w-[680px] text-left text-sm">
              <caption className="sr-only">Hosted SMS APIs, open-source gateways and {SITE.name} compared</caption>
              <thead>
                <tr className="border-b border-ink-100">
                  <th scope="col" className="p-5 font-semibold text-ink-500">What matters to your business</th>
                  <th scope="col" className="w-36 p-5 text-center font-semibold text-ink-700">Hosted SMS APIs</th>
                  <th scope="col" className="w-36 p-5 text-center font-semibold text-ink-700">Open-source gateways</th>
                  <th scope="col" className="w-36 bg-brand-600 p-5 text-center font-semibold text-white">{SITE.name}</th>
                </tr>
              </thead>
              <tbody>
                {threeWay.map(r => (
                  <tr key={r.label} className="border-b border-ink-50 last:border-0">
                    <th scope="row" className="p-5 font-medium text-ink-800">{r.label}</th>
                    <td className="p-5 text-center"><MarkIcon ok={r.cpaas} /></td>
                    <td className="p-5 text-center"><MarkIcon ok={r.oss} /></td>
                    <td className="bg-brand-50/60 p-5 text-center"><MarkIcon ok={r.forge} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center"><TextLink to="/compare">See the detailed comparison with Jasmin, Kannel and others</TextLink></div>
        </Container>
      </Section>

      {/* ═════════ MIGRATE + DEPLOY ═════════ */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-white sm:p-10">
            <DarkBackdrop />
            <div className="relative">
              <IconBadge icon={ArrowLeftRight} dark size="lg" />
              <h2 className="mt-6 text-3xl font-bold tracking-tight">Running Jasmin? Switch without rewriting a line.</h2>
              <p className="mt-4 text-ink-200">{SITE.name} speaks the APIs and commands your customers and team already use. Run both side by side and move traffic route by route.</p>
              <CheckList dark className="mt-6" items={['Jasmin-compatible HTTP API and CLI', 'Same users, groups, routes and filters', 'Typical cut-over in about five weeks']} />
              <ButtonLink to="/migrate-from-jasmin" variant="light" arrow className="mt-8">Plan your migration</ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100 sm:p-10">
            <IconBadge icon={Cloud} size="lg" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink-950">Deploy wherever your business needs it</h2>
            <p className="mt-4 text-ink-600">Self-hosted means message content, customer data and routing decisions never leave the environment you choose.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Cloud, t: 'Amazon Web Services', d: 'Your account, your region' },
                { icon: Building, t: 'Private cloud', d: 'Any Linux host or cluster' },
                { icon: Server, t: 'On-premise', d: 'Including isolated networks' },
              ].map(({ icon: I, t, d }) => (
                <li key={t} className="rounded-2xl bg-white p-4 ring-1 ring-ink-100">
                  <I className="h-5 w-5 text-brand-600" aria-hidden />
                  <div className="mt-3 text-sm font-semibold text-ink-900">{t}</div>
                  <div className="mt-0.5 text-xs text-ink-500">{d}</div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-500">AWS Marketplace listing coming soon.</p>
            <div className="mt-6"><TextLink to="/platform#deploy">Deployment options</TextLink></div>
          </div>
        </Container>
      </Section>

      <FaqSection items={homeFaq} tone="muted" />
      <CtaBand />
    </Page>
  );
}
