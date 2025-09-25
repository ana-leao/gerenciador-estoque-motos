import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { month: 'Jan', vendas: 24, meta: 30 },
  { month: 'Fev', vendas: 18, meta: 25 },
  { month: 'Mar', vendas: 32, meta: 35 },
  { month: 'Abr', vendas: 28, meta: 30 },
  { month: 'Mai', vendas: 42, meta: 40 },
  { month: 'Jun', vendas: 35, meta: 38 },
];

const topModels = [
  { name: 'Honda CB 600F', vendas: 24, color: '#DC2626' },
  { name: 'Yamaha MT-07', vendas: 18, color: '#EF4444' },
  { name: 'Kawasaki Ninja', vendas: 15, color: '#F87171' },
  { name: 'BMW S1000RR', vendas: 12, color: '#FCA5A5' },
  { name: 'Ducati Monster', vendas: 8, color: '#FEE2E2' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value} unidades`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Bar Chart - Monthly Sales */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Vendas Mensais</h3>
          <p className="text-sm text-muted-foreground">Comparativo com metas estabelecidas</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="vendas" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Vendas"
              />
              <Bar 
                dataKey="meta" 
                fill="hsl(var(--muted))" 
                radius={[4, 4, 0, 0]}
                name="Meta"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - Top Models */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Modelos Mais Vendidos</h3>
          <p className="text-sm text-muted-foreground">Top 5 modelos por unidades vendidas</p>
        </div>
        
        <div className="h-80 flex items-center">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topModels}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  dataKey="vendas"
                  startAngle={90}
                  endAngle={450}
                >
                  {topModels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} unidades`, 'Vendas']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--card-border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-1/2 space-y-3">
            {topModels.map((model, index) => (
              <div key={model.name} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: model.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {model.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {model.vendas} unidades
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}