import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToMission = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInquietudes = () => {
    document.getElementById("inquietudes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-deep/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="animate-fade-up-delay-1 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
            Lista Blanca
          </h1>
          
          {/* Slogan */}
          <p className="animate-fade-up-delay-2 text-2xl md:text-3xl lg:text-4xl text-accent font-display italic mb-8">
            Aire Claro
          </p>
          
          {/* Description */}
          <p className="animate-fade-up-delay-3 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Comprometidos con la transparencia, la integridad y la defensa de los derechos de nuestros compañeros. 
            Unidos por un objetivo común.
          </p>
          
          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={scrollToMission}>
              Conocer nuestra misión
            </Button>
            <Button variant="hero-outline" size="xl" onClick={scrollToInquietudes}>
              Inquietudes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
