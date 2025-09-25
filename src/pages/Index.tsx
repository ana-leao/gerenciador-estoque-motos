import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { SalesChart } from "@/components/SalesChart";
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Bike,
  Users
} from "lucide-react";
import { 
  motorcyclesData, 
  getTotalInventoryValue, 
  getTotalStock, 
  getAvailableStock,
  getBestSelling 
} from "@/data/motorcycles";
import { MotorcycleCard } from "@/components/MotorcycleCard";

const Index = () => {
  const totalValue = getTotalInventoryValue();
  const totalStock = getTotalStock();
  const availableStock = getAvailableStock();
  const bestSelling = getBestSelling().slice(0, 3);
  const totalSales = motorcyclesData.reduce((sum, bike) => sum + bike.salesCount, 0);

  return (
    <DashboardLayout>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Valor Total Estoque"
          value={new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0
          }).format(totalValue)}
          subtitle="Valor total em estoque"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        
        <MetricCard
          title="Motos em Estoque"
          value={totalStock}
          subtitle={`${availableStock} disponíveis`}
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
        />
        
        <MetricCard
          title="Vendas do Mês"
          value={totalSales}
          subtitle="Unidades vendidas"
          icon={TrendingUp}
          trend={{ value: 15.3, isPositive: true }}
        />
        
        <MetricCard
          title="Modelos Cadastrados"
          value={motorcyclesData.length}
          subtitle="Diferentes modelos"
          icon={Bike}
          trend={{ value: 3.1, isPositive: false }}
        />
      </div>

      {/* Charts Section */}
      <SalesChart />

      {/* Best Selling Motorcycles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Motos Mais Vendidas</h2>
            <p className="text-muted-foreground">Os modelos com melhor performance de vendas</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-success" />
            <span>Top performers do mês</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSelling.map((motorcycle) => (
            <MotorcycleCard key={motorcycle.id} {...motorcycle} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Estoque baixo</p>
            </div>
          </div>
        </div>
        
        <div className="card-elevated p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Vendedores ativos</p>
            </div>
          </div>
        </div>
        
        <div className="card-elevated p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Bike className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Marcas representadas</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
