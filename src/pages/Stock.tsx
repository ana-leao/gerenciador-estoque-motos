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
import { Search, Download, Filter } from "lucide-react";
import { motorcyclesData } from "@/data/motorcycles";

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedPatio, setSelectedPatio] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Get unique values for filters
  const brands = Array.from(new Set(motorcyclesData.map(bike => bike.brand))).sort();
  const types = Array.from(new Set(motorcyclesData.map(bike => bike.type))).sort();
  const colors = Array.from(new Set(motorcyclesData.map(bike => bike.color))).sort();
  const patios = Array.from(new Set(motorcyclesData.map(bike => bike.patio))).sort();

  // Filter motorcycles - apenas livres (não reservadas)
  const filteredMotorcycles = motorcyclesData.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bike.chassi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bike.placa && bike.placa.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBrand = selectedBrand === "all" || bike.brand === selectedBrand;
    const matchesType = selectedType === "all" || bike.type === selectedType;
    const matchesColor = selectedColor === "all" || bike.color === selectedColor;
    const matchesPatio = selectedPatio === "all" || bike.patio === selectedPatio;
    const matchesStatus = selectedStatus === "all" || bike.status === selectedStatus;
    const isAvailable = selectedStatus === "all" ? bike.status !== "Reservado" : true;
    
    return matchesSearch && matchesBrand && matchesType && matchesColor && matchesPatio && matchesStatus && isAvailable;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedType("all");
    setSelectedColor("all");
    setSelectedPatio("all");
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

  const getTypeColor = (type: string) => {
    return type === "Nova" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-muted";
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
              Consulta de motos novas e seminovas disponíveis
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
            <p className="text-2xl font-bold text-foreground">{filteredMotorcycles.reduce((sum, bike) => sum + bike.stock, 0)}</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Valor Total</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(totalValue)}</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Motas Novas</p>
            <p className="text-2xl font-bold text-success">
              {filteredMotorcycles.filter(bike => bike.type === "Nova").reduce((sum, bike) => sum + bike.stock, 0)}
            </p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Seminovas</p>
            <p className="text-2xl font-bold text-warning">
              {filteredMotorcycles.filter(bike => bike.type === "Seminova").reduce((sum, bike) => sum + bike.stock, 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filtros de Pesquisa</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, chassi, placa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            {/* Color Filter */}
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Cor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cores</SelectItem>
                {colors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Patio Filter */}
            <Select value={selectedPatio} onValueChange={setSelectedPatio}>
              <SelectTrigger>
                <SelectValue placeholder="Pátio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os pátios</SelectItem>
                {patios.map(patio => (
                  <SelectItem key={patio} value={patio}>{patio}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredMotorcycles.length} motocicleta(s)
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="card-elevated overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Motocicleta</TableHead>
                <TableHead>Chassi</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Pátio</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMotorcycles.map((motorcycle) => (
                <TableRow key={motorcycle.id}>
                  <TableCell>
                    <Badge className={`${getTypeColor(motorcycle.type)} border`}>
                      {motorcycle.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{motorcycle.name}</div>
                    <div className="text-sm text-muted-foreground">{motorcycle.model}</div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs">{motorcycle.chassi}</span>
                  </TableCell>
                  <TableCell>
                    {motorcycle.placa ? (
                      <span className="font-mono text-xs">{motorcycle.placa}</span>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell>{motorcycle.color}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{motorcycle.patio}</Badge>
                  </TableCell>
                  <TableCell>{motorcycle.brand}</TableCell>
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
