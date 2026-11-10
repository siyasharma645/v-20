import { BadgeCheck, CalendarCheck, Clock, ShieldCheck, Star, type LucideIcon } from 'lucide-react';
import { SITE } from '@/data/site';

const items: { text: string; Icon: LucideIcon | 'stars' }[] = [
  { text: `Est. ${SITE.founded}`, Icon: CalendarCheck },
  { text: 'Licensed & Insured', Icon: ShieldCheck },
  { text: '24/7 Emergency', Icon: Clock },
  { text: '1-year Warranty', Icon: BadgeCheck },
  { text: `${SITE.rating.value} Google · 690+ Reviews`, Icon: 'stars' },
];

/**
 * Credibility bar, directly under the hero.
 *  - Desktop (lg+): one row of five equal columns, thin light-pink dividers.
 *  - Phone / tablet: three indicators on the first row, the remaining two centred on the second.
 * Type scales with the viewport so labels stay on one line wherever the screen allows.
 */
export function TrustBar() {
  return (
    <section aria-label="Why customers trust Danika" className="bg-white">
      <ul className="container-x flex flex-wrap justify-center max-sm:!px-2 lg:grid lg:grid-cols-5">
        {items.map(({ text, Icon }, i) => (
          <li
            key={text}
            className={[
              'flex min-w-0 flex-col items-center justify-start gap-1.5 border-brand-100 px-1 py-3 text-center sm:gap-2 sm:py-4 lg:basis-auto lg:justify-center lg:border-l lg:border-t-0 lg:px-2 lg:py-8',
              i < 3 ? 'basis-1/3' : 'basis-1/2 border-t',
              i === 0 ? 'border-l-0 lg:border-l-0' : i === 3 ? 'border-l-0' : 'border-l',
            ].join(' ')}
          >
            {Icon === 'stars' ? (
              <span className="flex h-5 items-center gap-0.5 sm:h-6" role="img" aria-label={`${SITE.rating.value} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 shrink-0 fill-[#F5B301] text-[#F5B301] sm:h-5 sm:w-5" strokeWidth={1.5} aria-hidden />
                ))}
              </span>
            ) : (
              <Icon className="h-5 w-5 shrink-0 text-brand-700 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden />
            )}
            <span className="block text-balance font-heading text-[clamp(0.7rem,3.15vw,1rem)] font-bold leading-tight text-brand-800 min-[360px]:whitespace-nowrap lg:text-[0.95rem] xl:text-[1.05rem]">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
