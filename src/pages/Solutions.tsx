import { Network, RadioTower, Building2, Landmark, KeyRound, BellRing, Megaphone, CalendarClock, Siren, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, IconBadge, CheckList, FeatureCard, PageHero, CtaBand } from '../components/ui';
import { SITE } from '../site';

interface Segment {
  id: string; icon: LucideIcon; name: string; headline: string; challenge: string; how: string; outcomes: string[]; tags: string[];
}

const SEGMENTS: Segment[] = [
  {
    id: 'aggregators', icon: Network, name: 'SMS aggregators & wholesale hubs',
    headline: 'Grow margin on every route, for every customer',
    challenge: 'Thin margins, dozens of carriers and hundreds of customers — each with its own prices, limits and expectations.',
    how: `Onboard customers over SMPP or API in minutes, price them by country and network, route every message over the cheapest healthy carrier, and let ${SITE.name} invoice them automatically.`,
    outcomes: [
      'Higher margin per message with least-cost, quality-aware routing',
      'Less churn — customers see delivery, prices and refund terms themselves',
      'Fewer billing disputes: every charge and refund settles exactly once',
      'A new customer live in minutes, not days',
    ],
    tags: ['Least-cost routing', 'Rate cards', 'Refund rules', 'Customer portal', 'Bulk campaigns', 'Invoicing'],
  },
  {
    id: 'operators', icon: RadioTower, name: 'Mobile operators & MVNOs',
    headline: 'Turn enterprise traffic into protected, billable revenue',
    challenge: 'Business-to-person messaging is a growing revenue line — and a growing source of spam, spoofed sender names and grey routes.',
    how: 'Put a commercial edge in front of your messaging center: authenticate, price, filter and account for every enterprise message before it reaches your network.',
    outcomes: [
      'Monetize business messaging with per-customer pricing and invoicing',
      'Protect subscribers from spoofed brands and unwanted messages',
      'Route ported numbers correctly from your national portability data',
      'Deploy inside your own core network — even fully isolated',
    ],
    tags: ['Sender-ID registry', 'Number portability', 'Compliance engine', 'On-premise', 'SMPP 3.3 – 5.0'],
  },
  {
    id: 'enterprise', icon: Building2, name: 'Enterprises & SaaS platforms',
    headline: 'Own the channel your customers trust most',
    challenge: 'Passcodes, alerts and notifications are mission-critical — yet hosted APIs charge a markup on every one and hold your data.',
    how: 'Run messaging on your own infrastructure with your own carrier agreements. Developers use a modern API; finance sees exactly what each team or product costs.',
    outcomes: [
      'Stop paying a platform fee on every message as volume grows',
      'Keep customer phone numbers and message data in-house',
      'Automatic failover keeps passcodes flowing through carrier outages',
      'Charge usage back to business units with rate cards and invoices',
    ],
    tags: ['REST API', 'Automatic failover', 'Analytics', 'Webhooks', 'Self-hosted'],
  },
  {
    id: 'regulated', icon: Landmark, name: 'Banks, fintech, healthcare & public sector',
    headline: 'Compliance you can prove, not just promise',
    challenge: 'Regulators expect audit trails, consent records, data residency and protection against impersonation of your brand.',
    how: 'Keep every message in your own environment, enforce consent and sender rules automatically, and show auditors a complete record of who did what, and when.',
    outcomes: [
      'Message data stays in your region, on your infrastructure',
      'Your brand protected from look-alike sender names',
      'Consent, quiet hours and content rules applied by region',
      'Two-factor sign-in, roles and a full audit trail for every change',
    ],
    tags: ['Data residency', 'Audit trail', 'Consent management', 'Two-factor sign-in', 'Flash alerts'],
  },
];

const USE_CASES = [
  { icon: KeyRound, title: 'One-time passcodes', body: 'Fast, reliable verification codes, with automatic failover between carriers when seconds matter.' },
  { icon: BellRing, title: 'Transactional alerts', body: 'Payment confirmations, delivery updates and account notices your customers rely on.' },
  { icon: Megaphone, title: 'Marketing campaigns', body: 'Up to 100,000 messages per campaign — with consent and quiet hours enforced automatically.' },
  { icon: CalendarClock, title: 'Reminders', body: 'Appointments, renewals and payments, scheduled to arrive at exactly the right moment.' },
  { icon: Siren, title: 'Emergency alerts', body: 'Flash messages that appear on screen instantly, for safety and service-critical notices.' },
  { icon: MessageSquare, title: 'Two-way messaging', body: 'Replies and inbound messages forwarded straight to your applications in real time.' },
];

export default function Solutions() {
  return (
    <Page>
      <PageHero
        eyebrow="Solutions"
        title={<>Built for the businesses that <span className="text-gradient">keep the world texting.</span></>}
        lead={`Whether you resell messaging, carry it or depend on it, ${SITE.name} gives you carrier-grade infrastructure you own — tuned to how your business makes money.`}
        actions={
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-ink-100 ring-1 ring-white/10 hover:bg-white/10">
                <s.icon className="h-4 w-4 text-cyan-300" aria-hidden />{s.name}
              </a>
            ))}
          </div>
        }
      />

      {SEGMENTS.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 ? 'muted' : 'white'}>
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <IconBadge icon={s.icon} size="lg" />
                <span className="text-sm font-semibold text-brand-600">{s.name}</span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{s.headline}</h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">The challenge</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-700">{s.challenge}</p>
                </div>
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">How {SITE.name} helps</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-700">{s.how}</p>
                </div>
              </div>
            </div>
            <div className={`self-start rounded-3xl p-8 ring-1 ${i % 2 ? 'bg-white ring-ink-100' : 'bg-ink-50 ring-ink-100'}`}>
              <h3 className="text-lg font-bold text-ink-950">What you get</h3>
              <CheckList className="mt-5" items={s.outcomes} />
              <div className="mt-8 flex flex-wrap gap-2">
                {s.tags.map(t => <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{t}</span>)}
              </div>
              <ButtonLink to="/contact" arrow className="mt-8">Talk to a specialist</ButtonLink>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="dark" className="overflow-hidden">
        <Container className="relative">
          <SectionHead dark eyebrow="Use cases" title="One platform, every kind of message"
            lead="From a six-digit passcode to a hundred-thousand-message campaign, the same reliability, billing and compliance apply." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map(u => <FeatureCard key={u.title} dark icon={u.icon} title={u.title}>{u.body}</FeatureCard>)}
          </div>
        </Container>
      </Section>

      <CtaBand title="Let’s map SMPP Forge to your business" />
    </Page>
  );
}
