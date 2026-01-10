import Header from '@/components/Header';
import Hero3D from '@/components/Hero3D';
import FeaturesSection from '@/components/FeaturesSection';
import ProcessSection from '@/components/ProcessSection';
import CasesSection from '@/components/CasesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import About from '@/components/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <section id="top">
          <Hero3D />
        </section>

        <section id="about">
          <About />
        </section>

        {/* services */}
        <section id="services">
          <FeaturesSection />
        </section>

        {/* work */}
        <section id="work">
          <CasesSection />
        </section>

        {/* steps */}
        <section id="steps">
          <ProcessSection />
        </section>

        {/* contact */}
        <section id="contact">
          <CTASection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;