import "@/App.css";
import { ReactLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Quote } from "@/components/site/Quote";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-gold selection:text-black">
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <WhyUs />
          <Testimonials />
          <Quote />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
        <Toaster position="top-center" theme="dark" richColors />
      </div>
    </ReactLenis>
  );
}

export default App;
