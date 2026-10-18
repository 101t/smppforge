import { Page } from './Layout';
import { Container } from './ui';

export const LEGAL_UPDATED = 'October 18, 2026';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Page>
      <section className="bg-ink-950 pb-14 pt-32 text-white sm:pt-40">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-ink-300">Last updated: {LEGAL_UPDATED}</p>
        </Container>
      </section>
      <Container className="max-w-3xl py-16">
        <div className="space-y-10 leading-relaxed text-ink-700 [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-950 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </Container>
    </Page>
  );
}
