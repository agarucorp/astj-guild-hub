import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

// Mapeo de valores del select a nombres legibles
const temaLabels: Record<string, string> = {
  "roles": "Roles",
  "fatiga": "Fatiga",
  "sugerencias": "Sugerencias",
  "denuncias": "Denuncias",
  "dudas": "Dudas",
  "otro": "Otro",
};

export function CTASection() {
  const [formData, setFormData] = useState({
    tema: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      const temaLabel = temaLabels[formData.tema] || formData.tema;

      const { error } = await supabase
        .from("inquietudes")
        .insert([
          {
            tema: temaLabel,
            mensaje: formData.mensaje,
          },
        ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({ tema: "", mensaje: "" });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error al guardar la inquietud:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="inquietudes" className="py-24 lg:py-32 bg-navy-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Queremos conocer tus inquietudes
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Tu opinión es fundamental para nosotros. Completa el formulario a continuación y comparte con nosotros tus dudas, sugerencias o preocupaciones. 
              <span className="font-semibold text-accent"> Todas las inquietudes son 100% anónimas</span> y podrás ver las de todos los agremiados. 
              La idea nuestra es presentarlas a la empresa de forma mensual para abordar los problemas y trabajar en conjunto en la mejora de nuestras condiciones laborales.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-primary-foreground/10">
            <div className="space-y-2">
              <Label htmlFor="tema" className="text-primary-foreground">
                Tema de consulta
              </Label>
              <Select
                value={formData.tema}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, tema: value }))}
                required
              >
                <SelectTrigger className="bg-background/90 text-foreground">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roles">Roles</SelectItem>
                  <SelectItem value="fatiga">Fatiga</SelectItem>
                  <SelectItem value="sugerencias">Sugerencias</SelectItem>
                  <SelectItem value="denuncias">Denuncias</SelectItem>
                  <SelectItem value="dudas">Dudas</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje" className="text-primary-foreground">
                Mensaje
              </Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={6}
                className="bg-background/90 text-foreground resize-none"
              />
            </div>

            <div className="flex flex-col items-center pt-4 space-y-4">
              {submitStatus === "success" && (
                <div className="w-full p-4 bg-emerald-600/20 border border-emerald-500/60 rounded-lg text-emerald-300 text-center font-medium">
                  <p>¡Gracias por tu mensaje! Tu inquietud ha sido registrada.</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="w-full p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.
                </div>
              )}
              <Button 
                type="submit" 
                variant="hero" 
                size="xl"
                className="w-full sm:w-auto"
                disabled={isLoading || !formData.tema || !formData.mensaje.trim()}
              >
                {isLoading ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 flex justify-center">
            <Link to="/inquietudes">
              <Button
                type="button"
                variant="hero-outline"
                size="xl"
              >
                Ver inquietudes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
