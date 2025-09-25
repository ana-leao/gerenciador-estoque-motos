import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, Eye } from "lucide-react";
import { motorcyclesData } from "@/data/motorcycles";
import { NavLink } from "react-router-dom";

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Get unique values for filters
  const brands = Array.from(new Set(motorcyclesData.map(bike => bike.brand))).sort();
  const categories = Array.from(new Set(motorcyclesData.map(bike => bike.category))).sort();
  const statuses = Array.from(new Set(motorcyclesData.map(bike => bike.status))).sort();

  // Filter motorcycles
  const filteredMotorcycles = motorcyclesData.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || bike.brand === selectedBrand;
    const matchesCategory = selectedCategory === "all" || bike.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || bike.status === selectedStatus;
    
    return matchesSearch && matchesBrand && matchesCategory && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "status-success";
      case "Reservado":
        return "status-warning";
      case "Vendido":
        return "status-error";
      default:
        return "bg-muted";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const totalValue = filteredMotorcycles.reduce((sum, bike) => sum + (bike.price * bike.stock), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Controle de Estoque</h1>
            <p className="text-muted-foreground">
              Gerencie e monitore o estoque de motocicletas
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total de Motos</p>
            <p className="text-2xl font-bold text-foreground">{filteredMotorcycles.length}</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Valor Total</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(totalValue)}</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Disponíveis</p>
            <p className="text-2xl font-bold text-success">
              {filteredMotorcycles.filter(bike => bike.status === "Disponível").length}
            </p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Vendidas</p>
            <p className="text-2xl font-bold text-error">
              {filteredMotorcycles.filter(bike => bike.status === "Vendido").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
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
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredMotorcycles.length} de {motorcyclesData.length} motocicletas
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="card-elevated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Motocicleta</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMotorcycles.map((motorcycle) => (
                <TableRow key={motorcycle.id}>
                  <TableCell>
                    <div className="font-medium">{motorcycle.name}</div>
                    <div className="text-sm text-muted-foreground">{motorcycle.model}</div>
                  </TableCell>
                  <TableCell>{motorcycle.brand}</TableCell>
                  <TableCell>{motorcycle.category}</TableCell>
                  <TableCell>{motorcycle.year}</TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(motorcycle.price)}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${motorcycle.stock < 5 ? 'text-error' : 'text-foreground'}`}>
                      {motorcycle.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(motorcycle.status)} border`}>
                      {motorcycle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{motorcycle.salesCount}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <NavLink to={`/motorcycles/${motorcycle.id}`}>
                        <Eye className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stock;