import { KeyRound, ShieldCheck, Eye, Scale, Mail, MapPin, Handshake, Briefcase } from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, FeatureCard, StatTile, PageHero, DarkBackdrop, CtaBand, IconBadge } from '../components/ui';
import { senderRules } from '../content';
import { SITE } from '../site';

const VALUES = [
  { icon: KeyRound, title: 'Ownership', body: 'Your platform, your data, your margins. We build software you control — not a toll booth every message must pass through.' },
  { icon: ShieldCheck, title: 'Reliability first', body: 'Every message is money and trust. We design for the bad day: carrier outages, traffic spikes and restarts.' },
  { icon: Eye, title: 'Radical transparency', body: 'A public roadmap, honest comparisons and clearly stated limits. You should know exactly what you are buying.' },
  { icon: Scale, title: 'Compliance by design', body: 'Rules belong in the product, enforced on every message — not in a policy document nobody reads.' },
];

export default function Company() {
  return (
    <Page>
      <PageHero
        eyebrow="Company"
        title={<>Messaging infrastructure should belong to <span className="text-gradient">the businesses that run it.</span></>}
        lead={`${SITE.name} builds carrier-grade SMS software for operators, aggregators and enterprises — software they own and control, without per-message tolls, lock-in or a patchwork of tools.`}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold text-brand-600">Our mission</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
              Give every messaging business carrier-grade infrastructure <span className="text-gradient-light">it truly owns.</span>
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              SMS is still the one channel that reaches every phone, with nothing to install. Banks send passcodes over it,
              hospitals send reminders, governments send alerts — and people read them within minutes.
            </p>
            <p>
              Yet the businesses that carry those messages have had two choices: rent a hosted platform that takes a cut of every
              message, or assemble open-source parts and build billing, consoles and compliance themselves.
            </p>
            <p>
              We built {SITE.name} to be the third option: a complete platform — routing, billing, delivery, compliance and a
              console — that runs on your infrastructure, under your brand, on your terms.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHead eyebrow="What we believe" title="The principles behind the product" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(v => <FeatureCard key={v.title} icon={v.icon} title={v.title}>{v.body}</FeatureCard>)}
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="overflow-hidden">
        <DarkBackdrop />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead dark align="left" eyebrow="Global by design" title={`Headquartered in ${SITE.hq.city}. Built for every market.`}
              lead={`From ${SITE.hq.city}, we build for messaging businesses everywhere — tracking sender rules from the United States to Singapore, and supporting every alphabet your customers write in.`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile dark value={String(senderRules.length)} label="Markets profiled" sub="Sender-name rules tracked" />
            <StatTile dark value="3" label="SMPP versions" sub="3.3, 3.4 and 5.0" />
            <StatTile dark value="24×7" label="Enterprise support" sub="With response-time commitments" />
            <StatTile dark value="1 day" label="Response time" sub="To every sales enquiry" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100 sm:p-10">
            <IconBadge icon={Handshake} size="lg" />
            <h2 className="mt-6 text-2xl font-bold text-ink-950">Partner with us</h2>
            <p className="mt-3 text-ink-600">
              Resellers, system integrators and cloud consultancies: let’s talk about bringing {SITE.name} to your customers —
              as a reseller, an integration partner or a managed deployment.
            </p>
            <ButtonLink to="/contact?interest=Partnership" variant="secondary" arrow className="mt-8">Become a partner</ButtonLink>
          </div>
          <div className="rounded-3xl bg-ink-50 p-8 ring-1 ring-ink-100 sm:p-10">
            <IconBadge icon={Briefcase} size="lg" />
            <h2 className="mt-6 text-2xl font-bold text-ink-950">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-ink-700">
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden /><span><span className="block text-sm text-ink-500">Sales</span><a className="font-semibold hover:text-brand-600" href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a></span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden /><span><span className="block text-sm text-ink-500">General enquiries & support</span><a className="font-semibold hover:text-brand-600" href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a></span></li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-brand-600" aria-hidden /><span><span className="block text-sm text-ink-500">Headquarters</span><span className="font-semibold">{SITE.hq.label}, {SITE.hq.country}</span></span></li>
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </Page>
  );
}
