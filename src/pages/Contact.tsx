import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Send, Building2, Mail, Phone, User, Globe,
  MessageSquare, Shield, AlertCircle, Sparkles,
} from 'lucide-react';
import { SiteNav, SiteFooter } from '../components/Chrome';
import { SITE } from '../site';

/** Optional form backend (e.g. Formspree). Without it the form opens the visitor's mail client. */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh',
  'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Czech Republic', 'Denmark', 'Egypt',
  'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia', 'Iraq',
  'Ireland', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Lebanon', 'Libya', 'Malaysia',
  'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Saudi Arabia', 'Singapore',
  'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Vietnam', 'Other',
];

const ROLES = ['Mobile network operator / MVNO', 'SMS aggregator / hub', 'Enterprise messaging platform', 'Reseller / system integrator', 'Other'];

const benefits = [
  'Live walkthrough of routing, billing and the operator console',
  'Your traffic profile: TPS, destinations, carriers and SMPP versions',
  'Migration plan if you run Jasmin, Kannel or another gateway today',
  'Deployment options on AWS, private cloud or on-premise',
];

interface LeadForm {
  name: string; email: string; company: string; phone: string; country: string; role: string; message: string;
}
const EMPTY: LeadForm = { name: '', email: '', company: '', phone: '', country: '', role: '', message: '' };

function mailtoHref(f: LeadForm): string {
  const body = [
    `Name: ${f.name}`, `Company: ${f.company}`, `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`, f.country && `Country: ${f.country}`, f.role && `Organisation type: ${f.role}`,
    '', f.message,
  ].filter(l => l !== '' && l !== undefined).join('\n');
  return `mailto:${SITE.salesEmail}?subject=${encodeURIComponent(`Demo request — ${f.company}`)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [form, setForm] = useState<LeadForm>(EMPTY);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const set = (k: keyof LeadForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      window.location.href = mailtoHref(form);
      setState('mailto');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Demo request — ${form.company}` }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  };

  const input = 'w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all text-sm';
  const label = 'block text-sm font-medium text-gray-700 mb-1.5';
  const icon = 'absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400';
  const ready = form.name && form.email && form.company;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <title>Request a demo — SMPP Forge</title>
      <SiteNav />
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> Talk to an engineer, not a script
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              See SMPP Forge on <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">your traffic</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-lg">
              Tell us about your messaging business. We will come back within one business day with a tailored demo and a deployment proposal.
            </p>
          </div>
          <div className="bg-white/70 rounded-2xl border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">What we will cover</h2>
            <ul className="space-y-3">
              {benefits.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <a href={`mailto:${SITE.salesEmail}`} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-indigo-200">
              <div className="font-semibold text-gray-900">Sales</div><div className="text-indigo-600">{SITE.salesEmail}</div>
            </a>
            <a href={`mailto:${SITE.infoEmail}`} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-indigo-200">
              <div className="font-semibold text-gray-900">General enquiries</div><div className="text-indigo-600">{SITE.infoEmail}</div>
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-gray-400" />
            <span>No obligation · Guided proof of concept · Reply within one business day</span>
          </div>
        </div>

        <div>
          {state === 'sent' || state === 'mailto' ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center animate-scale-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{state === 'sent' ? 'Request received' : 'Almost there'}</h2>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
                {state === 'sent'
                  ? <>Thank you, {form.name.split(' ')[0]}. Our team will contact you at <strong className="text-gray-900">{form.email}</strong> within one business day.</>
                  : <>Your email app should have opened a pre-filled message to <strong className="text-gray-900">{SITE.salesEmail}</strong> — just press send. If nothing opened, email us directly.</>}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700">
                  Back to home <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => { setState('idle'); setForm(EMPTY); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200">
                  New request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Request a demo</h2>
              <p className="text-gray-500 text-sm mb-8">Fields marked * are required.</p>
              {state === 'error' && (
                <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p>We could not send your request. Please email <a className="underline" href={mailtoHref(form)}>{SITE.salesEmail}</a> instead.</p>
                </div>
              )}
              <div className="space-y-5">
                <div>
                  <label htmlFor="f-name" className={label}>Full name *</label>
                  <div className="relative"><User className={icon} /><input id="f-name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Jane Doe" className={input} /></div>
                </div>
                <div>
                  <label htmlFor="f-email" className={label}>Business email *</label>
                  <div className="relative"><Mail className={icon} /><input id="f-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" className={input} /></div>
                </div>
                <div>
                  <label htmlFor="f-company" className={label}>Company *</label>
                  <div className="relative"><Building2 className={icon} /><input id="f-company" required autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Acme Telecom" className={input} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f-phone" className={label}>Phone</label>
                    <div className="relative"><Phone className={icon} /><input id="f-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" className={input} /></div>
                  </div>
                  <div>
                    <label htmlFor="f-country" className={label}>Country</label>
                    <div className="relative"><Globe className={icon} />
                      <select id="f-country" value={form.country} onChange={set('country')} className={`${input} appearance-none`}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="f-role" className={label}>Organisation type</label>
                  <div className="relative"><Building2 className={icon} />
                    <select id="f-role" value={form.role} onChange={set('role')} className={`${input} appearance-none`}>
                      <option value="">Select one</option>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="f-message" className={label}>Traffic and requirements</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea id="f-message" rows={4} value={form.message} onChange={set('message')} className={`${input} resize-none`}
                      placeholder="Monthly volume, peak TPS, destinations, current gateway, deployment preference…" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={!ready || state === 'sending'}
                className={`mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all ${ready && state !== 'sending' ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                <Send className="w-5 h-5" /> {state === 'sending' ? 'Sending…' : 'Request a demo'}
              </button>
              <p className="mt-4 text-center text-xs text-gray-400 leading-relaxed">
                We use these details only to respond to your request — see our <Link to="/privacy" className="underline hover:text-gray-600">privacy policy</Link>.
              </p>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
