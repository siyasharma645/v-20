import { Check } from 'lucide-react';
import { processSteps } from '@/data/services';
import { SITE, orig } from '@/data/site';
import { Timeline } from '@/components/Timeline';

const reasons = [
  { title: 'A local company.', text: `Our shop is at ${SITE.address.street} in Everett, not a regional dispatch center.`, link: { href: orig('/about-us/'), label: 'About our company' } },
  { title: 'A written price before work starts.', text: 'No scripted upsell. If a cheaper repair will hold, you will hear about it.' },
  { title: 'One-year parts and labor warranty.', text: 'We stand behind our work and the products we install.' },
  { title: 'Emergency plumbing, 24/7.', text: 'Available 24 hours a day, 7 days a week, across our whole service area.' },
  { title: 'Plumbing and electrical in-house.', text: 'One call, one dispatcher and one invoice.' },
];

export function WhyChooseUs() {
  return (
    <section id="why-danika" aria-labelledby="why-title" className="section bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why people call us a second time</p>
          <h2 id="why-title" className="h2">Why Everett Homeowners Choose Danika Plumbing & Electric</h2>
          {/* Red highlight panel: five consistently sized trust points */}
          <ul className="on-red mt-10 divide-y divide-brand-500 rounded-card bg-brand-700 px-6 py-2 text-white shadow-lift sm:px-8">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4 py-5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-brand-700"><Check className="h-4 w-4" strokeWidth={3} aria-hidden /></span>
                <div>
                  <p className="text-base leading-snug"><strong className="font-heading text-lg text-white">{r.title}</strong> <span className="text-white/85">{r.text}</span></p>
                  {r.link && <a href={r.link.href} className="mt-1 inline-flex min-h-[44px] items-center text-sm font-bold text-white underline decoration-brand-200 underline-offset-4 hover:text-brand-100">{r.link.label}</a>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">The Danika way</p>
          <h3 className="h3 mb-10 lg:mb-12">From your first call to finished work</h3>
          <Timeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
