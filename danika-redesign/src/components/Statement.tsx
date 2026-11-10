import Image from 'next/image';
import { SITE } from '@/data/site';

export function Statement() {
  return (
    <section aria-labelledby="motto-title" className="on-red relative isolate overflow-hidden bg-brand-700 text-white section">
      <Image src="/brand/logo-shield.png" alt="" aria-hidden width={420} height={590} className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[120%] w-auto -translate-y-1/2 opacity-[0.06]" />
      <div className="container-x grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:items-end lg:gap-16">
        <h2 id="motto-title" className="display break-words text-[clamp(2.4rem,9vw,7rem)] !text-white">
          <span className="block">Integrity,</span>
          <span className="block">Professionalism,</span>
          <span className="block">and Quality</span>
        </h2>
        <div className="max-w-sm border-l-4 border-white/70 pl-6">
          <p className="text-lg leading-relaxed text-white/95">
            Most of our work comes from referrals from past clients, something we are proud of and work to maintain.
          </p>
          <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center font-bold text-white underline decoration-brand-200 underline-offset-4 hover:text-brand-100">
            Verify license {SITE.license} on L&I<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
