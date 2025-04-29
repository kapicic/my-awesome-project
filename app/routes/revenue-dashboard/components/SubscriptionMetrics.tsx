import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const query = `
  SELECT subscription_tier, 
         COUNT(DISTINCT o.organization_id) as organization_count, 
         SUM(r.total_revenue) as total_revenue 
  FROM organizations o 
  JOIN revenue r ON o.organization_id = r.organization_id 
  GROUP BY subscription_tier 
  ORDER BY total_revenue DESC
`;

export type SubscriptionMetricsData = {
  subscription_tier: string;
  organization_count: number;
  total_revenue: number;
};

interface SubscriptionMetricsProps {
  data: SubscriptionMetricsData[];
}

export function SubscriptionMetrics({ data }: SubscriptionMetricsProps) {
  const chartConfig = {
    total_revenue: {
      label: 'Revenue',
      color: 'var(--chart-4)',
    },
    organization_count: {
      label: 'Organizations',
      color: 'var(--chart-5)',
    },
  };

  return (
    <UniversalChartCard
      title="Revenue by Subscription Tier"
      description="Revenue and organization count per subscription tier"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subscription_tier" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Bar
            yAxisId="left"
            dataKey="total_revenue"
            fill="var(--chart-4)"
            stroke="var(--chart-4-stroke)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="organization_count"
            fill="var(--chart-5)"
            stroke="var(--chart-5-stroke)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
