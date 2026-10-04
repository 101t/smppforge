import { LegalPage } from '../components/Legal';
import { SITE } from '../site';

export default function Terms() {
  return (
    <LegalPage title="Terms of use">
      <section>
        <h2>1. Scope</h2>
        <p>These terms govern your use of this website ({SITE.url}). Use of the {SITE.name} software itself is governed by the licence agreement or order form you sign with us, or by the end-user licence agreement of the marketplace you buy through; if they conflict with these terms, that agreement prevails.</p>
      </section>
      <section>
        <h2>2. Website content</h2>
        <p>Content on this site — including product descriptions, performance figures, comparisons and presentations — is provided for general information. Performance figures describe the stated test conditions; results in your environment depend on hardware, network, carriers and configuration. Comparisons with third-party products reflect publicly available information at the time of writing and may not reflect their current versions.</p>
      </section>
      <section>
        <h2>3. Intellectual property</h2>
        <p>The {SITE.name} name, logo, software, text and graphics on this site are owned by us or our licensors. You may view and print pages, and share our presentations unmodified for evaluating {SITE.name}. Any other reproduction requires our written permission. Third-party names are trademarks of their respective owners and are used only to identify their products.</p>
      </section>
      <section>
        <h2>4. Acceptable use</h2>
        <p>Do not attempt to disrupt the site, access it by automated means that impose unreasonable load, or use it to send unsolicited communications.</p>
      </section>
      <section>
        <h2>5. No warranty; limitation of liability</h2>
        <p>This website is provided &quot;as is&quot; without warranties of any kind. To the extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of the site. Nothing in these terms limits liability that cannot be limited by law.</p>
      </section>
      <section>
        <h2>6. Contact</h2>
        <p>Questions about these terms: <a href={`mailto:${SITE.infoEmail}`}>{SITE.infoEmail}</a>. Licensing and commercial questions: <a href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a>.</p>
      </section>
    </LegalPage>
  );
}
