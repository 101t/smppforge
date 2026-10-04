import { LegalPage } from '../components/Legal';
import { SITE } from '../site';

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy">
      <section>
        <h2>1. Who we are</h2>
        <p>
          {SITE.name} (&quot;we&quot;, &quot;us&quot;) provides self-hosted SMS gateway software. This policy explains how we
          handle personal data collected through this website ({SITE.url}) and when you contact us. Questions:{' '}
          <a href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a>.
        </p>
      </section>
      <section>
        <h2>2. What we collect</h2>
        <ul>
          <li><strong>Enquiries.</strong> When you request a demo or email us: your name, business email, company, and — if you choose to give them — phone number, country, organisation type and the details in your message.</li>
          <li><strong>Technical data.</strong> This website is static and sets no cookies and runs no analytics or advertising trackers. Our hosting provider processes standard request data (such as IP address and browser type) to serve and secure the site.</li>
        </ul>
      </section>
      <section>
        <h2>3. How we use it</h2>
        <ul>
          <li>To respond to your enquiry, arrange demonstrations and prepare proposals.</li>
          <li>To manage the commercial relationship if you become a customer.</li>
          <li>To meet legal, tax and accounting obligations.</li>
        </ul>
        <p>Our legal basis is our legitimate interest in responding to business enquiries, or steps you ask us to take before entering a contract. We do not sell personal data and do not use it for automated decision-making.</p>
      </section>
      <section>
        <h2>4. Who we share it with</h2>
        <p>Only with service providers that help us operate — our website host, email provider and, where enabled, a form-processing service — under terms that protect your data, or where the law requires it. Some providers may process data outside your country; where they do, we rely on appropriate safeguards such as standard contractual clauses.</p>
      </section>
      <section>
        <h2>5. Retention</h2>
        <p>We keep enquiry data for up to 24 months after our last contact, unless you become a customer, in which case contract and billing records are kept for the periods required by law.</p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>Depending on where you live, you may have the right to access, correct, delete or export your personal data, to object to or restrict processing, and to complain to your data-protection authority. Email <a href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a> and we will respond within 30 days.</p>
      </section>
      <section>
        <h2>7. Data processed by the {SITE.name} software</h2>
        <p>{SITE.name} runs in infrastructure you control. Messages, subscriber numbers and account data handled by your gateway stay in your environment and are not sent to us. For that data, you are the controller; we only access it if you grant us access for support, under the terms of your agreement with us.</p>
      </section>
      <section>
        <h2>8. Changes</h2>
        <p>We may update this policy. The date at the top shows the latest revision; material changes will be highlighted on this page.</p>
      </section>
    </LegalPage>
  );
}
