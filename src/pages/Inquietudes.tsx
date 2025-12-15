import { useState, useEffect, useMemo } from "react";
import { supabase, type Inquietud } from "@/lib/supabase";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const temaLabels: Record<string, string> = {
  "roles": "Roles",
  "fatiga": "Fatiga",
  "sugerencias": "Sugerencias",
  "denuncias": "Denuncias",
  "dudas": "Dudas",
  "otro": "Otro",
};

const ITEMS_PER_PAGE = 10;

const Inquietudes = () => {
  const [inquietudes, setInquietudes] = useState<Inquietud[]>([]);
  const [filteredInquietudes, setFilteredInquietudes] = useState<Inquietud[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll al inicio cuando se carga la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    fetchInquietudes();

    // Suscripción en tiempo real para nuevas inquietudes
    const channel = supabase
      .channel('inquietudes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'inquietudes',
        },
        (payload) => {
          console.log('Nueva inquietud recibida:', payload.new);
          // Agregar la nueva inquietud al inicio de la lista
          setInquietudes((prev) => [payload.new as Inquietud, ...prev]);
        }
      )
      .subscribe();

    // Limpiar suscripción al desmontar
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterInquietudes();
    setCurrentPage(1); // Resetear a la primera página cuando cambia el filtro
  }, [selectedFilter, inquietudes]);

  // Calcular las inquietudes paginadas
  const paginatedInquietudes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredInquietudes.slice(startIndex, endIndex);
  }, [filteredInquietudes, currentPage]);

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredInquietudes.length / ITEMS_PER_PAGE);

  const fetchInquietudes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("inquietudes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setInquietudes(data || []);
      setError(null);
    } catch (err: any) {
      console.error("Error al cargar inquietudes:", err);
      setError(err.message || "Error al cargar las inquietudes");
    } finally {
      setIsLoading(false);
    }
  };

  const filterInquietudes = () => {
    if (selectedFilter === "todos") {
      setFilteredInquietudes(inquietudes);
    } else {
      const temaLabel = temaLabels[selectedFilter] || selectedFilter;
      setFilteredInquietudes(
        inquietudes.filter((inq) => inq.tema === temaLabel)
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24 lg:py-32 bg-navy-gradient relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Inquietudes
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                Aquí puedes ver todas las inquietudes que han sido compartidas con nosotros.
              </p>
            </div>

            {/* Filtro */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-auto">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="bg-background/90 text-foreground w-full sm:w-[200px]">
                    <SelectValue placeholder="Filtrar por tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los temas</SelectItem>
                    <SelectItem value="roles">Roles</SelectItem>
                    <SelectItem value="fatiga">Fatiga</SelectItem>
                    <SelectItem value="sugerencias">Sugerencias</SelectItem>
                    <SelectItem value="denuncias">Denuncias</SelectItem>
                    <SelectItem value="dudas">Dudas</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-primary-foreground/60 text-sm text-center sm:text-right">
                {filteredInquietudes.length} {filteredInquietudes.length === 1 ? "inquietud" : "inquietudes"}
                {totalPages > 1 && (
                  <span className="ml-2">
                    (Página {currentPage} de {totalPages})
                  </span>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="bg-red-500/20 border-red-500/50">
                <CardContent className="pt-6">
                  <p className="text-red-400 text-center">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Lista de Inquietudes */}
            {!isLoading && !error && (
              <>
                <div className="space-y-4 mb-8">
                  {paginatedInquietudes.length === 0 ? (
                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <p className="text-center text-primary-foreground/60">
                          No hay inquietudes para mostrar.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    paginatedInquietudes.map((inquietud) => (
                      <Card
                        key={inquietud.id}
                        className="bg-card/50 backdrop-blur-sm border-primary-foreground/10 hover:border-accent/30 transition-colors"
                      >
                        <CardHeader>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <CardTitle className="text-primary-foreground">
                              {inquietud.tema}
                            </CardTitle>
                            <span className="text-sm text-primary-foreground/60">
                              {formatDate(inquietud.created_at)}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-primary-foreground/80 leading-relaxed whitespace-pre-wrap">
                            {inquietud.mensaje}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="gap-1 pl-2.5"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Anterior</span>
                        </Button>
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Mostrar solo algunas páginas alrededor de la actual
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <Button
                                variant={currentPage === page ? "outline" : "ghost"}
                                size="icon"
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? "border-accent" : ""}
                              >
                                {page}
                              </Button>
                            </PaginationItem>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <PaginationItem key={page}>
                              <span className="px-2 text-primary-foreground/40">...</span>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="gap-1 pr-2.5"
                        >
                          <span>Siguiente</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inquietudes;

