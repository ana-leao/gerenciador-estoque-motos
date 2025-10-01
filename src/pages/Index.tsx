import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { StockChart } from "@/components/StockChart";
import { 
  Package, 
  Bike,
  CheckCircle,
  Grid3x3
} from "lucide-react";
import { 
  motorcyclesData, 
  getTotalInventoryValue, 
  getTotalStock, 
  getAvailableStock
} from "@/data/motorcycles";

const Index = () => {
  const totalValue = getTotalInventoryValue();
  const totalStock = getTotalStock();
  const availableStock = getAvailableStock();
  const uniqueModels = new Set(motorcyclesData.map(bike => bike.model)).size;
  
  // Quantidade por pátio
  const patioStats = motorcyclesData.reduce((acc, bike) => {
    acc[bike.patio] = (acc[bike.patio] || 0) + bike.stock;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total em Estoque"
          value={totalStock}
          subtitle="Motos no estoque"
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
        />
        
        <MetricCard
          title="Motos Disponíveis"
          value={availableStock}
          subtitle="Livres para venda"
          icon={CheckCircle}
          trend={{ value: 5.3, isPositive: true }}
        />
        
        <MetricCard
          title="Modelos Cadastrados"
          value={uniqueModels}
          subtitle="Diferentes modelos"
          icon={Grid3x3}
        />
        
        <MetricCard
          title="Valor do Estoque"
          value={new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(totalValue)}
          subtitle="Valor total"
          icon={Bike}
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <StockChart />

      {/* Pátios Stats */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Distribuição por Pátio</h2>
          <p className="text-muted-foreground">Quantidade de motos em cada localização</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(patioStats).map(([patio, count]) => (
            <div key={patio} className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                  <p className="text-sm text-muted-foreground">{patio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Status do Estoque</h2>
          <p className="text-muted-foreground">Distribuição por status</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-elevated p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {motorcyclesData.filter(bike => bike.status === "Disponível").reduce((sum, bike) => sum + bike.stock, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Package className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {motorcyclesData.filter(bike => bike.status === "Reservado").reduce((sum, bike) => sum + bike.stock, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Reservadas</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted/10 rounded-lg">
                <Bike className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {motorcyclesData.filter(bike => bike.type === "Nova").length}
                </p>
                <p className="text-sm text-muted-foreground">Motos Novas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
