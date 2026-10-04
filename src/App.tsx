import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Slides from './pages/Slides';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Routes here must match scripts/static-routes.mjs.
export default function App() {
  const { pathname, hash } = useLocation();
  // Page changes start at the top; in-page anchors (#benchmarks) are left to the browser.
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/slides/:deck" element={<Slides />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
