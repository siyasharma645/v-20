'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowRight, Cable, CircuitBoard, Droplets, Gauge, PlugZap, Power, Search, Siren, Thermometer, ToggleRight, Waves, Zap, type LucideIcon } from 'lucide-react';
import { orig } from '@/data/site';
import { electricalServices, morePlumbing, plumbingServices } from '@/data/services';
import { cn } from '@/lib/utils';

type TabId = 'plumbing' | 'electrical';
type Row = { title: string; href: string; Icon: LucideIcon };

// Every URL comes from the existing service data, so destinations are unchanged.
const hrefOf = (title: string) => [...plumbingServices, ...morePlumbing, ...electricalServices].find((s) => s.title === title)!.href;
const row = (title: string, Icon: LucideIcon): Row => ({ title, href: hrefOf(title), Icon });

const TABS: { id: TabId; label: string; intro: string; rows: Row[]; all: { label: string; href: string } }[] = [
  {
    id: 'plumbing', label: 'Plumbing', intro: 'Diagnosis first, a written price second, then the repair.',
    rows: [
      row('Emergency Plumbing', Siren), row('Drain Cleaning', Droplets), row('Water Heaters', Thermometer),
      row('Sewer Repair', Waves), row('Leak Detection', Search), row('Repiping', Gauge),
    ],
    all: { label: 'All Plumbing Services', href: orig('/plumbing-services/') },
  },
  {
    id: 'electrical', label: 'Electrical', intro: 'Licensed electrical expertise for repairs, upgrades and modern home installations.',
    rows: [
      row('Emergency Electrician', Zap), row('Electrical Repair', CircuitBoard), row('Electrical Panel Upgrades', ToggleRight),
      row('EV Charger Installation', PlugZap), row('Generator Installation', Power), row('Whole-Home Rewiring', Cable),
    ],
    all: { label: 'All Electrical Services', href: orig('/electrician-everett-wa/') },
  },
];

/**
 * One section, one image + content split. Tabs swap the photo, heading, description and the six links.
 * Both panels share one grid cell (the inactive one is invisible), so the section never changes height when switching.
 */
export function ServiceTabs({ media }: { media: Record<TabId, ReactNode> }) {
  const uid = useId();
  const [active, setActive] = useState<TabId>('plumbing');
  const refs = useRef<Record<TabId, HTMLButtonElement | null>>({ plumbing: null, electrical: null });

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = TABS.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    refs.current[TABS[next].id]?.focus();
  }

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate max-lg:bg-brand-950">
      <div className="container-x relative z-10 pb-6 pt-10 sm:pt-12 md:pt-14 lg:pb-14 lg:pt-24">
        <h2 id="services-title" className="h2 max-w-4xl max-lg:!text-white">Plumbing and Electrical, One Call</h2>
        <p className="lead mt-5 max-lg:text-white/85">The leak under the sink and the dead outlet beside it are one call, one dispatcher and one invoice.</p>
      </div>

      <div className="bg-paper max-lg:bg-transparent lg:grid lg:grid-cols-[1.15fr_1fr]">
        {/* Image (≈54%): both photos stacked, cross-fading. Below lg it is a full-section backdrop (positioned against the <section>); from lg up it is the left column. */}
        <div className="absolute inset-0 z-0 lg:relative lg:inset-auto lg:min-h-[36rem]">
          {TABS.map(({ id }) => (
            <div key={id} aria-hidden={active !== id} className={cn('absolute inset-0 transition-opacity duration-300 ease-out', active === id ? 'opacity-100' : 'opacity-0')}>
              {media[id]}
            </div>
          ))}
          {/* Dark burgundy overlay for text contrast (backdrop only on phones/tablets) */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-950/80 via-brand-950/65 to-brand-950/85 lg:hidden" aria-hidden />
        </div>

        {/* Content (≈46%) */}
        <div className="edge-r relative z-10 px-4 pb-14 pt-4 sm:px-6 lg:py-16 lg:pl-14">
          <div role="tablist" aria-label="Service type" onKeyDown={onKeyDown} className="flex items-stretch border-b border-line">
            {TABS.map(({ id, label }, i) => {
              const on = active === id;
              return (
                <div key={id} className="flex items-stretch">
                  {i > 0 && <span role="presentation" aria-hidden className="mx-5 my-3 w-px bg-line sm:mx-7" />}
                  <button
                    ref={(el) => { refs.current[id] = el; }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${id}`}
                    aria-selected={on}
                    aria-controls={`${uid}-panel-${id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(id)}
                    className={cn(
                      '-mb-px inline-flex min-h-[52px] items-center rounded-t-btn border-b-[3px] px-1 text-lg font-bold transition-colors duration-200',
                      on ? 'border-brand-700 text-brand-700 max-lg:border-white max-lg:text-white' : 'border-transparent text-ink-soft hover:border-brand-200 hover:text-brand-700 max-lg:text-white/75 max-lg:hover:border-white/50 max-lg:hover:text-white',
                    )}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid">
            {TABS.map(({ id, label, intro, rows, all }) => {
              const on = active === id;
              return (
                <div
                  key={id}
                  role="tabpanel"
                  id={`${uid}-panel-${id}`}
                  aria-labelledby={`${uid}-tab-${id}`}
                  className={cn('col-start-1 row-start-1 transition-opacity duration-300 ease-out', on ? 'opacity-100' : 'invisible opacity-0')}
                >
                  <h3 className="h2 max-lg:!text-white">{label}</h3>
                  <p className="mt-4 max-w-md text-ink-soft max-lg:text-white/85">{intro}</p>

                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {rows.map(({ title, href, Icon }) => (
                      <li key={title}>
                        <a href={href} className="group flex min-h-[68px] items-center gap-4 py-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-ui border border-transparent bg-brand-50 text-brand-700 transition duration-200 group-hover:border-brand-500/40 group-hover:bg-brand-100 group-focus-visible:border-brand-700 group-focus-visible:bg-brand-700 group-focus-visible:text-white group-active:border-brand-700 group-active:bg-brand-700 group-active:text-white">
                            <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="flex-1 font-heading text-lg font-bold leading-tight text-ink transition-colors group-hover:text-brand-700 max-lg:text-white max-lg:group-hover:text-white sm:text-xl">{title}</span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-brand-700 max-lg:text-white transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <a href={all.href} className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-bold text-brand-700 underline decoration-brand-500 decoration-2 underline-offset-4 hover:text-brand-800 max-lg:text-white max-lg:decoration-white/70 max-lg:hover:text-white">
                    {all.label} <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
