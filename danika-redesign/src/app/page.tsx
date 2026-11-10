import { Hero } from '@/components/Hero';
import { QuickRequest } from '@/components/QuickRequest';
import { TrustBar } from '@/components/TrustBar';
import { ServiceTabs } from '@/components/ServiceTabs';
import { StockImage } from '@/components/StockImage';
import { Statement } from '@/components/Statement';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Testimonials } from '@/components/Testimonials';
import { ServiceAreas } from '@/components/ServiceAreas';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { JsonLd } from '@/components/JsonLd';

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <TrustBar />
      <QuickRequest />
      <ServiceTabs
        media={{
          plumbing: <StockImage slot="plumberUnderSink" sizes="(min-width: 1024px) 54vw, 100vw" position="center 60%" />,
          electrical: <StockImage slot="electricianWiring" sizes="(min-width: 1024px) 54vw, 100vw" position="center 40%" />,
        }}
      />
      <Statement />
      <WhyChooseUs />
      <ProjectsSection />
      <AboutSection />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
