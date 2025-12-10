import { Target, FileText, MessageSquare } from "lucide-react";

const objectives = [
  {
    icon: Target,
    title: "Defensa Laboral",
    description: "Proteger los derechos adquiridos y trabajar por mejoras en las condiciones de trabajo, salarios y beneficios para todos los miembros del gremio.",
  },
  {
    icon: FileText,
    title: "Negociación Colectiva",
    description: "Representar con firmeza y profesionalismo los intereses de los trabajadores en todas las mesas de negociación con la empresa.",
  },
  {
    icon: MessageSquare,
    title: "Comunicación Efectiva",
    description: "Mantener informados a todos los miembros sobre decisiones, acuerdos y temas relevantes de manera oportuna y transparente.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Sobre Nosotros
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-deep mb-6">
              Una voz firme para nuestro gremio
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Lista Blanca es la candidatura comprometida con los valores fundamentales que deben guiar 
              la representación sindical: honestidad, profesionalismo y cercanía con los trabajadores.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Como miembros de la Asociación Sindical de Trabajadores de Junta (ASTJ), entendemos las 
              necesidades reales de nuestros compañeros y trabajamos incansablemente para garantizar 
              que cada voz sea escuchada.
            </p>
            
            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Compromiso</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Disponibilidad</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Objectives */}
          <div className="space-y-6">
            {objectives.map((objective, index) => (
              <div 
                key={objective.title}
                className="flex gap-6 p-6 rounded-lg bg-background border border-border hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy-deep/10 flex items-center justify-center">
                  <objective.icon className="w-6 h-6 text-navy-deep" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-deep mb-2">
                    {objective.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
