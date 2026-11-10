'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '@/data/reviews';
import { SITE, orig } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 7000;

function Stars({ size = 'h-4 w-4' }: { size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${size} fill-brand-700 text-brand-700`} aria-hidden />)}
    </span>
  );
}

/** One review at a time. Tabs switch automatically; hovering or focusing the block pauses it, and reduced-motion users get manual tabs only. */
export function Testimonials() {
  const base = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const on = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Restarts whenever the active review changes, so a manual click always gets a full interval.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % reviews.length), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, reduceMotion]);

  // Keep the active tab visible in the scrollable tab row without moving the page.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[active] as HTMLElement | undefined;
    if (!row || !tab || row.scrollWidth <= row.clientWidth + 1) return;
    const target = tab.offsetLeft - (row.clientWidth - tab.clientWidth) / 2;
    row.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [active, reduceMotion]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = reviews.length - 1;
    let next = active;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    (tabsRef.current?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 id="reviews-title" className="h2">What People Say About Us</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="display text-6xl text-brand-700">{SITE.rating.value}</span>
            <span><Stars size="h-5 w-5" /><span className="mt-1 block text-sm text-ink-soft">{SITE.rating.label} (via Trustindex)</span></span>
          </div>
        </div>

        <div
          className="mt-10 lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
        >
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Customer reviews"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-brand-200 px-4 sm:mx-0 sm:px-0"
          >
            {reviews.map((r, i) => (
              <button
                key={r.job + r.date}
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`${base}-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  '-mb-px min-h-[48px] shrink-0 whitespace-nowrap border-b-4 px-3 font-heading text-base font-bold transition-colors',
                  i === active ? 'border-brand-700 text-brand-700' : 'border-transparent text-ink-soft hover:text-brand-700',
                )}
              >
                {r.job}
              </button>
            ))}
          </div>

          {/* All panels share one grid cell so the block keeps the height of the longest review and nothing jumps. */}
          <div className="mt-8 grid rounded-card border border-line bg-paper p-6 shadow-card sm:p-8 lg:p-10">
            {reviews.map((r, i) => (
              <div
                key={r.job + r.date}
                id={`${base}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${base}-tab-${i}`}
                aria-hidden={i !== active}
                className={cn('col-start-1 row-start-1 transition-opacity duration-300', i === active ? 'opacity-100' : 'invisible opacity-0')}
              >
                <figure className="max-w-4xl">
                  <Stars size="h-5 w-5" />
                  <blockquote className="mt-5 text-xl leading-relaxed sm:text-2xl">&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="mt-6 leading-snug">
                    <strong className="block font-heading text-lg text-brand-700">Verified Google review</strong>
                    <span className="block text-sm text-ink-soft">{r.date}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">Reviews shown as posted by customers on Google.</p>
          <ButtonLink href={orig('/reviews/')} variant="primary">Read our customer reviews</ButtonLink>
        </div>
      </div>
    </section>
  );
}
