/**
 * Slide decks, written for a non-technical audience: business owners, finance and sales.
 * Every size inside a slide is in container-query units (cqw), so a slide scales as one picture —
 * on screen, in full screen and when printed to PDF.
 */
import { createContext, useContext } from 'react';
import {
  ArrowRight, KeyRound, Truck, CalendarClock, Siren, Coins, Building2, Puzzle, Users, Route, Receipt, PackageCheck,
  ShieldCheck, ChartColumn, Repeat, Copy, Scale, Network, RadioTower, Landmark, HeartPulse, ShoppingCart, Flag, Check, Minus,
  Cloud, Building, Server, Lock, EyeOff, History, Plug, Clock, CircleCheck, Mail, Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SignalFlow } from '../components/Visuals';
import { roadmap, senderRules, regimes, threeWay, type Mark } from '../content';
import { SITE, host } from '../site';

export interface Slide { title: string; dark?: boolean; body: React.ReactNode }
export interface Deck { slug: string; title: string; subtitle: string; slides: Slide[] }

/* ───────── Primitives ───────── */

const Dark = createContext(false);
const useDark = () => useContext(Dark);

export function SlideFrame({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  const dark = !!slide.dark;
  return (
    <Dark.Provider value={dark}>
      <div className={`slide ${dark ? 'bg-ink-950 text-white' : 'bg-white text-ink-950'}`}>
        {dark && (
          <div aria-hidden className="absolute inset-0">
            <div className="bg-grid-dark absolute inset-0 opacity-70" />
            <div className="absolute -left-[10cqw] -top-[20cqw] h-[50cqw] w-[50cqw] rounded-full bg-brand-600/30 blur-[8cqw]" />
            <div className="absolute -bottom-[20cqw] -right-[10cqw] h-[40cqw] w-[40cqw] rounded-full bg-cyan-500/20 blur-[8cqw]" />
          </div>
        )}
        {!dark && <div aria-hidden className="absolute inset-x-0 top-0 h-[0.5cqw] bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-400" />}
        <div className="slide-inner flex flex-col">{slide.body}</div>
        <div className="absolute inset-x-[6cqw] bottom-[2.4cqw] flex items-center justify-between s-small text-ink-400">
          <span className="flex items-center gap-[0.8cqw]">
            <img src="/smppforge-logo.svg" alt="" className="h-[1.8cqw] w-[1.8cqw]" />
            <span className={`font-display font-bold ${dark ? 'text-ink-200' : 'text-ink-700'}`}>{SITE.name}</span>
          </span>
          <span className="tabular-nums">{index + 1} / {total}</span>
        </div>
      </div>
    </Dark.Provider>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className={`s-kicker ${useDark() ? 'text-cyan-300' : 'text-brand-600'}`}>{children}</div>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="s-title mt-[0.9cqw] max-w-[80cqw]">{children}</h2>;
}
function Lead({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <p className={`s-lead mt-[1.4cqw] ${wide ? 'max-w-[84cqw]' : 'max-w-[66cqw]'} ${useDark() ? 'text-ink-200' : 'text-ink-600'}`}>{children}</p>;
}
function Head({ kicker, title, lead, wide }: { kicker: string; title: React.ReactNode; lead?: React.ReactNode; wide?: boolean }) {
  return <div><Kicker>{kicker}</Kicker><Title>{title}</Title>{lead && <Lead wide={wide}>{lead}</Lead>}</div>;
}
function Grad({ children }: { children: React.ReactNode }) {
  return <span className={useDark() ? 'text-gradient' : 'text-gradient-light'}>{children}</span>;
}

function Card({ icon: Icon, title, children, tone = 'default' }: { icon?: LucideIcon; title: string; children?: React.ReactNode; tone?: 'default' | 'rose' }) {
  const dark = useDark();
  const shell = dark ? 'bg-white/[0.05] ring-1 ring-white/10' : tone === 'rose' ? 'bg-rose-50 ring-1 ring-rose-100' : 'bg-ink-50 ring-1 ring-ink-100';
  const ic = dark ? 'bg-white/10 text-cyan-300' : tone === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-brand-100 text-brand-700';
  return (
    <div className={`s-card ${shell}`}>
      {Icon && <div className={`mb-[1.1cqw] flex h-[3.4cqw] w-[3.4cqw] items-center justify-center rounded-[0.9cqw] ${ic}`}><Icon className="h-[1.9cqw] w-[1.9cqw]" aria-hidden /></div>}
      <div className="s-lead font-semibold leading-tight">{title}</div>
      {children && <div className={`s-body mt-[0.5cqw] ${dark ? 'text-ink-300' : 'text-ink-600'}`}>{children}</div>}
    </div>
  );
}
function Cards({ cols, children }: { cols: 2 | 3 | 4 | 5; children: React.ReactNode }) {
  const c = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5' }[cols];
  return <div className={`my-auto grid ${c} s-gap`}>{children}</div>;
}

function Flow() {
  const dark = useDark();
  const box = dark ? 'bg-white/[0.06] ring-1 ring-white/15' : 'bg-ink-50 ring-1 ring-ink-100';
  const sub = dark ? 'text-ink-300' : 'text-ink-500';
  const arrow = <ArrowRight className={`h-[3cqw] w-[3cqw] flex-shrink-0 ${dark ? 'text-cyan-300' : 'text-brand-500'}`} aria-hidden />;
  return (
    <div className="my-auto flex items-stretch gap-[1.6cqw]">
      <div className={`flex-1 s-card ${box}`}>
        <Users className="s-icon text-cyan-300" aria-hidden />
        <div className="s-lead mt-[1cqw] font-semibold">Your customers</div>
        <div className={`s-small mt-[0.4cqw] ${sub}`}>Apps, websites and businesses that need to send texts</div>
      </div>
      <div className="flex items-center">{arrow}</div>
      <div className="flex-[1.3] s-card bg-gradient-to-br from-brand-600 to-cyan-600 text-white shadow-[0_2cqw_5cqw_-1cqw_rgb(31_85_242/0.6)]">
        <img src="/smppforge-logo.svg" alt="" className="s-icon" />
        <div className="s-lead mt-[1cqw] font-bold">{SITE.name}</div>
        <div className="mt-[0.8cqw] flex flex-wrap gap-[0.6cqw]">
          {['Checks', 'Bills', 'Routes', 'Delivers', 'Reports'].map(t => <span key={t} className="s-small rounded-full bg-white/20 px-[0.9cqw] py-[0.2cqw] font-semibold">{t}</span>)}
        </div>
      </div>
      <div className="flex items-center">{arrow}</div>
      <div className={`flex-1 s-card ${box}`}>
        <RadioTower className="s-icon text-cyan-300" aria-hidden />
        <div className="s-lead mt-[1cqw] font-semibold">Mobile networks</div>
        <div className={`s-small mt-[0.4cqw] ${sub}`}>Carriers in every country deliver the text to the phone</div>
      </div>
    </div>
  );
}

function Tick({ ok }: { ok: Mark }) {
  if (ok === true) return <span role="img" aria-label="Yes" className="inline-flex h-[2.2cqw] w-[2.2cqw] items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-[1.3cqw] w-[1.3cqw]" strokeWidth={3} aria-hidden /></span>;
  if (ok === 'partial') return <span role="img" aria-label="Partly" className="inline-flex h-[2.2cqw] w-[2.2cqw] items-center justify-center rounded-full bg-amber-100"><span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-amber-500" /></span>;
  return <span role="img" aria-label="No" className="inline-flex h-[2.2cqw] w-[2.2cqw] items-center justify-center rounded-full bg-ink-100 text-ink-400"><Minus className="h-[1.3cqw] w-[1.3cqw]" strokeWidth={3} aria-hidden /></span>;
}

function Contact() {
  const dark = useDark();
  return (
    <div className={`mt-[2cqw] flex flex-wrap items-center gap-x-[3cqw] gap-y-[1cqw] s-body ${dark ? 'text-ink-200' : 'text-ink-700'}`}>
      <span className="flex items-center gap-[0.8cqw]"><Mail className="h-[1.8cqw] w-[1.8cqw] text-cyan-400" aria-hidden />{SITE.salesEmail}</span>
      <span className="flex items-center gap-[0.8cqw]"><Globe className="h-[1.8cqw] w-[1.8cqw] text-cyan-400" aria-hidden />{host}/contact</span>
    </div>
  );
}

function Cover({ kicker, title, lead }: { kicker: string; title: React.ReactNode; lead: string }) {
  return (
    <div className="grid h-full grid-cols-[1.05fr_0.95fr] items-center gap-[3cqw]">
      <div>
        <div className="flex items-center gap-[1cqw]">
          <img src="/smppforge-logo.svg" alt="" className="h-[4.4cqw] w-[4.4cqw]" />
          <span className="font-display text-[2.4cqw] font-bold">{SITE.name}</span>
        </div>
        <div className="mt-[4cqw]"><Kicker>{kicker}</Kicker></div>
        <div className="s-hero mt-[1.2cqw]">{title}</div>
        <p className="s-lead mt-[2cqw] text-ink-200">{lead}</p>
        <Contact />
      </div>
      <div className="opacity-95"><SignalFlow /></div>
    </div>
  );
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

/* ───────── Sales deck ───────── */

const sales: Slide[] = [
  {
    title: 'Own your SMS business', dark: true,
    body: <Cover kicker="Why SMPP Forge" title={<>Own your <span className="text-gradient">SMS business.</span></>}
      lead="The software that lets you run a professional text-messaging service — on your own terms, with no fee on every message." />,
  },
  {
    title: 'Texts still run the world',
    body: <>
      <Head kicker="The opportunity" title={<>Text messages still <Grad>run the world.</Grad></>}
        lead="Businesses send billions of texts every day, because a text reaches every phone — no app, no internet, no sign-up needed." />
      <Cards cols={4}>
        <Card icon={KeyRound} title="Login codes">“Your code is 482 913”</Card>
        <Card icon={Truck} title="Delivery updates">“Your parcel arrives today”</Card>
        <Card icon={CalendarClock} title="Reminders">“See you tomorrow at 10:00”</Card>
        <Card icon={Siren} title="Urgent alerts">“Severe weather warning”</Card>
      </Cards>
    </>,
  },
  {
    title: 'The problem',
    body: <>
      <Head kicker="The problem" title="Someone else takes a cut — or leaves you to build it all." />
      <Cards cols={3}>
        <Card tone="rose" icon={Coins} title="A fee on every message">Hosted platforms add a markup to each text. At 10 million texts a month, half a cent is $50,000 — every month.</Card>
        <Card tone="rose" icon={Building2} title="You don’t own the business">Your routes, prices, customer data and know-how live on someone else’s platform.</Card>
        <Card tone="rose" icon={Puzzle} title="“Free” software isn’t free">Open-source gateways leave you to build billing, a control panel and compliance yourself.</Card>
      </Cards>
    </>,
  },
  {
    title: 'The solution', dark: true,
    body: <>
      <Head kicker="The solution" title={<>One product that runs your <Grad>whole messaging business.</Grad></>}
        lead={`${SITE.name} sits between your customers and the mobile networks — and takes care of everything in between, on your own servers.`} />
      <Flow />
    </>,
  },
  {
    title: 'What it does',
    body: <>
      <Head kicker="What it does" title="Six jobs, done automatically." />
      <Cards cols={3}>
        <Card icon={Users} title="Connects your customers">They send from their apps, websites or the portal.</Card>
        <Card icon={Route} title="Finds the best route">The cheapest network that delivers well, every time.</Card>
        <Card icon={Receipt} title="Bills automatically">Charges each text, sends invoices, handles refunds.</Card>
        <Card icon={PackageCheck} title="Never loses a text">Saved the moment it arrives, delivered once.</Card>
        <Card icon={ShieldCheck} title="Keeps you compliant">Blocks fake senders, respects consent and quiet hours.</Card>
        <Card icon={ChartColumn} title="Shows you everything">Live traffic, delivery, revenue and profit.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Where the money is', dark: true,
    body: <>
      <Head kicker="The economics" title={<>Keep the margin <Grad>you’re paying away today.</Grad></>}
        lead="A hosted platform’s fee of half a cent per text looks small — until you multiply it by your volume." />
      <div className="my-auto grid grid-cols-3 s-gap">
        {[1_000_000, 10_000_000, 50_000_000].map(v => (
          <div key={v} className="s-card bg-white/[0.05] ring-1 ring-white/10">
            <div className="s-small text-ink-300">{(v / 1_000_000).toLocaleString('en-US')} million texts a month</div>
            <div className="s-num mt-[1cqw] text-gradient">{usd(v * 0.005 * 12)}</div>
            <div className="s-small mt-[0.6cqw] text-ink-300">in platform fees a year, kept by you</div>
          </div>
        ))}
      </div>
      <p className="s-small mt-[1.4cqw] text-ink-400">Illustrative, at $0.005 per message. Carrier costs apply either way — compare with your license quote.</p>
    </>,
  },
  {
    title: 'Built so nothing goes wrong',
    body: <>
      <Head kicker="Reliability" title="Built so nothing slips through the cracks."
        lead="Every text is money and trust. These four promises hold even when a network fails or a server restarts." />
      <Cards cols={4}>
        <Card icon={PackageCheck} title="Saved instantly">Each text is stored the moment it arrives.</Card>
        <Card icon={Repeat} title="Rerouted automatically">If a network fails, the next one takes over.</Card>
        <Card icon={Copy} title="Sent once, never twice">No duplicate texts — even after a restart.</Card>
        <Card icon={Scale} title="Refunded exactly once">Balances and invoices always add up.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Who it is for',
    body: <>
      <Head kicker="Who it’s for" title="Any business that sends, sells or carries texts." />
      <Cards cols={3}>
        <Card icon={Network} title="Text resellers & aggregators">Sell messaging to hundreds of business customers.</Card>
        <Card icon={RadioTower} title="Mobile operators">Earn from — and protect — business traffic.</Card>
        <Card icon={Landmark} title="Banks & fintech">Login codes and alerts that must always arrive.</Card>
        <Card icon={HeartPulse} title="Healthcare">Appointment reminders that cut no-shows.</Card>
        <Card icon={ShoppingCart} title="Online businesses">Order, delivery and marketing messages.</Card>
        <Card icon={Flag} title="Government">Citizen notices and emergency alerts.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Why choose SMPP Forge',
    body: <>
      <Head kicker="The choice" title={<>The best of both worlds. <Grad>No trade-offs.</Grad></>} />
      <div className="my-auto overflow-hidden rounded-[1.2cqw] ring-1 ring-ink-100">
        <table className="w-full s-small">
          <thead>
            <tr className="bg-ink-50 text-left">
              <th className="px-[1.6cqw] py-[1cqw] font-semibold text-ink-500">What matters</th>
              <th className="w-[15cqw] px-[1cqw] py-[1cqw] text-center font-semibold text-ink-700">Hosted platforms</th>
              <th className="w-[15cqw] px-[1cqw] py-[1cqw] text-center font-semibold text-ink-700">Free software</th>
              <th className="w-[15cqw] bg-brand-600 px-[1cqw] py-[1cqw] text-center font-semibold text-white">{SITE.name}</th>
            </tr>
          </thead>
          <tbody>
            {threeWay.slice(0, 6).map(r => (
              <tr key={r.label} className="border-t border-ink-100">
                <td className="px-[1.6cqw] py-[0.85cqw] font-medium text-ink-800">{r.label}</td>
                <td className="text-center"><Tick ok={r.cpaas} /></td>
                <td className="text-center"><Tick ok={r.oss} /></td>
                <td className="bg-brand-50 text-center"><Tick ok={r.forge} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>,
  },
  {
    title: 'Switching is easy', dark: true,
    body: <>
      <Head kicker="Getting started" title={<>Live in about <Grad>five weeks.</Grad></>}
        lead="Run it next to what you have today and move over step by step. Already on Jasmin? Your customers won’t notice the switch." />
      <div className="my-auto grid grid-cols-4 s-gap">
        {[
          ['Week 1', 'Try it', 'Set up and test safely — no real texts sent.'],
          ['Weeks 2–4', 'Run side by side', 'Move part of your traffic and compare.'],
          ['Week 5', 'Switch over', 'Move the rest, with our team alongside.'],
          ['Ongoing', 'Grow', 'Add customers, routes and markets.'],
        ].map(([when, what, d], i) => (
          <div key={what} className="s-card bg-white/[0.05] ring-1 ring-white/10">
            <div className="flex items-center gap-[0.8cqw]">
              <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-brand-600 font-display s-small font-bold">{i + 1}</span>
              <span className="s-kicker text-cyan-300">{when}</span>
            </div>
            <div className="s-body mt-[1cqw] font-semibold">{what}</div>
            <div className="s-small mt-[0.3cqw] text-ink-300">{d}</div>
          </div>
        ))}
      </div>
    </>,
  },
  {
    title: 'Simple plans',
    body: <>
      <Head kicker="Plans" title="Simple licensing. No fee on every message." />
      <div className="my-auto grid grid-cols-3 s-gap">
        {[
          { t: 'Evaluation', p: 'Guided trial', items: ['Try it on your traffic', 'Safe test mode', 'An engineer alongside you'] },
          { t: 'Business', p: 'Annual license', items: ['Everything included', 'Business-hours support', 'All updates'], hi: true },
          { t: 'Enterprise', p: 'Custom agreement', items: ['24×7 support', 'Hands-on setup and migration', 'A say in the roadmap'] },
        ].map(c => (
          <div key={c.t} className={`s-card ${c.hi ? 'bg-ink-950 text-white ring-2 ring-brand-500' : 'bg-ink-50 ring-1 ring-ink-100'}`}>
            <div className="s-lead font-bold">{c.t}</div>
            <div className={`s-body font-semibold ${c.hi ? 'text-cyan-300' : 'text-brand-600'}`}>{c.p}</div>
            <ul className="mt-[1cqw] space-y-[0.5cqw]">
              {c.items.map(i => <li key={i} className={`flex items-center gap-[0.6cqw] s-small ${c.hi ? 'text-ink-200' : 'text-ink-700'}`}><CircleCheck className="h-[1.5cqw] w-[1.5cqw] flex-shrink-0 text-emerald-500" aria-hidden />{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </>,
  },
  {
    title: 'Next step', dark: true,
    body: <>
      <Head kicker="Next step" title={<>Let’s see it <Grad>on your traffic.</Grad></>}
        lead={`Tell us about your business and we will reply within ${SITE.responseTime} with a tailored demo.`} />
      <div className="my-auto grid grid-cols-3 s-gap">
        {[['1', 'Book a demo', 'A 30-minute call about your goals.'], ['2', 'Try it', 'A guided trial on your own traffic.'], ['3', 'Go live', 'Launch with our team alongside you.']].map(([n, t, d]) => (
          <div key={n} className="s-card bg-white/[0.05] ring-1 ring-white/10">
            <div className="s-num text-gradient">{n}</div>
            <div className="s-body mt-[0.8cqw] font-semibold">{t}</div>
            <div className="s-small text-ink-300">{d}</div>
          </div>
        ))}
      </div>
      <Contact />
    </>,
  },
];

/* ───────── Company overview deck ───────── */

const overview: Slide[] = [
  {
    title: 'SMS infrastructure you own', dark: true,
    body: <Cover kicker="Company overview" title={<>SMS infrastructure <span className="text-gradient">you own.</span></>}
      lead={`${SITE.name} builds the software behind professional text-messaging services — for operators, resellers and enterprises worldwide.`} />,
  },
  {
    title: 'In one sentence',
    body: <>
      <Kicker>In one sentence</Kicker>
      <p className="my-auto font-display text-[3.4cqw] font-semibold leading-[1.25] tracking-tight text-ink-950">
        “{SITE.name} lets any business run its own professional text-messaging service —
        <span className="text-gradient-light"> connecting customers, choosing the best mobile network, billing every message
        and following the rules in every country</span> — on servers it controls.”
      </p>
    </>,
  },
  {
    title: 'Why now',
    body: <>
      <Head kicker="Why now" title="Three shifts are changing business texting." />
      <Cards cols={3}>
        <Card icon={KeyRound} title="Texting is mission-critical">Login codes, payments and alerts depend on texts arriving — every time.</Card>
        <Card icon={ShieldCheck} title="Rules are getting stricter">Spain, India, Singapore and Australia now require registered sender names.</Card>
        <Card icon={Coins} title="Platform fees keep adding up">Growing businesses want to own their margin, data and customer relationships.</Card>
      </Cards>
    </>,
  },
  {
    title: 'How it works', dark: true,
    body: <>
      <Head kicker="How it works" title={<>Simple on the outside, <Grad>carrier-grade inside.</Grad></>}
        lead="Customers send. SMPP Forge checks, bills and routes each text. Mobile networks deliver it — and the result comes straight back." />
      <Flow />
    </>,
  },
  {
    title: 'Five jobs, one product',
    body: <>
      <Head kicker="The product" title="Five jobs, one product." lead="Everything a messaging business needs, without stitching tools together." />
      <Cards cols={5}>
        <Card icon={Plug} title="Connect">Customers send by app, website or direct link.</Card>
        <Card icon={Route} title="Route">The best network for every number.</Card>
        <Card icon={Receipt} title="Bill">Prices, invoices and refunds — automatic.</Card>
        <Card icon={ShieldCheck} title="Protect">Fake senders blocked, rules enforced.</Card>
        <Card icon={ChartColumn} title="Report">Traffic, delivery and profit, live.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Built for trust',
    body: <>
      <Head kicker="Trust" title="Your data never leaves your hands." lead="SMPP Forge runs on your servers. We never see your texts, your customers or their phone numbers." />
      <Cards cols={4}>
        <Card icon={Server} title="Your servers">Your cloud or your data center.</Card>
        <Card icon={EyeOff} title="Private by default">Phone numbers hidden in logs.</Card>
        <Card icon={Lock} title="Secure sign-in">Two-step sign-in and roles.</Card>
        <Card icon={History} title="Full history">Every change recorded.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Rules in every market',
    body: <>
      <Head kicker="Compliance" title="Every country has its own texting rules." lead="We track them, so our customers don’t get blocked — or fined." />
      <div className="my-auto grid grid-cols-4 gap-[1cqw]">
        {senderRules.map(r => (
          <div key={r.market} className="rounded-[1cqw] bg-ink-50 px-[1.4cqw] py-[1.1cqw] ring-1 ring-ink-100">
            <div className="s-body font-semibold">{r.market}</div>
            <span className={`mt-[0.6cqw] inline-block rounded-full px-[0.9cqw] py-[0.2cqw] text-[1cqw] font-semibold ring-1 ${regimes[r.regime].cls}`}>{regimes[r.regime].label}</span>
          </div>
        ))}
      </div>
    </>,
  },
  {
    title: 'Runs anywhere', dark: true,
    body: <>
      <Head kicker="Deployment" title={<>Runs wherever <Grad>our customers need it.</Grad></>} />
      <Cards cols={3}>
        <Card icon={Cloud} title="Amazon Web Services">In the customer’s own account and region. Marketplace listing coming soon.</Card>
        <Card icon={Building} title="Private cloud">Any cloud provider the customer already trusts.</Card>
        <Card icon={Server} title="On-premise">Inside their own data center — even fully isolated.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Who we serve',
    body: <>
      <Head kicker="Customers" title="Built for the businesses that keep the world texting." />
      <Cards cols={4}>
        <Card icon={Network} title="Aggregators">Resell texting to business customers.</Card>
        <Card icon={RadioTower} title="Operators & MVNOs">Earn from business traffic.</Card>
        <Card icon={Building2} title="Enterprises">Own their login codes and alerts.</Card>
        <Card icon={Landmark} title="Regulated industries">Banks, healthcare, government.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Roadmap',
    body: <>
      <Head kicker="Roadmap" title="What ships today — and what’s next." />
      <div className="my-auto grid grid-cols-2 s-gap">
        <div className="s-card bg-emerald-50 ring-1 ring-emerald-100">
          <div className="flex items-center gap-[0.8cqw] s-lead font-bold text-emerald-700"><CircleCheck className="h-[2cqw] w-[2cqw]" aria-hidden />Available today</div>
          <ul className="mt-[1.2cqw] space-y-[0.6cqw]">{roadmap.available.slice(0, 6).map(r => <li key={r} className="s-body text-ink-700">• {r}</li>)}</ul>
        </div>
        <div className="s-card bg-amber-50 ring-1 ring-amber-100">
          <div className="flex items-center gap-[0.8cqw] s-lead font-bold text-amber-700"><Clock className="h-[2cqw] w-[2cqw]" aria-hidden />Coming next</div>
          <ul className="mt-[1.2cqw] space-y-[0.6cqw]">{roadmap.next.map(r => <li key={r} className="s-body text-ink-700">• {r}</li>)}</ul>
        </div>
      </div>
    </>,
  },
  {
    title: 'How we work',
    body: <>
      <Head kicker="Business model" title={<>Licensed per deployment — <Grad>not per message.</Grad></>}
        lead="Customers pay a predictable license and choose their level of support. Their costs stay flat while their volume grows." />
      <Cards cols={3}>
        <Card icon={PackageCheck} title="1 · Evaluate">A guided trial on the customer’s own traffic.</Card>
        <Card icon={Receipt} title="2 · License">An annual license for each deployment.</Card>
        <Card icon={Users} title="3 · Support">Business-hours or 24×7, with our team alongside.</Card>
      </Cards>
    </>,
  },
  {
    title: 'Let’s talk', dark: true,
    body: <>
      <Head kicker="Let’s talk" title={<>Questions, demos, <Grad>partnerships.</Grad></>}
        lead={`Headquartered in ${SITE.hq.city}, serving messaging businesses worldwide. We reply within ${SITE.responseTime}.`} />
      <Cards cols={3}>
        <Card icon={PackageCheck} title="See a demo">On your own traffic profile — {SITE.salesEmail}</Card>
        <Card icon={Network} title="Partner with us">Resellers, integrators and cloud consultancies.</Card>
        <Card icon={Mail} title="Everything else">Questions and support — {SITE.infoEmail}</Card>
      </Cards>
      <Contact />
    </>,
  },
];

export const DECKS: Record<string, Deck> = {
  sales: { slug: 'sales', title: `Why ${SITE.name}`, subtitle: 'Sales deck', slides: sales },
  overview: { slug: 'overview', title: 'Company overview', subtitle: 'Overview deck', slides: overview },
};
