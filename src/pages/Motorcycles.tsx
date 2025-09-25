import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MotorcycleCard } from "@/components/MotorcycleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, SlidersHorizontal } from "lucide-react";
import { motorcyclesData, type Motorcycle } from "@/data/motorcycles";

const Motorcycles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique values for filters
  const brands = Array.from(new Set(motorcyclesData.map(bike => bike.brand))).sort();
  const categories = Array.from(new Set(motorcyclesData.map(bike => bike.category))).sort();
  const statuses = Array.from(new Set(motorcyclesData.map(bike => bike.status))).sort();

  // Filter and sort motorcycles
  const filteredMotorcycles = motorcyclesData
    .filter(bike => {
      const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bike.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === "all" || bike.brand === selectedBrand;
      const matchesCategory = selectedCategory === "all" || bike.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || bike.status === selectedStatus;
      
      return matchesSearch && matchesBrand && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "stock":
          return b.stock - a.stock;
        case "sales":
          return b.salesCount - a.salesCount;
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("name");
  };

  const hasActiveFilters = searchTerm || selectedBrand !== "all" || 
                          selectedCategory !== "all" || selectedStatus !== "all" || 
                          sortBy !== "name";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Catálogo de Motos</h1>
            <p className="text-muted-foreground">
              Gerencie o estoque e visualize todas as motocicletas disponíveis
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Moto
          </Button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filtros e Pesquisa</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-auto">
                {filteredMotorcycles.length} resultados
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, marca ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Brand Filter */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome (A-Z)</SelectItem>
                <SelectItem value="price-asc">Preço (menor)</SelectItem>
                <SelectItem value="price-desc">Preço (maior)</SelectItem>
                <SelectItem value="stock">Estoque</SelectItem>
                <SelectItem value="sales">Mais vendidas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredMotorcycles.length} de {motorcyclesData.length} motocicletas
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredMotorcycles.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma moto encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou realizar uma nova busca
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMotorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} {...motorcycle} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Motorcycles;