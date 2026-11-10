import { orig } from './site';

export type NavLink = { label: string; href: string };

export const plumbingNav: NavLink[] = [
  { label: 'Emergency Plumber', href: orig('/24-hour-emergency-plumber-everett-wa/') },
  { label: 'Drain Cleaning', href: orig('/drain-cleaning-everett-wa/') },
  { label: 'Hydro Jetting', href: orig('/hydro-jet-service-everett/') },
  { label: 'Sewer Repair', href: orig('/sewer-repair-everett-wa/') },
  { label: 'Water Heaters', href: orig('/water-heaters-everett-wa/') },
  { label: 'Tankless Water Heaters', href: orig('/tankless-water-heaters-everett-wa/') },
  { label: 'Leak Detection', href: orig('/water-leak-detection-everett-wa/') },
  { label: 'Pipe Repair', href: orig('/pipe-repair-everett/') },
  { label: 'Repiping', href: orig('/repiping-everett-wa/') },
  { label: 'Water Line Repair', href: orig('/water-line-replacement-everett-wa/') },
  { label: 'Gas Line Services', href: orig('/gas-line-installation-everett/') },
  { label: 'Sump Pump Services', href: orig('/sump-pump-repair-installation-everett/') },
  { label: 'French Drain Services', href: orig('/french-drain-installation-everett/') },
  { label: 'Faucets, Showers & Toilets', href: orig('/faucet-installation-repair-everett-wa/') },
  { label: 'Plumbing Remodeling', href: orig('/plumbing-remodeling/') },
  { label: 'Commercial Plumbing', href: orig('/commercial-plumbing-everett/') },
];
export const plumbingAll: NavLink = { label: 'All plumbing services', href: orig('/plumbing-services/') };

export const electricalNav: NavLink[] = [
  { label: 'Electrical Panel Upgrades', href: orig('/electrical-panel-upgrade-services/') },
  { label: 'EV Charger Installation', href: orig('/ev-charger-installation-services/') },
  { label: 'Electrical Repair', href: orig('/electrical-repair-services/') },
  { label: 'Emergency Electrician', href: orig('/emergency-electrician-services/') },
  { label: 'Generator Installation', href: orig('/generator-installation-services/') },
  { label: 'Whole-Home Rewiring', href: orig('/electrical-rewiring-services/') },
  { label: 'Safety Inspections', href: orig('/electrical-safety-inspection-services/') },
  { label: 'Lighting Installation', href: orig('/lighting-installation-everett-wa/') },
];
export const electricalAll: NavLink = { label: 'All electrical services', href: orig('/electrician-everett-wa/') };

export const aboutNav: NavLink[] = [
  { label: 'About Us', href: orig('/about-us/') },
  { label: 'Projects', href: orig('/projects/') },
  { label: 'Reviews', href: orig('/reviews/') },
  { label: 'Plumbing Financing', href: orig('/plumbing-financing/') },
  { label: 'Blog', href: orig('/blog/') },
];

export const topLinks = {
  home: { label: 'Home', href: '/' },
  serviceAreas: { label: 'Service Areas', href: '#service-areas' },
};
