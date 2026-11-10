'use client';

import { useId, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { electricalFaqs, faqs, type FaqCategory } from '@/data/faqs';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

const tabs: { id: FaqCategory; label: string }[] = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
];

export function FAQ() {
  const base = useId();
  const [category, setCategory] = useState<FaqCategory>('plumbing');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const list = category === 'plumbing' ? faqs : electricalFaqs;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-white">
      <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Asked on the phone every week" title={<span id="faq-title">Plumbing and Electrical Questions from Everett Homeowners</span>}>
            Straight answers about emergencies, pricing, water heaters, older pipes and electrical work.
          </SectionHeading>
          <div className="on-red mt-8 rounded-card bg-brand-700 p-6 text-white shadow-lift">
            <p className="font-heading text-lg font-bold">Still have a question?</p>
            <p className="mt-1 text-sm text-white/90">A person at our Everett office answers, day or night.</p>
            <ButtonLink href={SITE.phoneHref} variant="light" className="mt-5 w-full sm:w-auto"><Phone className="h-4 w-4" aria-hidden /> {SITE.phone}</ButtonLink>
          </div>
        </div>

        <div>
          <div role="group" aria-label="Question category" className="mb-5 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={category === t.id}
                onClick={() => { setCategory(t.id); setOpenIndex(0); }}
                className={cn('min-h-[44px] flex-1 rounded-btn border-2 px-5 font-heading text-lg font-bold transition-colors sm:flex-none sm:min-w-[9rem]', category === t.id ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-700 bg-white text-brand-700 hover:bg-brand-50')}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {list.map((f, i) => {
              const open = openIndex === i;
              const btnId = `${base}-${category}-q${i}`;
              const panelId = `${base}-${category}-a${i}`;
              return (
                <div key={f.q} className={cn('overflow-hidden rounded-card border bg-white transition-colors duration-200', open ? 'border-brand-700 shadow-card' : 'border-line hover:border-brand-500')}>
                  <h3>
                    <button
                      id={btnId} type="button" aria-expanded={open} aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg font-bold leading-snug text-ink transition-colors hover:text-brand-700"
                    >
                      <span>{f.q}</span>
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-200', open ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700')}>
                        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 pr-14 text-[0.98rem] leading-relaxed text-ink-soft sm:pr-16" inert={!open}>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
