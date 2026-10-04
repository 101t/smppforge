import { SiteNav, SiteFooter } from './Chrome';

export const LEGAL_UPDATED = '3 October 2026';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <title>{`${title} — SMPP Forge`}</title>
      <SiteNav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: {LEGAL_UPDATED}</p>
        <div className="space-y-8 text-gray-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p+p]:mt-3 [&_a]:text-indigo-600 [&_a]:underline">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
