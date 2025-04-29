import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const query = `
  SELECT date_trunc('month', date) as month, 
         SUM(total_revenue) as monthly_revenue, 
         SUM(subscription_revenue) as subscription_revenue, 
         SUM(product_revenue) as product_revenue 
  FROM revenue 
  GROUP BY date_trunc('month', date) 
  ORDER BY month DESC 
  LIMIT 12
`;

export type MonthlyRevenueData = {
  month: string;
  monthly_revenue: number;
  subscription_revenue: number;
  product_revenue: number;
};

interface MonthlyRevenueChartProps {
  data: MonthlyRevenueData[];
}

export function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  const formattedData = data
    .map((item) => ({
      ...item,
      month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    }))
    .reverse();

  const chartConfig = {
    subscription_revenue: {
      label: 'Subscription Revenue',
      color: 'var(--chart-1)',
    },
    product_revenue: {
      label: 'Product Revenue',
      color: 'var(--chart-2)',
    },
  };

  return (
    <UniversalChartCard
      title="Monthly Revenue Breakdown"
      description="Revenue split by type over the last 12 months"
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
            dataKey="subscription_revenue"
            stackId="1"
            stroke="var(--chart-1-stroke)"
            fill="var(--chart-1)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="product_revenue"
            stackId="1"
            stroke="var(--chart-2-stroke)"
            fill="var(--chart-2)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
