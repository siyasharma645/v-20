import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { kingCounty, snohomishCounty, type Area } from '@/data/areas';
import { SITE, orig } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';

function County({ title, areas }: { title: string; areas: Area[] }) {
  return (
    <div>
      <h3 className="border-b-2 border-brand-700 pb-2 font-heading text-xl font-bold text-brand-700">{title}</h3>
      <ul className="mt-2 columns-2 gap-6 sm:columns-3 lg:columns-2 xl:columns-3">
        {areas.map((a) => (
          <li key={a.name} className="break-inside-avoid">
            <a
              href={a.href}
              className={`inline-flex min-h-[44px] max-w-full flex-wrap items-center gap-x-1.5 hover:text-brand-700 hover:underline ${a.name === 'Everett' ? 'font-heading text-lg font-extrabold text-brand-700' : 'font-semibold'}`}
            >
              {a.name === 'Everett' && <MapPin className="h-4 w-4" aria-hidden />}
              {a.name}
              {a.name === 'Everett' && <span className="ml-1 whitespace-nowrap rounded bg-brand-700 px-2 py-0.5 text-xs font-bold text-white">Home base</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceAreas() {
  return (
    <section id="service-areas" aria-labelledby="areas-title" className="section bg-paper">
      <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Where the trucks go</p>
          <h2 id="areas-title" className="h2">Our Service Area: Snohomish County and King County</h2>
          <p className="lead mt-5">Our plumbers work from Everett north to Arlington, east to Monroe, and south through Lynnwood and Bothell into Seattle and the Eastside.</p>

          <div className="mt-9 space-y-8">
            <County title="Snohomish County Cities We Serve" areas={snohomishCounty} />
            <County title="King County and Seattle Neighborhoods We Serve" areas={kingCounty} />
          </div>

          <p className="mt-8 rounded-field border border-line border-l-4 border-l-brand-700 bg-white px-4 py-3 text-[0.95rem] font-medium">
            Emergency plumbing is available across the whole service area. If your town is not listed, call and ask.
          </p>
          <div className="mt-6"><ButtonLink href={orig('/service-area/')} variant="primary">See all 25 cities we serve <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink></div>
        </div>

        <div className="self-start lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
          <div className="aspect-[4/3] bg-brand-50 lg:aspect-[5/4]">
            <iframe
              title="Map showing Danika Plumbing & Electric at 11015 Airport Road, Everett, WA"
              src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-4 border-t-4 border-brand-700 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <address className="text-sm not-italic leading-relaxed text-ink-soft">
              <strong className="block text-base text-brand-700">Head office, Everett</strong>
              {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
            </address>
            <ButtonLink href={SITE.directions} target="_blank" rel="noopener noreferrer" variant="secondary">
              <Navigation className="h-4 w-4" aria-hidden /> Get directions<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
