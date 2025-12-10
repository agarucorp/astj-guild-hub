import { useState } from "react";
import emailjs from "@emailjs/browser";
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

// Configuración de EmailJS - Reemplaza estos valores con tus credenciales
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

// Mapeo de valores del select a nombres legibles para el subject
const temaLabels: Record<string, string> = {
  "roles": "Roles",
  "fatiga": "Fatiga",
  "sugerencias": "Sugerencias",
  "denuncias": "Denuncias",
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
      // Verificar que las credenciales estén configuradas
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error("Las credenciales de EmailJS no están configuradas. Por favor, configura las variables de entorno.");
      }

      // Inicializar EmailJS con la clave pública
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Obtener el nombre legible del tema para el subject
      const temaLabel = temaLabels[formData.tema] || formData.tema;

      // Preparar los parámetros del template - solo tema y mensaje como solicitado
      const templateParams = {
        tema: temaLabel, // Nombre legible del tema (ej: "Derechos laborales")
        mensaje: formData.mensaje, // Mensaje completo del usuario
        // Parámetros adicionales opcionales para el template
        fecha: new Date().toLocaleString("es-ES"),
        subject: `Nuevo reporte de ${temaLabel}`,
      };

      // Log para debugging (puedes removerlo en producción)
      console.log("Enviando formulario con parámetros:", {
        tema: templateParams.tema,
        mensaje: templateParams.mensaje.substring(0, 50) + "...", // Solo primeros 50 caracteres para no saturar el log
      });

      // Enviar el email a EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email enviado exitosamente:", response);

      // Éxito
      setSubmitStatus("success");
      setFormData({
        tema: "",
        mensaje: "",
      });
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus("error");
      
      // Resetear el estado de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
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
              <span className="font-semibold text-accent"> Toda la información que nos proporciones es 100% confidencial</span> y será tratada con el máximo respeto y discreción.
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
                  ¡Gracias por tu mensaje!
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
        </div>
      </div>
    </section>
  );
}
