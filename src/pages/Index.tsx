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
        <Hero3D />
          <About />
        <FeaturesSection />
        
        <CasesSection />
        <ProcessSection />
      
        <CTASection />
         
      </main>

      <Footer />
    </div>
  );
};

export default Index;
