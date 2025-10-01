import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motorcyclesData } from '@/data/motorcycles';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} unidades`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function StockChart() {
  // Dados por modelo
  const modelData = motorcyclesData.reduce((acc, bike) => {
    const existing = acc.find(item => item.modelo === bike.model);
    if (existing) {
      existing.total += bike.stock;
      existing.disponiveis += bike.status === "Disponível" ? bike.stock : 0;
    } else {
      acc.push({
        modelo: bike.model,
        total: bike.stock,
        disponiveis: bike.status === "Disponível" ? bike.stock : 0
      });
    }
    return acc;
  }, [] as Array<{ modelo: string; total: number; disponiveis: number }>);

  // Dados por pátio
  const patioData = motorcyclesData.reduce((acc, bike) => {
    const existing = acc.find(item => item.name === bike.patio);
    if (existing) {
      existing.value += bike.stock;
    } else {
      acc.push({
        name: bike.patio,
        value: bike.stock
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Bar Chart - Por Modelo */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Estoque por Modelo</h3>
          <p className="text-sm text-muted-foreground">Total e disponíveis por modelo</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="modelo" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="total" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Total"
              />
              <Bar 
                dataKey="disponiveis" 
                fill="hsl(var(--success))" 
                radius={[4, 4, 0, 0]}
                name="Disponíveis"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - Por Pátio */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Distribuição por Pátio</h3>
          <p className="text-sm text-muted-foreground">Quantidade de motos em cada pátio</p>
        </div>
        
        <div className="h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {patioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} unidades`, 'Quantidade']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--card-border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
