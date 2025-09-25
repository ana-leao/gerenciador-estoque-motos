import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import { MotorcycleImage } from "@/components/MotorcycleImage";

interface MotorcycleCardProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  stock: number;
  image: string;
  status: "Disponível" | "Vendido" | "Reservado";
}

export function MotorcycleCard({
  id,
  name,
  brand,
  model,
  year,
  price,
  stock,
  image,
  status
}: MotorcycleCardProps) {
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
    <div className="card-elevated group hover:shadow-large transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden bg-surface">
        <MotorcycleImage 
          src={image} 
          alt={`${brand} ${model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${getStatusColor(status)} border`}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground ml-2">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">{stock}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{brand}</span>
            <span>•</span>
            <span>{model}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </p>
            <p className="text-xs text-muted-foreground">
              Preço sugerido
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <NavLink to={`/motorcycles/${id}`} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver Detalhes
            </NavLink>
          </Button>
          <Button variant="default" size="sm" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}