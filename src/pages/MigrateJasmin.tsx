import { CodeXml, SquareTerminal, GitBranch, Network, ArrowRight, CircleCheck } from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, FeatureCard, CheckList, PageHero, DarkBackdrop, FaqSection, CtaBand, TextLink } from '../components/ui';
import { migrateFaq } from '../content';
import { SITE } from '../site';

const SAME = [
  { icon: CodeXml, title: 'Your customers’ integrations', body: 'The Jasmin HTTP endpoints for sending, balance and rate queries keep working, unchanged.' },
  { icon: SquareTerminal, title: 'Your team’s runbooks', body: 'Familiar command-line operations for users, groups, connectors, routes, filters and interceptors.' },
  { icon: GitBranch, title: 'Your configuration model', body: 'Users and groups, outbound and inbound routes, filters and interceptors map one to one.' },
  { icon: Network, title: 'Your connections', body: 'Standard SMPP everywhere: customers re-point their connections and carriers see an ordinary client.' },
];

const GAINS = [
  'A web console with 30+ screens, for your team and your customers',
  'Customer billing: rate cards, prepaid and postpaid accounts, invoices',
  'Refund rules for rejected, undelivered and expired messages',
  'A sender-ID registry and regional compliance engine',
  'Number-portability routing with a local ported-number database',
  'Store-and-forward delivery that never sends a message twice',
  'Two-factor sign-in and a complete audit trail',
  'SMPP 3.3 and 5.0 alongside 3.4, and a modern REST API',
  'Durable bulk campaigns of up to 100,000 messages',
  'Vendor support with response-time commitments',
];

const PLAN = [
  { when: 'Week 1', what: 'Evaluate', detail: 'Install, import users and routes, and test everything against the built-in carrier simulator.' },
  { when: 'Weeks 2–4', what: 'Run in parallel', detail: 'Shift a share of live traffic and compare delivery, speed and billing side by side.' },
  { when: 'Week 5', what: 'Cut over', detail: 'Move the remaining connections and routes, with monitoring in place.' },
  { when: 'Ongoing', what: 'Optimize', detail: 'Tune least-cost and failover routing against real delivery data.' },
];

const CHECKS = [
  ['HTTP send, balance and rate API', 'Unchanged'],
  ['Command-line operations', 'Unchanged'],
  ['Users, groups, routes and filters', 'Imported'],
  ['SMPP customer connections', 'Re-point only'],
  ['Billing, console and compliance', 'Added'],
] as const;

function CompatCard() {
  return (
    <div className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
        <span className="rounded-lg bg-white/5 px-3 py-1.5 text-ink-200 ring-1 ring-white/10">Jasmin today</span>
        <ArrowRight className="h-5 w-5 text-cyan-300" aria-hidden />
        <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-white">{SITE.name}</span>
      </div>
      <ul className="mt-6 divide-y divide-white/10">
        {CHECKS.map(([what, status]) => (
          <li key={what} className="flex items-center gap-3 py-3.5 text-sm">
            <CircleCheck className="h-5 w-5 flex-shrink-0 text-cyan-300" aria-hidden />
            <span className="text-ink-100">{what}</span>
            <span className={`ml-auto whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${status === 'Added' ? 'bg-amber-400/15 text-amber-300' : 'bg-emerald-400/10 text-emerald-300'}`}>{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MigrateJasmin() {
  return (
    <Page>
      <PageHero
        eyebrow="Jasmin migration"
        title={<>Outgrown Jasmin? <span className="text-gradient">Switch without rewriting a thing.</span></>}
        lead={`${SITE.name} speaks the same HTTP API and command-line operations as Jasmin and uses the same configuration model — then adds the billing, compliance, console and vendor support a growing business needs.`}
        actions={<><ButtonLink to="/contact?interest=Jasmin%20migration" size="lg" arrow>Plan your migration</ButtonLink><ButtonLink to="/compare#open-source" size="lg" variant="ghost-dark">Compare with Jasmin</ButtonLink></>}
        aside={<CompatCard />}
      />

      <Section>
        <Container>
          <SectionHead eyebrow="What stays the same" title="Everything your customers and team rely on today"
            lead="Compatibility is a product feature, not a migration script. Nothing your customers built needs to change." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SAME.map(s => <FeatureCard key={s.title} icon={s.icon} title={s.title}>{s.body}</FeatureCard>)}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHead align="left" eyebrow="What you gain" title="Everything Jasmin leaves you to build yourself"
              lead="Jasmin is a capable open-source engine. Running a messaging business on it means building the console, billing, compliance and support around it. SMPP Forge ships them ready to use." />
            <div className="mt-8"><TextLink to="/compare#open-source">See the full capability comparison</TextLink></div>
          </div>
          <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-100">
            <CheckList items={GAINS} />
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="overflow-hidden">
        <DarkBackdrop />
        <Container className="relative">
          <SectionHead dark eyebrow="The plan" title="A typical cut-over takes about five weeks"
            lead="Run both gateways side by side and move traffic route by route. There is nothing to roll back, because nothing is switched off until you are ready." />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PLAN.map((p, i) => (
              <li key={p.what} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{p.when}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{p.what}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center">
          <SectionHead eyebrow="Other gateways" title="Coming from Kannel or something else?"
            lead="Customers connect over standard SMPP or HTTP, and carriers see an ordinary SMPP client — so most migrations come down to moving accounts, routes and prices. Our engineers map your current setup and plan the move with you." />
          <ButtonLink to="/contact?interest=Migration" variant="secondary" arrow className="mt-10">Talk to a migration engineer</ButtonLink>
        </Container>
      </Section>

      <FaqSection items={migrateFaq} title="Migration questions" tone="muted" />
      <CtaBand title="Plan your move from Jasmin" lead={`Tell us about your Jasmin setup — users, connectors and traffic — and we will come back within ${SITE.responseTime} with a migration plan.`} />
    </Page>
  );
}
