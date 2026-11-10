import { Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import { HelpTrigger } from '@/components/help/HelpProvider';

/** Fixed bottom call-to-action on phones/small tablets. Hidden from md up. */
export function MobileCallBar() {
  return (
    <div className="float-cta fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-2.5 shadow-[0_-8px_24px_-12px_rgba(111,0,7,.22)] backdrop-blur md:hidden" style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-lg gap-2.5">
        <a href={SITE.phoneHref} className="flex min-h-[52px] flex-[1.4] items-center justify-center gap-2 rounded-btn bg-brand-700 text-base font-bold text-white active:bg-brand-800">
          <Phone className="h-5 w-5" aria-hidden /> Call Now
        </a>
        <HelpTrigger type="quote" className="flex min-h-[52px] flex-1 items-center justify-center rounded-btn border-2 border-brand-700 bg-white text-base font-bold text-brand-700 active:bg-brand-100">
          Get a Quote
        </HelpTrigger>
      </div>
    </div>
  );
}
