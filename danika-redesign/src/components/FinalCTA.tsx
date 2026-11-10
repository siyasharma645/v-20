import { BadgeCheck, Clock, Home, Mail, MapPin, Phone, ShieldCheck, Siren, Star, type LucideIcon } from 'lucide-react';
import { SITE } from '@/data/site';
import { QuoteForm } from '@/components/QuoteForm';
import { ContactVisibility } from '@/components/ContactVisibility';
import { buttonClasses } from '@/components/ui/Button';

const TRUST: { Icon: LucideIcon; text: string }[] = [
  { Icon: Home, text: `Locally owned in Everett since ${SITE.founded}` },
  { Icon: ShieldCheck, text: 'Licensed, bonded and insured' },
  { Icon: Clock, text: '24/7 emergency plumbing' },
  { Icon: Star, text: `${SITE.rating.value} Google rating with 690+ reviews` },
  { Icon: BadgeCheck, text: 'One-year parts and labor warranty' },
];

/** One row of the info column: fixed-size icon tile + text, so every row aligns. */
function Row({ Icon, children }: { Icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4 py-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-ui border border-white/20 bg-white/10 text-white"><Icon className="h-5 w-5" aria-hidden /></span>
      <span className="text-[0.95rem] leading-snug text-white/95">{children}</span>
    </li>
  );
}

const link = 'underline-offset-4 hover:underline';

export function FinalCTA() {
  const { street, city, region, postal } = SITE.address;
  return (
    <section id="quote" aria-labelledby="cta-title" className="on-red bg-brand-800 py-16 text-white lg:py-20">
      <ContactVisibility targetId="quote" />
      <div className="container-x grid items-start gap-8 lg:grid-cols-[34fr_66fr] lg:gap-10">
        {/* LEFT: company information and direct contact */}
        <div className="lg:sticky lg:top-28">
          <h2 id="cta-title" className="h3-compact !text-white">Need Plumbing or Electrical Help?</h2>
          <p className="mt-4 text-[1.0625rem] text-white/90">Your local Everett experts are here to help. Tell us what you need, and our team will help you find the right service.</p>

          <div className="mt-8">
            <a href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`} className="inline-flex items-center gap-3 text-white">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-ui bg-white text-brand-700"><Phone className="h-6 w-6" aria-hidden /></span>
              <span className="display whitespace-nowrap text-[clamp(2.25rem,1.5rem+2.4vw,3rem)] leading-none">{SITE.phone}</span>
            </a>
            <a href={SITE.phoneHref} className={buttonClasses('light', 'md', 'mt-5 w-full sm:w-auto')}>
              <Phone className="h-5 w-5" aria-hidden /> Call Now
            </a>
          </div>

          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {TRUST.map(({ Icon, text }) => <Row key={text} Icon={Icon}>{text}</Row>)}
          </ul>
          <ul className="divide-y divide-white/15 border-b border-white/15">
            <Row Icon={MapPin}>
              <a href={SITE.directions} target="_blank" rel="noopener noreferrer" className={link}>{street}, {city}, {region} {postal}<span className="sr-only"> (opens directions in a new tab)</span></a>
            </Row>
            <Row Icon={Mail}><a href={`mailto:${SITE.email}`} className={`${link} break-all`}>{SITE.email}</a></Row>
          </ul>
        </div>

        {/* RIGHT: quote request */}
        <div>
          <div className="rounded-ui bg-white p-7 text-ink shadow-lift sm:p-9">
            <h3 className="h3-compact">Request a Quote</h3>
            <p className="mb-8 mt-3 max-w-xl text-ink-soft">Tell us what&rsquo;s going on, and our team will get in touch to help you with the next steps. Fields marked * are required.</p>
            <QuoteForm />
          </div>

          <aside aria-label="Emergency contact" className="mt-6 flex flex-col gap-4 rounded-ui border border-white/25 bg-brand-950/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-ui bg-white/10"><Siren className="h-5 w-5" aria-hidden /></span>
              <p className="text-[0.95rem] leading-snug">
                <strong className="font-bold">Need emergency plumbing assistance? Danika offers 24/7 emergency plumbing support.</strong>
                <span className="mt-1 block text-white/85">For urgent emergencies, please call rather than waiting for a form response.</span>
              </p>
            </div>
            <a href={SITE.phoneHref} className={buttonClasses('light', 'md', 'shrink-0')}>
              Call Now · {SITE.phone}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
