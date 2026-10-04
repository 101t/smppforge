import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { SITE } from '../site';
import { PUBLISHED } from '../benchmark';

export function Brand({ size = 'w-8 h-8', dark = false }: { size?: string; dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src="/smppforge-logo.svg" alt="" className={`${size} rounded-lg`} />
      <span className={`text-lg font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>{SITE.name}</span>
    </Link>
  );
}

const sections = [
  { href: '/#platform', label: 'Platform' },
  ...(PUBLISHED ? [{ href: '/#benchmarks', label: 'Performance' }] : []),
  { href: '/#compliance', label: 'Compliance' },
  { href: '/#comparison', label: 'Compare' },
  { href: '/#migration', label: 'Migrate from Jasmin' },
  { href: '/#deployment', label: 'Deployment' },
];

export function SiteNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Brand />
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600">
          {sections.map(s => (
            <a key={s.href} href={s.href} className="hover:text-indigo-600 transition-colors">{s.label}</a>
          ))}
        </div>
        <Link to="/contact" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
          Request a demo
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-14 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Brand dark size="w-7 h-7" />
            <p className="mt-3 text-sm max-w-xs">{SITE.tagline}. High-performance SMPP &amp; SMS gateway, engineered for carrier scale.</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#platform" className="hover:text-white">Platform</a></li>
              {PUBLISHED && <li><a href="/#benchmarks" className="hover:text-white">Performance</a></li>}
              <li><a href="/#comparison" className="hover:text-white">Comparison</a></li>
              <li><a href="/#deployment" className="hover:text-white">Deployment</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/slides/overview" className="hover:text-white">Platform overview deck</Link></li>
              <li><Link to="/slides/sales" className="hover:text-white">Sales deck</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${SITE.salesEmail}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="w-3.5 h-3.5" />{SITE.salesEmail}</a></li>
              <li><a href={`mailto:${SITE.infoEmail}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="w-3.5 h-3.5" />{SITE.infoEmail}</a></li>
              <li><Link to="/contact" className="hover:text-white">Request a demo</Link></li>
              <li className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Proudly built in {SITE.country}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500 space-y-2">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Jasmin, Kannel, NowSMS, Ozeki, Alaris, Restcomm and other product names are trademarks of their
            respective owners, used here only to identify those products. {SITE.name} is not affiliated with or
            endorsed by them.
          </p>
        </div>
      </div>
    </footer>
  );
}
