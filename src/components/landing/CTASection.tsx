import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-navy-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Tu voz importa
          </h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed mb-10">
            Únete a Lista Blanca y sé parte del cambio que nuestro gremio necesita. 
            Juntos construimos un futuro laboral más justo y transparente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group">
              Más información
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-12 pt-12 border-t border-primary-foreground/10">
            <p className="text-primary-foreground/60 text-sm">
              Miembro oficial de la Asociación Sindical de Trabajadores de Junta (ASTJ)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
