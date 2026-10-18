import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CircleCheck, Send, Mail, MapPin, Clock, CircleAlert, Copy, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Page } from '../components/Layout';
import { Container, DarkBackdrop, TextLink } from '../components/ui';
import { EMPTY_LEAD, LeadError, mailtoHref, submitLead, type Lead } from '../lib/leads';
import { SITE } from '../site';

const COUNTRIES = [
  'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong',
  'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
  'Palestine', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Türkiye',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uzbekistan', 'Vietnam', 'Other',
];
const ROLES = [
  'SMS aggregator / wholesale hub', 'Mobile operator / MVNO', 'Enterprise / SaaS platform', 'Bank / fintech', 'Healthcare',
  'Public sector', 'Reseller / system integrator', 'Other',
];
const VOLUMES = ['Under 1M messages / month', '1M – 10M / month', '10M – 50M / month', '50M – 250M / month', 'Over 250M / month', 'Not sure yet'];
const INTERESTS = ['Platform demo', 'Evaluation plan', 'Business plan', 'Enterprise plan', 'Jasmin migration', 'Migration', 'Partnership', 'Other'];

const NEXT = [
  { t: 'We reply within one business day', d: 'A solutions engineer — not a bot — reads every request.' },
  { t: 'Discovery call', d: '30 minutes on your traffic, destinations, carriers and goals.' },
  { t: 'Tailored demo', d: 'Routing, billing and compliance, configured for your business.' },
  { t: 'Guided evaluation', d: 'A proof of concept on your own traffic profile, with a deployment plan.' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

function detailsText(f: Lead) {
  return [
    `Name: ${f.name}`, `Email: ${f.email}`, `Company: ${f.company}`, f.phone && `Phone: ${f.phone}`, f.country && `Country: ${f.country}`,
    f.role && `Organization type: ${f.role}`, f.volume && `Monthly volume: ${f.volume}`, f.interest && `Interested in: ${f.interest}`,
    f.message && `\n${f.message}`,
  ].filter(Boolean).join('\n');
}

export default function Contact() {
  const [form, setForm] = useState<Lead>(EMPTY_LEAD);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [honey, setHoney] = useState('');
  const [params] = useSearchParams();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const plan = params.get('plan');
    const interest = plan ? `${plan} plan` : params.get('interest');
    if (interest && INTERESTS.includes(interest)) setForm(f => ({ ...f, interest }));
  }, [params]);

  const set = (k: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) { setStatus('sent'); return; }
    setStatus('sending');
    try {
      await submitLead(form, pathname + search);
      setStatus('sent');
    } catch (err) {
      if (err instanceof LeadError && err.awaitingActivation) console.warn('Demo form: the form provider is waiting for inbox activation —', err.message);
      setStatus('error');
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(detailsText(form));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field = 'block w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-ink-950 ring-1 ring-ink-200 placeholder:text-ink-400 transition focus:outline-none focus:ring-2 focus:ring-brand-500';
  const label = 'mb-1.5 block text-sm font-medium text-ink-800';

  return (
    <Page>
      <section className="relative overflow-hidden bg-ink-950 pb-24 pt-32 text-white sm:pt-40">
        <DarkBackdrop strong />
        <Container className="relative grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />Request a demo
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              See {SITE.name} on <span className="text-gradient">your own traffic.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              Tell us about your messaging business. We will come back within {SITE.responseTime} with a tailored demo and a deployment plan.
            </p>

            <h2 className="mt-12 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {NEXT.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-600/20 font-display text-sm font-bold text-cyan-300 ring-1 ring-brand-400/40">{i + 1}</span>
                  <div>
                    <div className="font-semibold text-white">{s.t}</div>
                    <div className="text-sm text-ink-300">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${SITE.salesEmail}`} className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
                <Mail className="h-5 w-5 text-cyan-300" aria-hidden />
                <div className="mt-3 text-sm text-ink-300">Sales</div>
                <div className="font-semibold text-white">{SITE.salesEmail}</div>
              </a>
              <a href={`mailto:${SITE.infoEmail}`} className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
                <Mail className="h-5 w-5 text-cyan-300" aria-hidden />
                <div className="mt-3 text-sm text-ink-300">General & support</div>
                <div className="font-semibold text-white">{SITE.infoEmail}</div>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-400" aria-hidden />{SITE.hq.label} · Serving customers worldwide</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-400" aria-hidden />Reply within {SITE.responseTime}</span>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            {status === 'sent' ? (
              <div className="animate-scale-in rounded-3xl bg-white p-8 text-center text-ink-900 shadow-2xl shadow-black/40 sm:p-12" role="status">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                  <CircleCheck className="h-8 w-8 text-emerald-600" aria-hidden />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Request received</h2>
                <p className="mx-auto mt-3 max-w-md text-ink-600">
                  Thank you{form.name ? `, ${form.name.trim().split(/\s+/)[0]}` : ''}. A solutions engineer will reply
                  {form.email ? <> to <strong className="text-ink-900">{form.email}</strong></> : null} within {SITE.responseTime}.
                </p>
                <div className="mt-8 rounded-2xl bg-ink-50 p-5 text-left ring-1 ring-ink-100">
                  <div className="text-sm font-semibold text-ink-900">While you wait</div>
                  <ul className="mt-3 space-y-2">
                    <li><TextLink to="/slides/sales">Flip through the 5-minute sales deck</TextLink></li>
                    <li><TextLink to="/compare">See how we compare</TextLink></li>
                    <li><TextLink to="/platform">Explore the platform</TextLink></li>
                  </ul>
                </div>
                <button type="button" onClick={() => { setStatus('idle'); setForm(EMPTY_LEAD); }} className="mt-6 text-sm font-semibold text-ink-500 hover:text-ink-900">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl bg-white p-6 text-ink-900 shadow-2xl shadow-black/40 sm:p-10">
                <h2 className="text-2xl font-bold">Request a demo</h2>
                <p className="mt-1 text-sm text-ink-500">Takes under a minute. Fields marked * are required.</p>

                {status === 'error' && (
                  <div role="alert" className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-900 ring-1 ring-rose-200">
                    <div className="flex gap-3">
                      <CircleAlert className="h-5 w-5 flex-shrink-0 text-rose-500" aria-hidden />
                      <div>
                        <p className="font-semibold">We could not send your request automatically.</p>
                        <p className="mt-1">Please email us instead — your details are ready to go.</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a href={mailtoHref(form)} className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 font-semibold text-white hover:bg-rose-500">
                            <Mail className="h-4 w-4" aria-hidden />Email {SITE.salesEmail}
                          </a>
                          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-semibold text-rose-900 ring-1 ring-rose-200 hover:bg-rose-100">
                            {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}{copied ? 'Copied' : 'Copy details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="f-name" className={label}>Full name *</label>
                    <input id="f-name" name="name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Jane Doe" className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-email" className={label}>Business email *</label>
                    <input id="f-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-company" className={label}>Company *</label>
                    <input id="f-company" name="company" required autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Acme Telecom" className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className={label}>Phone</label>
                    <input id="f-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+1 212 555 0100" className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-country" className={label}>Country</label>
                    <select id="f-country" name="country" autoComplete="country-name" value={form.country} onChange={set('country')} className={field}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-role" className={label}>Organization type</label>
                    <select id="f-role" name="role" value={form.role} onChange={set('role')} className={field}>
                      <option value="">Select one</option>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-volume" className={label}>Monthly volume</label>
                    <select id="f-volume" name="volume" value={form.volume} onChange={set('volume')} className={field}>
                      <option value="">Select range</option>
                      {VOLUMES.map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-interest" className={label}>I’m interested in</label>
                    <select id="f-interest" name="interest" value={form.interest} onChange={set('interest')} className={field}>
                      <option value="">Select one</option>
                      {INTERESTS.map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-message" className={label}>Tell us about your traffic and goals</label>
                    <textarea id="f-message" name="message" rows={4} value={form.message} onChange={set('message')} className={`${field} resize-y`}
                      placeholder="Destinations, peak traffic, current gateway or provider, deployment preference…" />
                  </div>
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="f-website">Website</label>
                    <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={honey} onChange={e => setHoney(e.target.value)} />
                  </div>
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 disabled:cursor-wait disabled:opacity-70">
                  {status === 'sending' ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
                  {status === 'sending' ? 'Sending…' : 'Request my demo'}
                </button>
                <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-ink-500">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 text-ink-400" aria-hidden />
                  <span>We use these details only to respond to your request. No spam, ever — see our <Link to="/privacy" className="underline hover:text-ink-800">privacy policy</Link>.</span>
                </p>
              </form>
            )}
          </div>
        </Container>
      </section>
    </Page>
  );
}
