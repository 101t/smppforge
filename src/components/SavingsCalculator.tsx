import { useId, useState } from 'react';
import { ButtonLink } from './ui';

const VOLUMES = [100_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000, 25_000_000, 50_000_000, 100_000_000, 250_000_000];
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

/** Estimates the per-message platform markup a business keeps by running its own gateway. */
export function SavingsCalculator() {
  const [volIdx, setVolIdx] = useState(6);
  const [markup, setMarkup] = useState(0.004);
  const volId = useId();
  const feeId = useId();
  const volume = VOLUMES[volIdx];
  const monthly = volume * markup;

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink-900/5 ring-1 ring-ink-100 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-10 p-8 sm:p-10">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={volId} className="text-sm font-semibold text-ink-900">Messages per month</label>
            <output htmlFor={volId} className="font-display text-2xl font-bold text-ink-950">{compact.format(volume)}</output>
          </div>
          <input id={volId} type="range" min={0} max={VOLUMES.length - 1} step={1} value={volIdx}
            onChange={e => setVolIdx(Number(e.target.value))}
            aria-valuetext={`${compact.format(volume)} messages per month`}
            className="mt-4 h-2 w-full cursor-pointer accent-brand-600" />
          <div className="mt-2 flex justify-between text-xs text-ink-400"><span>100K</span><span>250M</span></div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={feeId} className="text-sm font-semibold text-ink-900">Platform markup per message</label>
            <output htmlFor={feeId} className="font-display text-2xl font-bold text-ink-950">${markup.toFixed(4)}</output>
          </div>
          <input id={feeId} type="range" min={0.001} max={0.015} step={0.0005} value={markup}
            onChange={e => setMarkup(Number(e.target.value))}
            aria-valuetext={`${markup.toFixed(4)} dollars per message`}
            className="mt-4 h-2 w-full cursor-pointer accent-brand-600" />
          <div className="mt-2 flex justify-between text-xs text-ink-400"><span>$0.001</span><span>$0.015</span></div>
        </div>
        <p className="text-xs leading-relaxed text-ink-500">
          Illustrative estimate of the markup a hosted messaging API charges on top of carrier termination. Carrier costs apply
          either way — compare this figure with your license quote. Not a guarantee of savings.
        </p>
      </div>
      <div className="relative flex flex-col justify-center overflow-hidden bg-ink-950 p-8 text-white sm:p-10" aria-live="polite">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="relative">
          <div className="text-sm font-medium text-ink-300">Markup you keep each year</div>
          <div className="mt-2 font-display text-5xl font-bold tracking-tight text-gradient sm:text-6xl">{usd.format(monthly * 12)}</div>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div><dt className="text-xs text-ink-400">Per month</dt><dd className="mt-1 font-display text-xl font-bold">{usd.format(monthly)}</dd></div>
            <div><dt className="text-xs text-ink-400">Over three years</dt><dd className="mt-1 font-display text-xl font-bold">{usd.format(monthly * 36)}</dd></div>
          </dl>
          <ButtonLink to="/contact" variant="light" arrow className="mt-8">Get your license quote</ButtonLink>
        </div>
      </div>
    </div>
  );
}
