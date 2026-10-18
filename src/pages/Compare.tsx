import { Page } from '../components/Layout';
import { Container, Section, SectionHead, ButtonLink, TextLink, MarkIcon, PageHero, CtaBand } from '../components/ui';
import { threeWay, openSource, landscape, type Cell } from '../content';
import { SITE } from '../site';

const tally = (k: 'forge' | 'jasmin' | 'kannel') => ({
  built: openSource.filter(r => r[k].ok === true).length,
  partial: openSource.filter(r => r[k].ok === 'partial').length,
  none: openSource.filter(r => r[k].ok === false).length,
});
const COVERAGE = [
  { name: SITE.name, ...tally('forge'), hi: true },
  { name: 'Jasmin', ...tally('jasmin'), hi: false },
  { name: 'Kannel', ...tally('kannel'), hi: false },
];

function CellView({ cell, strong = false }: { cell: Cell; strong?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <MarkIcon ok={cell.ok} />
      <span className={`pt-0.5 ${strong ? 'font-semibold text-ink-950' : cell.ok === false ? 'text-ink-400' : 'text-ink-600'}`}>{cell.v}</span>
    </div>
  );
}

export default function Compare() {
  const total = openSource.length;
  return (
    <Page>
      <PageHero
        eyebrow="Compare"
        title={<>How {SITE.name} <span className="text-gradient">compares.</span></>}
        lead="An honest look at the options: hosted messaging APIs, open-source gateways and commercial platforms — and where SMPP Forge fits."
        actions={<><ButtonLink to="/contact" size="lg" arrow>Request a demo</ButtonLink><ButtonLink to="/migrate-from-jasmin" size="lg" variant="ghost-dark">Migrating from Jasmin?</ButtonLink></>}
        aside={
          <div className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
            <div className="font-semibold text-white">Capabilities built in</div>
            <div className="text-xs text-ink-300">Out of the {total} business capabilities compared below</div>
            <ul className="mt-6 space-y-5">
              {COVERAGE.map(c => (
                <li key={c.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className={c.hi ? 'font-semibold text-white' : 'text-ink-200'}>{c.name}</span>
                    <span className={`font-display text-lg font-bold ${c.hi ? 'text-gradient' : 'text-ink-200'}`}>{c.built} / {total}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className={`h-2 rounded-full ${c.hi ? 'bg-gradient-to-r from-brand-500 to-cyan-400' : 'bg-ink-400'}`} style={{ width: `${(c.built / total) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section id="cpaas">
        <Container>
          <SectionHead eyebrow="Build, rent or own" title="Three ways to run SMS — one that lets you keep everything"
            lead="Hosted APIs rent you convenience at a per-message price. Open source is free to download but expensive to finish. SMPP Forge is the finished product you own." />
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
        </Container>
      </Section>

      <Section id="open-source" tone="muted">
        <Container>
          <SectionHead eyebrow="Open-source gateways" title={`${SITE.name} vs Jasmin vs Kannel`}
            lead="Side by side with the two most widely deployed open-source SMS gateways, capability by capability." />

          <div className="mx-auto mt-14 max-w-4xl rounded-3xl bg-white p-8 ring-1 ring-ink-100">
            <h3 className="text-lg font-bold text-ink-950">{total} capabilities at a glance</h3>
            <p className="mt-1 text-sm text-ink-500">How many rows of the table below each gateway covers fully, partially or not at all.</p>
            <div className="mt-6 space-y-4">
              {COVERAGE.map(c => (
                <div key={c.name} className="grid grid-cols-[6.5rem_1fr] items-center gap-4 sm:grid-cols-[8rem_1fr]">
                  <div className={`text-sm ${c.hi ? 'font-bold text-brand-700' : 'font-medium text-ink-700'}`}>{c.name}</div>
                  <div className="flex h-8 overflow-hidden rounded-lg ring-1 ring-ink-100" role="img"
                    aria-label={`${c.name}: ${c.built} built in, ${c.partial} partial, ${c.none} not available`}>
                    <div className="flex items-center justify-center bg-emerald-500 text-xs font-bold text-white" style={{ width: `${(c.built / total) * 100}%` }}>{c.built || ''}</div>
                    <div className="flex items-center justify-center bg-amber-400 text-xs font-bold text-amber-950" style={{ width: `${(c.partial / total) * 100}%` }}>{c.partial || ''}</div>
                    <div className="flex items-center justify-center bg-ink-100 text-xs font-bold text-ink-500" style={{ width: `${(c.none / total) * 100}%` }}>{c.none || ''}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-500">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />Built in</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />Partial, add-on or external</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-ink-100 ring-1 ring-ink-200" />Not available</span>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
            <table className="w-full min-w-[820px] text-left text-sm">
              <caption className="sr-only">{SITE.name}, Jasmin and Kannel capabilities</caption>
              <thead>
                <tr className="border-b border-ink-100">
                  <th scope="col" className="w-[28%] p-5 font-semibold text-ink-500">Capability</th>
                  <th scope="col" className="w-[24%] bg-brand-600 p-5 font-semibold text-white">{SITE.name}</th>
                  <th scope="col" className="w-[24%] p-5 font-semibold text-ink-700">Jasmin</th>
                  <th scope="col" className="w-[24%] p-5 font-semibold text-ink-700">Kannel</th>
                </tr>
              </thead>
              <tbody>
                {openSource.map(r => (
                  <tr key={r.feature} className="border-b border-ink-50 align-top last:border-0">
                    <th scope="row" className="p-4 pl-5 font-medium text-ink-800">{r.feature}</th>
                    <td className="bg-brand-50/50 p-4"><CellView cell={r.forge} strong /></td>
                    <td className="p-4"><CellView cell={r.jasmin} /></td>
                    <td className="p-4"><CellView cell={r.kannel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center"><TextLink to="/migrate-from-jasmin">How to migrate from Jasmin in about five weeks</TextLink></div>
        </Container>
      </Section>

      <Section id="market">
        <Container>
          <SectionHead eyebrow="The wider market" title="Where SMPP Forge fits"
            lead="Different products solve different problems. Here is how we see the landscape — and where we are different." />
          <div className="mt-14 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-ink-100">
            <table className="w-full min-w-[960px] text-left text-sm">
              <caption className="sr-only">SMS platform landscape</caption>
              <thead>
                <tr className="border-b border-ink-100 text-ink-500">
                  <th scope="col" className="p-5 font-semibold">Product</th>
                  <th scope="col" className="p-5 font-semibold">Category</th>
                  <th scope="col" className="p-5 font-semibold">License / platform</th>
                  <th scope="col" className="p-5 font-semibold">Typical fit</th>
                  <th scope="col" className="bg-brand-600 p-5 font-semibold text-white">Where {SITE.name} is different</th>
                </tr>
              </thead>
              <tbody>
                {landscape.map(r => (
                  <tr key={r.product} className="border-b border-ink-50 align-top last:border-0">
                    <th scope="row" className="p-5 font-semibold text-ink-950">{r.product}</th>
                    <td className="p-5 text-ink-600">{r.kind}</td>
                    <td className="p-5 text-ink-600">{r.licence}</td>
                    <td className="p-5 text-ink-600">{r.fit}</td>
                    <td className="bg-brand-50/50 p-5 text-ink-800">{r.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-ink-500">
            Based on publicly available vendor documentation as of October 2026. Products change — verify against current vendor
            material. Spotted something out of date? Tell us at <a className="underline" href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a> and we will correct it.
            Product names are trademarks of their respective owners.
          </p>
        </Container>
      </Section>

      <CtaBand title="See the difference on your own traffic" />
    </Page>
  );
}
