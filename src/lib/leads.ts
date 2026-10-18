/**
 * Demo-request delivery, on free tiers and without a server of our own. First match wins:
 *   1. VITE_WEB3FORMS_KEY  — Web3Forms (free tier, 250 submissions / month). Key from web3forms.com.
 *   2. VITE_FORM_ENDPOINT  — any JSON form endpoint (Formspree, Getform, Basin…).
 *   3. Default             — FormSubmit's AJAX endpoint, mailed to SITE.salesEmail. Free, no account;
 *                            the first submission from the live domain sends an "Activate form" email
 *                            to that inbox, and nothing is delivered until it is clicked.
 */
import { SITE } from '../site';

export interface Lead {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  role: string;
  volume: string;
  interest: string;
  message: string;
}

export const EMPTY_LEAD: Lead = { name: '', email: '', company: '', phone: '', country: '', role: '', volume: '', interest: '', message: '' };

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const FORMSUBMIT = `https://formsubmit.co/ajax/${SITE.salesEmail}`;
const TIMEOUT_MS = 20_000;

export class LeadError extends Error {
  constructor(message: string, readonly awaitingActivation = false) {
    super(message);
  }
}

function payload(lead: Lead, page: string) {
  return {
    name: lead.name.trim(),
    email: lead.email.trim(),
    company: lead.company.trim(),
    phone: lead.phone.trim() || '—',
    country: lead.country || '—',
    'organization type': lead.role || '—',
    'monthly volume': lead.volume || '—',
    interest: lead.interest || '—',
    message: lead.message.trim() || '—',
    page,
  };
}

async function postJson(url: string, body: object): Promise<{ ok: boolean; status: number; json: Record<string, unknown> }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
}

export async function submitLead(lead: Lead, page: string): Promise<void> {
  const subject = `Demo request — ${lead.company.trim()}${lead.country ? ` (${lead.country})` : ''}`;
  const data = payload(lead, page);

  if (WEB3FORMS_KEY) {
    const r = await postJson('https://api.web3forms.com/submit', {
      access_key: WEB3FORMS_KEY, subject, from_name: `${SITE.name} website`, botcheck: '', ...data,
    });
    if (!r.ok || r.json.success !== true) throw new LeadError(String(r.json.message ?? `HTTP ${r.status}`));
    return;
  }

  if (FORM_ENDPOINT) {
    const r = await postJson(FORM_ENDPOINT, { ...data, _subject: subject, _replyto: data.email });
    if (!r.ok) throw new LeadError(`HTTP ${r.status}`);
    return;
  }

  const r = await postJson(FORMSUBMIT, { ...data, _subject: subject, _replyto: data.email, _template: 'table', _captcha: 'false' });
  const message = String(r.json.message ?? `HTTP ${r.status}`);
  if (!r.ok || String(r.json.success) !== 'true') throw new LeadError(message, /activat/i.test(message));
}

/** Pre-filled email with the same details, offered when sending fails. */
export function mailtoHref(lead: Lead): string {
  const body = [
    `Name: ${lead.name}`, `Company: ${lead.company}`, `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`, lead.country && `Country: ${lead.country}`,
    lead.role && `Organization type: ${lead.role}`, lead.volume && `Monthly volume: ${lead.volume}`,
    lead.interest && `Interested in: ${lead.interest}`, '', lead.message,
  ].filter(l => l !== '' && l !== undefined).join('\n');
  return `mailto:${SITE.salesEmail}?subject=${encodeURIComponent(`Demo request — ${lead.company}`)}&body=${encodeURIComponent(body)}`;
}
