import {
  Server, EyeOff, MapPinned, KeyRound, UserCheck, ShieldAlert, History, Lock, Webhook, Ban, UserX, Gauge, Gavel, ShieldCheck,
} from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, FeatureCard, CheckList, StatTile, PageHero, CtaBand } from '../components/ui';
import { ComplianceCard } from '../components/Visuals';
import { senderRules, regimes, regimeCount } from '../content';
import { SITE } from '../site';

const SOVEREIGNTY = [
  { icon: Server, title: 'Self-hosted by design', body: `${SITE.name} runs in your cloud account or data center. We never see your traffic, your customers or their phone numbers.` },
  { icon: EyeOff, title: 'Private by default', body: 'Phone numbers are masked in logs and message text is never written to them — so routine troubleshooting does not expose personal data.' },
  { icon: MapPinned, title: 'Data residency, your way', body: 'Choose the country, the region and the infrastructure. Meet local residency rules without asking a vendor for an exception.' },
];

const CONTROLS = [
  { icon: KeyRound, title: 'Two-factor sign-in', body: 'Authenticator-app verification for every console user, with backup codes.' },
  { icon: UserCheck, title: 'Role-based access', body: 'Administrators and customers see and change only what their role allows.' },
  { icon: ShieldAlert, title: 'IP allowlists & rate limits', body: 'Restrict access by network, per account, and slow down abusive clients automatically.' },
  { icon: History, title: 'Complete audit trail', body: 'Every administrative change is recorded — who made it, what changed and when.' },
  { icon: Lock, title: 'Encrypted connections', body: 'Encrypted SMPP sessions, with optional certificate-based authentication on both sides.' },
  { icon: Webhook, title: 'Signed notifications', body: 'Every webhook is signed, so your systems can verify it really came from your gateway.' },
  { icon: Ban, title: 'Callback protection', body: 'Callback addresses are checked, so they cannot be abused to reach your internal network.' },
  { icon: UserX, title: 'Instant suspension', body: 'Suspend a customer or a whole customer group in one click; access stops immediately.' },
  { icon: Gauge, title: 'Fair-use throughput', body: 'Per-account message-rate limits stop one customer’s burst from affecting everyone else.' },
];

const REGULATIONS = [
  { name: 'GDPR', where: 'European Union', how: 'Data minimization, regional hosting, access control and audit trails.' },
  { name: 'TCPA & CTIA guidelines', where: 'United States', how: 'Consent records, quiet hours and numeric-sender enforcement.' },
  { name: 'CASL', where: 'Canada', how: 'Consent tracking for commercial electronic messages.' },
  { name: 'KVKK & İYS', where: 'Türkiye', how: 'Consent checks and registered, brand-matched sender names.' },
  { name: 'TRAI DLT', where: 'India', how: 'Registered sender headers enforced per destination.' },
  { name: 'SSIR', where: 'Singapore', how: 'Only registered sender names reach Singapore numbers.' },
];

const POSTURE = [
  ['Two-factor sign-in', 'Built in'],
  ['Audit trail', 'Recording'],
  ['IP allowlists', 'Per account'],
  ['Sender-name registry', 'Built in'],
  ['Phone numbers in logs', 'Masked'],
  ['Where your data lives', 'Your servers'],
] as const;

