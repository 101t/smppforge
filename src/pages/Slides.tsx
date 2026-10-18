import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, Maximize, Printer, Presentation } from 'lucide-react';
import { DECKS, SlideFrame } from '../slides/decks';
import { SITE } from '../site';
import NotFound from './NotFound';

const PRINT_CSS = '@media print { @page { size: 1280px 720px; margin: 0; } html, body { background: #fff; } }';

export default function Slides() {
  const { deck } = useParams<{ deck: string }>();
  const pres = deck ? DECKS[deck] : undefined;
  const total = pres?.slides.length ?? 0;
  const [index, setIndex] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(total - 1, i))), [total]);
  const next = useCallback(() => setIndex(i => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex(i => Math.max(i - 1, 0)), []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stage.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const n = Number.parseInt(window.location.hash.slice(1), 10);
    setIndex(Number.isInteger(n) && n >= 1 && n <= total ? n - 1 : 0);
  }, [deck, total]);

  useEffect(() => {
    if (!pres) return;
    const hash = index === 0 ? '' : `#${index + 1}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${hash}`);
    }
  }, [index, pres]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, button, a')) {
        if (e.key === ' ' || e.key === 'Enter') return;
      }
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, total, toggleFullscreen]);

  if (!pres) return <NotFound />;

  const other = Object.values(DECKS).find(d => d.slug !== pres.slug);
  const slide = pres.slides[index];

  return (
    <div className="flex min-h-screen flex-col bg-ink-100 print:block print:bg-white">
      <style>{PRINT_CSS}</style>
      <h1 className="sr-only">{`${pres.title} — ${SITE.name} ${pres.subtitle.toLowerCase()}`}</h1>

      <header className="sticky top-0 z-30 bg-ink-950 text-white print:hidden">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-200 hover:text-white">
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <img src="/smppforge-logo.svg" alt="" className="h-6 w-6" />
              <span className="hidden font-display sm:inline">{SITE.name}</span>
            </Link>
            <span className="text-ink-600" aria-hidden>/</span>
            <span className="inline-flex min-w-0 items-center gap-2 truncate text-sm font-medium">
              <Presentation className="h-4 w-4 flex-shrink-0 text-cyan-300" aria-hidden />
              <span className="truncate">{pres.title}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {other && <Link to={`/slides/${other.slug}`} className="hidden rounded-lg px-3 py-1.5 text-sm text-ink-300 hover:bg-white/5 hover:text-white md:inline-block">{other.title} deck</Link>}
            <button type="button" onClick={toggleFullscreen} className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ink-200 hover:bg-white/5 hover:text-white sm:inline-flex" title="Full screen (F)">
              <Maximize className="h-4 w-4" aria-hidden /><span className="hidden lg:inline">Present</span>
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ink-200 hover:bg-white/5 hover:text-white" title="Print or save as PDF">
              <Printer className="h-4 w-4" aria-hidden /><span className="hidden lg:inline">Save PDF</span>
            </button>
            <Link to="/contact" className="ml-1 whitespace-nowrap rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-500">
              <span className="sm:hidden">Demo</span><span className="hidden sm:inline">Request a demo</span>
            </Link>
          </div>
        </div>
        <div className="h-1 bg-white/10" aria-hidden>
          <div className="h-1 bg-gradient-to-r from-brand-500 to-cyan-400 transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-3 py-6 sm:px-6 print:hidden">
        <div
          ref={stage}
          className="stage w-full"
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          }}
        >
          <div className="stage-slide mx-auto" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${total}: ${slide.title}`}>
            <div key={index} className="animate-scale-in overflow-hidden rounded-[1.25rem] shadow-2xl shadow-ink-900/25">
              <SlideFrame slide={slide} index={index} total={total} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-500 sm:hidden landscape:hidden">Turn your phone sideways for a larger view · swipe to change slides</p>
        </div>
      </main>

      <nav aria-label="Slides" className="border-t border-ink-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <button type="button" onClick={prev} disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 hover:bg-ink-100 disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
          </button>
          <div className="hidden items-center gap-1.5 sm:flex">
            {pres.slides.map((s, i) => (
              <button key={s.title} type="button" onClick={() => go(i)} aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === index ? 'step' : undefined}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-600' : 'w-2.5 bg-ink-200 hover:bg-ink-300'}`} />
            ))}
          </div>
          <span className="text-sm tabular-nums text-ink-500 sm:hidden">{index + 1} / {total}</span>
          <button type="button" onClick={next} disabled={index === total - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-40">
            Next <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <p className="hidden pb-3 text-center text-xs text-ink-400 sm:block [@media(max-height:500px)]:hidden">Use ← → to navigate · F for full screen · Save PDF prints one slide per page</p>
      </nav>

      <div className="hidden print:block">
        {pres.slides.map((s, i) => <SlideFrame key={s.title} slide={s} index={i} total={total} />)}
      </div>
    </div>
  );
}
