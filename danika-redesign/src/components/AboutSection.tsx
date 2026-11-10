import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SITE, orig } from '@/data/site';
import { LOGO } from '@/lib/brand';
import { ButtonLink } from '@/components/ui/Button';

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-red section bg-brand-700 text-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Official logo on the brand red */}
        <div className="flex justify-center lg:col-span-5">
          <Image
            src={LOGO.full.src}
            alt={LOGO.full.alt}
            width={LOGO.full.width}
            height={LOGO.full.height}
            loading="lazy"
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="h-auto w-full max-w-[26rem] lg:max-w-none"
          />
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow !text-brand-100 before:!bg-white">About the company</p>
          <h2 id="about-title" className="h2 text-white">Locally Grown in Everett, Washington</h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/90">
            Danika Plumbing & Electric is a locally grown company based in Everett. It was established in {SITE.founded} and taken over by Frank Gaborik in 2016.
            We offer a full range of plumbing and electrical services, with emergency plumbing on call 24 hours a day.
          </p>
          <p className="mt-6 max-w-xl border-l-4 border-white/70 pl-4 text-sm leading-relaxed text-white/90">
            <strong className="font-heading text-base text-white">Check us, then check anyone else.</strong>{' '}
            Washington State L&I license <strong className="text-white">{SITE.license}</strong>. Bonded & insured.{' '}
            <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 font-bold text-white underline decoration-brand-200 underline-offset-4 hover:text-brand-100">
              Verify on L&I <ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
          <div className="mt-8 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <ButtonLink href={orig('/about-us/')} variant="light">Read our full story <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
            <a href={orig('/plumbing-financing/')} className="inline-flex min-h-[44px] items-center font-bold text-white underline decoration-brand-200 decoration-2 underline-offset-4 hover:text-brand-100">Plumbing financing</a>
          </div>
        </div>
      </div>
    </section>
  );
}
