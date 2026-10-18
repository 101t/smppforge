import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Mail, MapPin, Menu, X } from 'lucide-react';
import { SITE } from '../site';
import { Container } from './ui';

export function Brand({ dark = true }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
      <img src="/smppforge-logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
      <span className={`font-display text-lg font-bold tracking-tight ${dark ? 'text-white' : 'text-ink-950'}`}>{SITE.name}</span>
    </Link>
  );
}

const NAV = [
  { to: '/platform', label: 'Platform' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/security', label: 'Security' },
  { to: '/compare', label: 'Compare' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/company', label: 'Company' },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl print:hidden">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-ink-200 hover:text-white'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-200 hover:text-white sm:inline-block">Contact sales</Link>
          <Link to="/contact" className="whitespace-nowrap rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-500 sm:px-4">
            <span className="max-[399px]:hidden">Request a demo</span><span className="min-[400px]:hidden">Get a demo</span>
          </Link>
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mobile-nav"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-200 hover:bg-white/5 hover:text-white lg:hidden">
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-ink-950 lg:hidden">
          <Container className="grid gap-1 py-4">
            {NAV.map(n => (
              <NavLink key={n.to} to={n.to}
                className={({ isActive }) => `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-white/5 text-white' : 'text-ink-200 hover:bg-white/5 hover:text-white'}`}>
                {n.label}
              </NavLink>
            ))}
            <Link to="/migrate-from-jasmin" className="rounded-lg px-3 py-3 text-base font-medium text-ink-200 hover:bg-white/5 hover:text-white">Migrate from Jasmin</Link>
            <Link to="/contact" className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white">Request a demo</Link>
          </Container>
        </nav>
      )}
    </header>
  );
}

const FOOTER: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { to: '/platform', label: 'Platform overview' },
      { to: '/platform#route', label: 'Smart routing' },
      { to: '/platform#bill', label: 'Billing & invoicing' },
      { to: '/security', label: 'Security & compliance' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions#aggregators', label: 'SMS aggregators' },
      { to: '/solutions#operators', label: 'Operators & MVNOs' },
      { to: '/solutions#enterprise', label: 'Enterprises' },
      { to: '/solutions#regulated', label: 'Banks & regulated industries' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/compare', label: 'Compare gateways' },
      { to: '/migrate-from-jasmin', label: 'Migrate from Jasmin' },
      { to: '/slides/sales', label: 'Why SMPP Forge (deck)' },
      { to: '/slides/overview', label: 'Company overview (deck)' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/company', label: 'About us' },
      { to: '/contact', label: 'Contact sales' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/terms', label: 'Terms of use' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300 print:hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed">{SITE.tagline}. SMS gateway software for operators, aggregators and enterprises worldwide.</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-400" aria-hidden />{SITE.hq.label} · Serving customers worldwide</li>
              <li><a href={`mailto:${SITE.salesEmail}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-cyan-400" aria-hidden />{SITE.salesEmail}</a></li>
              <li><a href={`mailto:${SITE.infoEmail}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-cyan-400" aria-hidden />{SITE.infoEmail}</a></li>
            </ul>
          </div>
          {FOOTER.map(col => (
            <div key={col.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map(l => <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ink-400 md:flex-row md:items-start md:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">
            Jasmin, Kannel, NowSMS, Ozeki, Alaris, Restcomm, Twilio, Vonage, Infobip, Sinch and other product names are trademarks of
            their respective owners, used only to identify those products. {SITE.name} is not affiliated with or endorsed by them.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950">
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
