import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { UrgencyMarquee } from '@/components/urgency-marquee'
import { Services } from '@/components/services'
import { Stats } from '@/components/stats'
import { WhyUs } from '@/components/why-us'
import { Gallery } from '@/components/gallery'
import { ConversionBand } from '@/components/conversion-band'
import { Process } from '@/components/process'
import { Testimonials } from '@/components/testimonials'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppFAB } from '@/components/whatsapp-fab'
import { BackToTop } from '@/components/back-to-top'
import { MobileStickyFooter } from '@/components/mobile-sticky-footer'
import { ExitIntentModal } from '@/components/exit-intent-modal'
import { ScrollBottomBanner } from '@/components/scroll-bottom-banner'

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <UrgencyMarquee />
        <Services />
        <Stats />
        <WhyUs />
        <Gallery />
        <ConversionBand />
        <Process />
        <Testimonials />
        <About />
        <Contact />
        <Footer />
        <WhatsAppFAB />
        <BackToTop />
        <MobileStickyFooter />
      </main>
      <ExitIntentModal />
      <ScrollBottomBanner />
    </>
  )
}
