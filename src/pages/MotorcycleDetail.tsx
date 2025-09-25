import { useParams, NavLink } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MotorcycleImage } from "@/components/MotorcycleImage";
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  Heart,
  Package,
  Fuel,
  Zap,
  Weight,
  Calendar,
  TrendingUp,
  Star
} from "lucide-react";
import { motorcyclesData } from "@/data/motorcycles";

const MotorcycleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const motorcycle = motorcyclesData.find(bike => bike.id === id);

  if (!motorcycle) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Moto não encontrada</h1>
          <Button asChild>
            <NavLink to="/motorcycles">Voltar ao catálogo</NavLink>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <NavLink to="/motorcycles">
                <ArrowLeft className="h-4 w-4" />
              </NavLink>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{motorcycle.name}</h1>
              <p className="text-muted-foreground">
                {motorcycle.brand} • {motorcycle.year}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button className="flex items-center gap-2" asChild>
              <NavLink to={`/motorcycles/${motorcycle.id}/edit`}>
                <Edit className="h-4 w-4" />
                Editar
              </NavLink>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="card-elevated overflow-hidden">
              <div className="relative bg-surface">
                <MotorcycleImage 
                  src={motorcycle.image} 
                  alt={motorcycle.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(motorcycle.status)} border`}>
                    {motorcycle.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed">
                {motorcycle.description}
              </p>
            </div>

            {/* Technical Specs */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Especificações Técnicas</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Motor</p>
                    <p className="font-semibold text-foreground">{motorcycle.engine}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potência</p>
                    <p className="font-semibold text-foreground">{motorcycle.power}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Weight className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Peso</p>
                    <p className="font-semibold text-foreground">{motorcycle.weight}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Fuel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Combustível</p>
                    <p className="font-semibold text-foreground">{motorcycle.fuel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Características</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {motorcycle.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Stock */}
            <div className="card-elevated p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(motorcycle.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">Preço sugerido</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Estoque</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {motorcycle.stock} unidades
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Vendas</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {motorcycle.salesCount} unidades
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Ano</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {motorcycle.year}
                  </span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" disabled={motorcycle.status === "Vendido"}>
                    {motorcycle.status === "Vendido" ? "Indisponível" : "Registrar Venda"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Gerar Proposta
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="card-elevated p-6">
              <h4 className="font-semibold text-foreground mb-4">Informações Rápidas</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Categoria</span>
                  <Badge variant="outline">{motorcycle.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(motorcycle.status)}>
                    {motorcycle.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Código</span>
                  <span className="text-sm font-medium text-foreground">#{motorcycle.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MotorcycleDetail;