import { Shield, Scale, Users, Eye } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integridad",
    description: "Actuamos con honestidad y rectitud en cada decisión, manteniendo los más altos estándares éticos.",
  },
  {
    icon: Scale,
    title: "Justicia",
    description: "Defendemos los derechos laborales con equidad, garantizando un trato justo para todos los trabajadores.",
  },
  {
    icon: Users,
    title: "Unidad",
    description: "Juntos somos más fuertes. La solidaridad entre compañeros es la base de nuestro éxito colectivo.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description: "Comunicamos de manera clara y abierta, sin ocultar información relevante para nuestros miembros.",
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-sky-gradient">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            Nuestra Misión
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-deep mb-6">
            Por una representación digna y efectiva
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Lista Blanca nace del compromiso de un grupo de profesionales dedicados a defender 
            los intereses de los trabajadores con claridad, determinación y responsabilidad. 
            Creemos en un sindicalismo moderno, transparente y cercano a las personas.
          </p>
        </div>
        
        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="group p-8 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-navy-deep flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <value.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-deep mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
