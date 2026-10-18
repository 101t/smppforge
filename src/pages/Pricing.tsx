import { Check, Minus } from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, CheckList, PageHero, FaqSection, CtaBand } from '../components/ui';
import { SavingsCalculator } from '../components/SavingsCalculator';
import { pricingFaq } from '../content';
import { SITE } from '../site';

const PLANS = [
  {
    name: 'Evaluation', price: 'Guided proof of concept', blurb: 'Prove it on your own traffic profile before you commit.', cta: 'Start an evaluation', plan: 'Evaluation', featured: false,
    items: ['Discovery call and solution design', 'Guided proof of concept with an engineer', 'Built-in carrier simulator for safe testing', 'Migration assessment if you run Jasmin or Kannel'],
  },
  {
    name: 'Business', price: 'Annual license', blurb: 'A production license for growing messaging businesses.', cta: 'Get a quote', plan: 'Business', featured: true,
    items: ['Production license per deployment', 'Every platform feature included', 'Business-hours support', 'All platform updates', 'Onboarding for your team'],
  },
  {
    name: 'Enterprise', price: 'Custom agreement', blurb: 'For mobile operators and large aggregators.', cta: 'Contact sales', plan: 'Enterprise', featured: false,
    items: ['Everything in Business', '24×7 support with response-time commitments', 'Hands-on deployment and migration', 'Input into the product roadmap', 'Private offers and custom terms'],
  },
];

type Row = [string, string | boolean, string | boolean, string | boolean];
const MATRIX: Row[] = [
  ['Routing, billing, delivery and compliance features', true, true, true],
  ['Operator console and customer portal', true, true, true],
  ['Production use', false, true, true],
  ['Software updates', 'During evaluation', true, true],
  ['Support', 'Solutions engineer', 'Business hours', '24×7'],
  ['Response-time commitments', false, false, true],
  ['Deployment assistance', 'Guided', 'Onboarding', 'Hands-on'],
  ['Migration from Jasmin or Kannel', 'Assessment', 'Guided', 'Hands-on'],
  ['Roadmap input', false, false, true],
];

function MatrixCell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-ink-300" aria-label="Not included" />;
  return <span className="text-ink-700">{v}</span>;
}

export default function Pricing() {
  return (
    <Page>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple licensing. <span className="text-gradient">No <span className="whitespace-nowrap">per-message</span> markup.</span></>}
        lead={`${SITE.name} is licensed per deployment and quoted for your traffic, deployment model and support needs — so your costs stay flat while your volume grows.`}
      />

      <Section className="!pt-0">
        <Container className="-mt-10 sm:-mt-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map(p => (
              <div key={p.name} className={`relative flex flex-col rounded-3xl p-8 ${p.featured ? 'bg-ink-950 text-white shadow-2xl shadow-brand-900/30 ring-2 ring-brand-500' : 'bg-white shadow-xl shadow-ink-900/5 ring-1 ring-ink-100'}`}>
                {p.featured && <span className="absolute -top-3.5 left-8 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
                <h2 className={`text-xl font-bold ${p.featured ? 'text-white' : 'text-ink-950'}`}>{p.name}</h2>
                <p className={`mt-2 text-sm ${p.featured ? 'text-ink-300' : 'text-ink-600'}`}>{p.blurb}</p>
                <div className={`mt-6 font-display text-2xl font-bold ${p.featured ? 'text-gradient' : 'text-gradient-light'}`}>{p.price}</div>
                <CheckList dark={p.featured} className="mt-6 flex-1" items={p.items} />
                <ButtonLink to={`/contact?plan=${p.plan}`} variant={p.featured ? 'primary' : 'secondary'} arrow className="mt-8 w-full">{p.cta}</ButtonLink>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-500">Every plan starts with a conversation. We reply within {SITE.responseTime}.</p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHead eyebrow="Compare plans" title="What each plan includes" />
          <div className="mt-12 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
            <table className="w-full min-w-[720px] text-sm">
              <caption className="sr-only">Plan comparison</caption>
              <thead>
                <tr className="border-b border-ink-100">
                  <th scope="col" className="p-5 text-left font-semibold text-ink-500">Feature</th>
                  {PLANS.map(p => <th key={p.name} scope="col" className={`w-44 p-5 text-center font-semibold ${p.featured ? 'bg-brand-600 text-white' : 'text-ink-800'}`}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(([label, ...cells]) => (
                  <tr key={label} className="border-b border-ink-50 last:border-0">
                    <th scope="row" className="p-5 text-left font-medium text-ink-800">{label}</th>
                    {cells.map((c, i) => <td key={i} className={`p-5 text-center ${PLANS[i].featured ? 'bg-brand-50/50' : ''}`}><MatrixCell v={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="Savings calculator" title="See what you keep by owning the platform"
            lead="Compare the per-message markup of a hosted API with a flat license — at your volume." />
          <div className="mt-14"><SavingsCalculator /></div>
        </Container>
      </Section>

      <FaqSection items={pricingFaq} title="Pricing questions" tone="muted" />
      <CtaBand title="Get a quote for your traffic" />
    </Page>
  );
}
