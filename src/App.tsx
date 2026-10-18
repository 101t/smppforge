import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Solutions from './pages/Solutions';
import Security from './pages/Security';
import Compare from './pages/Compare';
import MigrateJasmin from './pages/MigrateJasmin';
import Pricing from './pages/Pricing';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Slides from './pages/Slides';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { canonical, routeFor } from './seo';

/** Keeps title, description, canonical and social tags in step with in-app navigation. */
function useRouteMeta(pathname: string) {
  useEffect(() => {
    const meta = routeFor(pathname);
    document.title = meta.title;
    const set = (selector: string, value: string) => document.head.querySelector(selector)?.setAttribute('content', value);
    set('meta[name="description"]', meta.description);
    set('meta[name="robots"]', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
    set('meta[property="og:url"]', canonical(meta.path));
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (meta.noindex) {
      link?.remove();
    } else {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical(meta.path);
    }
  }, [pathname]);
}

// Adding a route? Add its metadata to ROUTES in seo.ts — the prerender script and sitemap read it from there.
export default function App() {
  const { pathname, hash } = useLocation();
  useRouteMeta(pathname);

  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/security" element={<Security />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/migrate-from-jasmin" element={<MigrateJasmin />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/company" element={<Company />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/slides/:deck" element={<Slides />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
