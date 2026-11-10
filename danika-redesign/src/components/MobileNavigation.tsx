'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { aboutNav, electricalAll, electricalNav, plumbingAll, plumbingNav, topLinks, type NavLink } from '@/data/nav';
import { cn } from '@/lib/utils';
import { HomeLink } from '@/components/Header';

function Group({ id, label, links, all, onNavigate }: { id: string; label: string; links: NavLink[]; all?: NavLink; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-between text-left text-lg font-bold text-brand-700"
        aria-expanded={open}
        aria-controls={`m-${id}`}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
      </button>
      <div id={`m-${id}`} className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <ul className="pb-3" inert={!open}>
            {[...links, ...(all ? [all] : [])].map((l) => (
              <li key={l.href + l.label}>
                <a href={l.href} onClick={onNavigate} className="flex min-h-[44px] items-center rounded-btn px-3 text-[0.95rem] font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Hamburger dropdown, used at every screen size. Rendered inside the sticky header so it always sits right under it. */
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="site-menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        'absolute right-0 top-full z-50 max-h-[calc(100dvh-5rem)] w-full overflow-y-auto overscroll-contain rounded-b-card border border-t-0 border-line bg-white text-ink shadow-lift transition-[opacity,transform,visibility] duration-300 ease-out sm:right-6 sm:w-[22rem] sm:rounded-card lg:right-8',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0',
      )}
    >
      <nav aria-label="Main menu" className="px-5 pb-3 pt-1">
        <HomeLink onNavigate={onClose} className="flex min-h-[56px] items-center border-b border-line text-lg font-bold text-brand-700">{topLinks.home.label}</HomeLink>
        <Group id="plumbing" label="Plumbing" links={plumbingNav} all={plumbingAll} onNavigate={onClose} />
        <Group id="electrical" label="Electrical" links={electricalNav} all={electricalAll} onNavigate={onClose} />
        <Group id="about" label="About" links={aboutNav} onNavigate={onClose} />
        <a href={topLinks.serviceAreas.href} onClick={onClose} className="flex min-h-[56px] items-center text-lg font-bold text-brand-700">{topLinks.serviceAreas.label}</a>
      </nav>
    </div>
  );
}
