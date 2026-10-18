import { Link } from 'react-router-dom';
import { Page } from '../components/Layout';
import { Container, ButtonLink, DarkBackdrop } from '../components/ui';

const POPULAR = [
  { to: '/platform', label: 'Platform', sub: 'Routing, billing, delivery and more' },
  { to: '/pricing', label: 'Pricing', sub: 'Licensing without per-message fees' },
  { to: '/migrate-from-jasmin', label: 'Migrate from Jasmin', sub: 'Switch in about five weeks' },
  { to: '/slides/sales', label: 'Sales deck', sub: 'The five-minute overview' },
];

export default function NotFound() {
  return (
    <Page>
      <section className="relative overflow-hidden bg-ink-950 pb-24 pt-36 text-white sm:pt-44">
        <DarkBackdrop strong />
        <Container className="relative max-w-3xl text-center">
          <p className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">This message took a wrong route.</h1>
          <p className="mt-5 text-lg text-ink-200">The page you are looking for does not exist or has moved. Here are some good places to go instead.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" size="lg" arrow>Back to home</ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="ghost-dark">Contact sales</ButtonLink>
          </div>
          <ul className="mt-14 grid gap-3 text-left sm:grid-cols-2">
            {POPULAR.map(p => (
              <li key={p.to}>
                <Link to={p.to} className="block rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
                  <div className="font-semibold text-white">{p.label}</div>
                  <div className="mt-1 text-sm text-ink-300">{p.sub}</div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Page>
  );
}
