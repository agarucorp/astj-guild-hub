export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-navy-deep border-t border-navy-medium">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <div className="font-display text-2xl font-bold text-primary-foreground mb-1">
              Lista Blanca
            </div>
            <div className="text-primary-foreground/60 text-sm">
              Miembro de ASTJ
            </div>
          </div>
          
          {/* Slogan */}
          <div className="text-accent font-display text-lg italic">
            Aire Claro
          </div>
          
          {/* Copyright */}
          <div className="text-primary-foreground/50 text-sm">
            © {currentYear} Lista Blanca. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
