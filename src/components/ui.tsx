import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Faq, Mark } from '../content';
import { SITE } from '../site';

type Children = { children?: React.ReactNode };

export function Container({ className = '', children }: Children & { className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type Tone = 'white' | 'muted' | 'dark';
const tones: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-ink-50',
  dark: 'bg-ink-950 text-white',
};

export function Section({ id, tone = 'white', className = '', children }: Children & { id?: string; tone?: Tone; className?: string }) {
  return <section id={id} className={`relative py-20 sm:py-28 ${tones[tone]} ${className}`}>{children}</section>;
}

export function Eyebrow({ children, dark = false }: Children & { dark?: boolean }) {
  return <p className={`text-sm font-semibold tracking-wide ${dark ? 'text-cyan-300' : 'text-brand-600'}`}>{children}</p>;
}

export function SectionHead({ eyebrow, title, lead, dark = false, align = 'center', className = '' }: {
  eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; dark?: boolean; align?: 'center' | 'left'; className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-white' : 'text-ink-950'}`}>{title}</h2>
      {lead && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-ink-200' : 'text-ink-600'}`}>{lead}</p>}
    </div>
  );
}

type Variant = 'primary' | 'secondary' | 'ghost-dark' | 'light';
const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/25',
  secondary: 'bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300',
  'ghost-dark': 'bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/25',
  light: 'bg-white text-ink-950 hover:bg-ink-100 shadow-lg shadow-black/20',
};

export function ButtonLink({ to, href, variant = 'primary', size = 'md', arrow = false, className = '', children }: Children & {
  to?: string; href?: string; variant?: Variant; size?: 'md' | 'lg'; arrow?: boolean; className?: string;
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-4.5 py-2.5 text-sm'} ${variants[variant]} ${className}`;
  const inner = <>{children}{arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}</>;
  return to ? <Link to={to} className={cls}>{inner}</Link> : <a href={href} className={cls}>{inner}</a>;
}

export function TextLink({ to, children, dark = false }: Children & { to: string; dark?: boolean }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? 'text-cyan-300 hover:text-cyan-200' : 'text-brand-600 hover:text-brand-700'}`}>
      {children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

export function IconBadge({ icon: Icon, dark = false, size = 'md' }: { icon: LucideIcon; dark?: boolean; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10 rounded-xl';
  const ic = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
  return (
    <div className={`flex flex-shrink-0 items-center justify-center ${box} ${dark ? 'bg-white/5 text-cyan-300 ring-1 ring-white/10' : 'bg-brand-50 text-brand-600 ring-1 ring-brand-100'}`}>
      <Icon className={ic} aria-hidden />
    </div>
  );
}

export function FeatureCard({ icon, title, children, dark = false }: Children & { icon: LucideIcon; title: string; dark?: boolean }) {
  return (
    <div className={`h-full rounded-2xl p-6 transition-colors ${dark ? 'bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.05]' : 'bg-white ring-1 ring-ink-100 shadow-sm hover:ring-brand-200'}`}>
      <IconBadge icon={icon} dark={dark} />
      <h3 className={`mt-5 text-lg font-semibold ${dark ? 'text-white' : 'text-ink-950'}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-600'}`}>{children}</p>
    </div>
  );
}

export function CheckList({ items, dark = false, className = '' }: { items: React.ReactNode[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3 text-[0.95rem] leading-relaxed ${dark ? 'text-ink-200' : 'text-ink-700'}`}>
          <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${dark ? 'bg-cyan-400/15 text-cyan-300' : 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'}`}>
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MarkIcon({ ok, label }: { ok: Mark; label?: string }) {
  if (ok === true) {
    return <span role="img" aria-label={label ?? 'Yes'} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /></span>;
  }
  if (ok === 'partial') {
    return <span role="img" aria-label={label ?? 'Partial'} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-200"><span className="h-2 w-2 rounded-full bg-amber-500" /></span>;
  }
  return <span role="img" aria-label={label ?? 'No'} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-50 text-ink-300 ring-1 ring-ink-100"><Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /></span>;
}

export function StatTile({ value, label, sub, dark = false }: { value: string; label: string; sub?: string; dark?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${dark ? 'bg-white/[0.03] ring-1 ring-white/10' : 'bg-white ring-1 ring-ink-100'}`}>
      <div className={`font-display text-4xl font-bold tracking-tight ${dark ? 'text-gradient' : 'text-gradient-light'}`}>{value}</div>
      <div className={`mt-2 text-sm font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}>{label}</div>
      {sub && <div className={`mt-1 text-sm ${dark ? 'text-ink-300' : 'text-ink-500'}`}>{sub}</div>}
    </div>
  );
}

export function Pill({ children, dark = false }: Children & { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${dark ? 'bg-white/5 text-ink-200 ring-1 ring-white/10' : 'bg-white text-ink-700 ring-1 ring-ink-200'}`}>{children}</span>
  );
}

/** Dark backdrop shared by heroes and dark bands: grid, soft brand glows, faded edges. */
export function DarkBackdrop({ strong = false }: { strong?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid-dark mask-fade-b absolute inset-0" />
      <div className={`absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px] ${strong ? '' : 'opacity-80'}`} />
      <div className="absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

/** Dark page header for inner pages. */
export function PageHero({ eyebrow, title, lead, actions, aside }: {
  eyebrow: string; title: React.ReactNode; lead: React.ReactNode; actions?: React.ReactNode; aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-32 text-white sm:pb-24 sm:pt-40">
      <DarkBackdrop />
      <Container className={`relative ${aside ? 'grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl">{lead}</p>
          {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </Container>
    </section>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-ink-100 rounded-2xl bg-white ring-1 ring-ink-100">
      {items.map(f => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
            <h3 className="font-sans text-base font-semibold tracking-normal text-ink-950">{f.q}</h3>
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 ring-1 ring-ink-100 transition-transform group-open:rotate-45">
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 pr-10 text-[0.95rem] leading-relaxed text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ items, title = 'Frequently asked questions', tone = 'white' }: { items: Faq[]; title?: string; tone?: Tone }) {
  return (
    <Section tone={tone}>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead align="left" eyebrow="FAQ" title={title} />
          <p className="mt-5 text-ink-600">
            Something else on your mind? Email <a className="font-semibold text-brand-600 hover:underline" href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a> — a person, not a bot, will answer.
          </p>
        </div>
        <FaqList items={items} />
      </Container>
    </Section>
  );
}

export function CtaBand({ title = 'Ready to own your messaging?', lead }: { title?: string; lead?: string }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-16 text-center text-white sm:px-16 sm:py-20">
          <DarkBackdrop strong />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
            <p className="mt-5 text-lg text-ink-200">
              {lead ?? `See ${SITE.name} on your own traffic profile. Tell us about your business and we will reply within ${SITE.responseTime} with a tailored demo.`}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/contact" size="lg" arrow>Request a demo</ButtonLink>
              <ButtonLink href={`mailto:${SITE.salesEmail}`} size="lg" variant="ghost-dark">{SITE.salesEmail}</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
