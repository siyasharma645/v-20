'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X, Mail, MapPin, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import Image from 'next/image';
import { LOGO } from '@/lib/brand';
import { MobileNavigation } from '@/components/MobileNavigation';

/** Home: on the homepage it smooth-scrolls to the very top (instant for reduced-motion users); elsewhere it is a normal link to "/". */
export function HomeLink({ className, children, onNavigate, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { onNavigate?: () => void }) {
  return (
    <a
      href="/"
      className={className}
      {...rest}
      onClick={(e) => {
        onNavigate?.();
        if (window.location.pathname !== '/') return;
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
      }}
    >
      {children}
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onDown = (e: MouseEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[70] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-700">Skip to content</a>
      <div className="on-red hidden bg-brand-800 text-[0.8rem] text-white/85 lg:block">
        <div className="container-x flex items-center justify-between py-2">
          <p className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand-200" aria-hidden />{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}</span>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-4 w-4 text-brand-200" aria-hidden />{SITE.email}</a>
          </p>
          <p className="inline-flex items-center gap-1.5 font-semibold text-white"><Clock className="h-4 w-4 text-brand-200" aria-hidden />24/7 emergency plumbing</p>
        </div>
      </div>

      {/* Header: Logo | Call Danika | Hamburger. Sticky, so it stays reachable from every section. */}
      <header ref={headerRef} className="on-red sticky top-0 z-50 border-b border-brand-500/60 bg-brand-700 text-white shadow-[0_6px_20px_-12px_rgba(58,0,4,.6)]">
        <div className="container-x flex h-[64px] items-center justify-between gap-3 sm:h-[72px] lg:h-[84px]">
          <HomeLink aria-label={`${SITE.name} home`} className="shrink-0">
            <Image src={LOGO.wordmark.src} alt={LOGO.wordmark.alt} width={LOGO.wordmark.width} height={LOGO.wordmark.height} priority sizes="150px" className="h-[40px] w-auto sm:h-[52px] lg:h-[64px]" />
          </HomeLink>

          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <a href={SITE.phoneHref} className="flex shrink-0 items-center gap-2 rounded-btn sm:gap-2.5 sm:px-1 sm:py-1" aria-label={`Call Danika ${SITE.phone}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand-700 sm:h-10 sm:w-10"><Phone className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden /></span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-wider text-brand-100 sm:text-[0.7rem]">Call Danika</span>
                <span className="block whitespace-nowrap text-[0.85rem] font-bold text-white sm:text-base lg:text-lg">{SITE.phone}</span>
              </span>
            </a>
            <button
              type="button"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-btn border-2 border-white/60 text-white transition-colors hover:bg-white/10"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
        <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
