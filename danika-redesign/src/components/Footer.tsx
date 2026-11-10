import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { electricalAll, electricalNav, plumbingAll, plumbingNav } from '@/data/nav';
import { snohomishCounty } from '@/data/areas';
import { SITE, orig } from '@/data/site';
import Image from 'next/image';
import { LOGO } from '@/lib/brand';
import { HelpTrigger } from '@/components/help/HelpProvider';

const social = [
  { href: SITE.social.facebook, label: 'Facebook', icon: Facebook },
  { href: SITE.social.instagram, label: 'Instagram', icon: Instagram },
  { href: SITE.social.twitter, label: 'X (Twitter)', icon: Twitter },
  { href: SITE.social.youtube, label: 'YouTube', icon: Youtube },
];

const link = 'inline-flex min-h-[44px] items-center text-sm text-white/85 transition-colors hover:text-brand-100 sm:min-h-[34px]';
/** Column title: a hairline rule separates it from its links so each column reads as a unit. */
const heading = 'border-b border-brand-500 pb-3 font-heading text-lg font-bold !text-white';

export function Footer() {
  return (
    <footer className="on-red bg-brand-800 pb-28 pt-14 text-white/85 sm:pt-16 md:pb-10 lg:pt-20">
      <div className="container-x">
        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-block" aria-label={`${SITE.name} home`}>
              <Image src={LOGO.full.src} alt={LOGO.full.alt} width={LOGO.full.width} height={LOGO.full.height} loading="lazy" sizes="240px" className="h-auto w-56" />
            </a>
            <p className="mt-4 max-w-xs text-sm text-white/85">{SITE.tagline}</p>
            <address className="mt-5 space-y-2.5 text-sm not-italic">
              <p className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" aria-hidden />{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.postal}</p>
              <p><a href={SITE.phoneHref} className="flex items-center gap-2.5 font-semibold text-white hover:text-brand-100"><Phone className="h-4 w-4 text-brand-200" aria-hidden />{SITE.phone}</a></p>
              <p><a href={`mailto:${SITE.email}`} className="flex min-h-[44px] items-center gap-2.5 hover:text-white sm:min-h-0"><Mail className="h-4 w-4 text-brand-200" aria-hidden />{SITE.email}</a></p>
            </address>
            <ul className="mt-5 flex gap-2">
              {social.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full bg-brand-700 transition hover:bg-white hover:text-brand-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Plumbing services">
            <h2 className={heading}>Plumbing</h2>
            <ul className="mt-2">
              {plumbingNav.slice(0, 10).map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
              <li><a href={plumbingAll.href} className={`${link} !font-semibold !text-white underline decoration-brand-500 underline-offset-4`}>{plumbingAll.label} →</a></li>
            </ul>
          </nav>

          <nav aria-label="Electrical services">
            <h2 className={heading}>Electrical</h2>
            <ul className="mt-2">
              {electricalNav.map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
              <li><a href={electricalAll.href} className={`${link} !font-semibold !text-white underline decoration-brand-500 underline-offset-4`}>{electricalAll.label} →</a></li>
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Company</h2>
            <ul className="mt-2">
              {[['About Us', '/about-us/'], ['Reviews', '/reviews/'], ['Projects', '/projects/'], ['Plumbing Financing', '/plumbing-financing/'], ['Blog', '/blog/'], ['Contact Us', '/contact-us/']].map(([l, p]) => (
                <li key={l}>{l === 'Contact Us' ? <HelpTrigger type="message" className={link}>{l}</HelpTrigger> : <a href={orig(p)} className={link}>{l}</a>}</li>
              ))}
            </ul>
            <h2 className={`${heading} mt-8`}>Service Areas</h2>
            <ul className="mt-2">
              {snohomishCounty.slice(0, 6).map((a) => <li key={a.name}><a href={a.href} className={link}>{a.name}</a></li>)}
              <li><a href={orig('/service-area/')} className={`${link} !font-semibold !text-white underline decoration-brand-500 underline-offset-4`}>All 25 cities →</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-500 pt-6 text-sm text-white/85 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · WA contractor license{' '}
            <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline-offset-4 hover:underline">{SITE.license}</a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li><a href={orig('/reviews/')} className="inline-flex min-h-[44px] items-center hover:text-brand-100 md:min-h-0">Reviews</a></li>
            <li><a href={orig('/privacy-policy/')} className="inline-flex min-h-[44px] items-center hover:text-brand-100 md:min-h-0">Privacy Policy</a></li>
            <li><a href={orig('/terms-conditions/')} className="inline-flex min-h-[44px] items-center hover:text-brand-100 md:min-h-0">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
