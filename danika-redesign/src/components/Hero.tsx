import { SITE } from '@/data/site';
import { HeroVideo, HeroVideoToggle } from '@/components/HeroVideo';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-red relative isolate bg-brand-950 text-white">
      {/* Background video: stacked above the text on phones, full-bleed behind it from lg up. Burgundy gradient keeps the headline readable. */}
      <div className="relative h-32 sm:h-44 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent lg:bg-gradient-to-r lg:from-brand-950/95 lg:via-brand-950/60 lg:to-brand-950/10" aria-hidden />
      </div>

      <div className="container-x relative -mt-12 pb-6 pt-0 sm:-mt-14 sm:pb-8 lg:mt-0 lg:py-16">
        <HeroVideoToggle className="absolute -top-14 right-4 sm:right-6 lg:bottom-6 lg:right-8 lg:top-auto" />
        <div className="max-w-xl lg:max-w-2xl">
          <h1 id="hero-title" className="h1 rise !text-white !text-[clamp(1.875rem,8.2vw,2.75rem)] !leading-[1.02] sm:!text-[clamp(2.75rem,6.2vw,3.5rem)] lg:!text-[clamp(3.25rem,4.6vw,4.5rem)]">
            <span className="block">Powering Your Home.</span>
            <span className="block">Keeping Things Flowing.</span>
          </h1>
          <p className="rise mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-white/85 sm:mt-4 sm:text-base lg:max-w-xl lg:text-[1.0625rem]" style={{ animationDelay: '.08s' }}>
            Your trusted local experts for dependable plumbing and electrical services in Everett, WA. Serving Snohomish County and North King County since {SITE.founded}.
          </p>
        </div>
      </div>
    </section>
  );
}