function TrustPanel() {
  return (
    <div className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30"><ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden /></span>
        <div>
          <div className="font-semibold text-white">Security posture</div>
          <div className="text-xs text-ink-300">The same controls on every send path</div>
        </div>
      </div>
      <ul className="mt-6 divide-y divide-white/10">
        {POSTURE.map(([what, status]) => (
          <li key={what} className="flex items-center justify-between gap-3 py-3 text-sm">
            <span className="text-ink-100">{what}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Security() {
  return (
    <Page>
      <PageHero
        eyebrow="Security & compliance"
        title={<>Security and compliance, <span className="text-gradient">built into every message.</span></>}
        lead="Your messages, your customers’ phone numbers and your brand are worth protecting. SMPP Forge enforces the rules on every path — API, SMPP, portal and bulk — and keeps the evidence."
        actions={<><ButtonLink to="/contact" size="lg" arrow>Talk to our team</ButtonLink><ButtonLink href="#markets" size="lg" variant="ghost-dark">Sender rules by market</ButtonLink></>}
        aside={<TrustPanel />}
      />

      <Section>
        <Container>
          <SectionHead eyebrow="Data sovereignty" title="Your data never leaves your hands"
            lead="With a hosted API, every message passes through someone else’s cloud. With SMPP Forge, it never leaves yours." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {SOVEREIGNTY.map(s => <FeatureCard key={s.title} icon={s.icon} title={s.title}>{s.body}</FeatureCard>)}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHead eyebrow="Security controls" title="Enterprise security, switched on from day one"
            lead="The controls your security team will ask about in the first meeting — already built in." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROLS.map(c => <FeatureCard key={c.title} icon={c.icon} title={c.title}>{c.body}</FeatureCard>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead align="left" eyebrow="Compliance engine" title="Stop spoofing and unconsented messages before they leave"
              lead="A sender name is the easiest way to impersonate a brand, and regulators are closing the gap. SMPP Forge checks every message against your rules before a carrier ever sees it." />
            <CheckList className="mt-8" items={[
              'A sender-name registry that locks each name to its verified owner and approved countries',
              'Look-alike protection — case, separators and digit swaps are caught, so “ACM3 BANK” cannot pass for “ACME Bank”',
              'Consent and opt-in records by region for commercial traffic',
              'Quiet hours that hold marketing outside permitted times',
              'Content rules and number blocklists, by region',
              'Numeric-only destinations such as the United States enforced automatically',
              'The same rules on every path — API, SMPP, portal and bulk',
            ]} />
          </div>
          <div className="rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-100 sm:p-10">
            <ComplianceCard />
            <p className="mt-5 text-sm leading-relaxed text-ink-600">Approved names go out exactly as registered. Near-copies resolve to the original and are refused for anyone but its verified owner.</p>
          </div>
        </Container>
      </Section>

      <Section id="markets" tone="muted">
        <Container>
          <SectionHead eyebrow="Sender rules by market" title="Every market has its own rules — we track them"
            lead="Regulators worldwide are moving to registered sender names. Here is where some of the largest markets stand today." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile value={String(senderRules.length)} label="Markets profiled" sub="From regulator and industry guidance" />
            <StatTile value={`${regimeCount('required')} of ${senderRules.length}`} label="Require registration" sub="Unregistered names are blocked or flagged" />
            <StatTile value={String(regimeCount('numeric'))} label="Numeric senders only" sub="Alphanumeric names not supported" />
            <StatTile value="11" label="Characters, maximum" sub="The global limit for a sender name" />
          </div>
          <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
            <table className="w-full min-w-[820px] text-left text-sm">
              <caption className="sr-only">Sender-name rules by market</caption>
              <thead>
                <tr className="border-b border-ink-100 text-ink-500">
                  <th scope="col" className="p-5 font-semibold">Market</th>
                  <th scope="col" className="p-5 font-semibold">Authority</th>
                  <th scope="col" className="p-5 font-semibold">Regime</th>
                  <th scope="col" className="p-5 font-semibold">What it means for senders</th>
                </tr>
              </thead>
              <tbody>
                {senderRules.map(r => (
                  <tr key={r.market} className="border-b border-ink-50 align-top last:border-0">
                    <th scope="row" className="p-5 font-semibold text-ink-950">{r.market}</th>
                    <td className="p-5 text-ink-600">{r.authority}</td>
                    <td className="p-5"><span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${regimes[r.regime].cls}`}>{regimes[r.regime].label}</span></td>
                    <td className="p-5 text-ink-600">{r.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-xs text-ink-500">Summary of public regulator and industry guidance as of September 2026. Rules change — confirm current requirements with your carriers before approving senders.</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="Regulations" title="Designed to help you meet the rules that matter"
            lead="SMPP Forge gives you the controls. How you configure and operate them completes the picture." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REGULATIONS.map(r => (
              <div key={r.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100">
                <div className="flex items-center gap-3">
                  <Gavel className="h-5 w-5 text-brand-600" aria-hidden />
                  <h3 className="text-lg font-bold text-ink-950">{r.name}</h3>
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">{r.where}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{r.how}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-500">This page describes product capabilities and is not legal advice.</p>
        </Container>
      </Section>

      <Section tone="muted" className="!py-16">
        <Container className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 ring-1 ring-ink-100 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-ink-950">Found a security issue?</h2>
            <p className="mt-1 text-ink-600">Please report it privately to <a className="font-semibold text-brand-600 hover:underline" href={`mailto:${SITE.infoEmail}?subject=Security%20report`}>{SITE.infoEmail}</a>. We will acknowledge it promptly and keep you updated until it is resolved.</p>
          </div>
          <ButtonLink href={`mailto:${SITE.infoEmail}?subject=Security%20report`} variant="secondary">Report an issue</ButtonLink>
        </Container>
      </Section>

      <CtaBand title="Bring your security team to the demo" lead="We will walk your security and compliance reviewers through every control — and answer their questionnaire." />
    </Page>
  );
}
