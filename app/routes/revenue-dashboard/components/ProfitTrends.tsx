import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const query = `
  SELECT date_trunc('month', date) as month, 
         SUM(net_profit) as net_profit, 
         SUM(total_revenue) as total_revenue, 
         SUM(total_cost) as total_cost 
  FROM revenue 
  GROUP BY date_trunc('month', date) 
  ORDER BY month DESC 
  LIMIT 6
`;

export type ProfitTrendsData = {
  month: string;
  net_profit: number;
  total_revenue: number;
  total_cost: number;
};

interface ProfitTrendsProps {
  data: ProfitTrendsData[];
}

export function ProfitTrends({ data }: ProfitTrendsProps) {
  const formattedData = data
    .map((item) => ({
      ...item,
      month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    }))
    .reverse();

  const chartConfig = {
    total_revenue: {
      label: 'Revenue',
      color: 'var(--chart-success)',
    },
    total_cost: {
      label: 'Cost',
      color: 'var(--chart-error)',
    },
    net_profit: {
      label: 'Net Profit',
      color: 'var(--chart-1)',
    },
  };

  return (
    <UniversalChartCard
      title="Profit Trends"
      description="Revenue, cost, and profit trends over the last 6 months"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total_revenue"
            stroke="var(--chart-success-stroke)"
            fill="var(--chart-success)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="total_cost"
            stroke="var(--chart-error-stroke)"
            fill="var(--chart-error)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="net_profit"
            stroke="var(--chart-1-stroke)"
            fill="var(--chart-1)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
