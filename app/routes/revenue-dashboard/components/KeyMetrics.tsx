import { DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { QuickInfoCard } from '@/components/building-blocks/quick-info-card/quick-info-card';

export const query = `
  SELECT 
    SUM(total_revenue) as total_revenue,
    SUM(total_cost) as total_cost,
    SUM(net_profit) as net_profit,
    COUNT(DISTINCT organization_id) as total_organizations
  FROM revenue
`;

export type KeyMetricsData = {
  total_revenue: number;
  total_cost: number;
  net_profit: number;
  total_organizations: number;
};

interface KeyMetricsProps {
  data: KeyMetricsData[];
}

export function KeyMetrics({ data }: KeyMetricsProps) {
  const metrics = data[0];
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <QuickInfoCard
        title="Total Revenue"
        description="Overall revenue generated"
        icon={<DollarSign className="h-5 w-5 text-green-500" />}
      >
        <div className="text-3xl font-bold">${metrics.total_revenue.toLocaleString()}</div>
      </QuickInfoCard>

      <QuickInfoCard
        title="Total Cost"
        description="Overall costs incurred"
        icon={<TrendingDown className="h-5 w-5 text-red-500" />}
      >
        <div className="text-3xl font-bold">${metrics.total_cost.toLocaleString()}</div>
      </QuickInfoCard>

      <QuickInfoCard
        title="Net Profit"
        description="Total profit generated"
        icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
      >
        <div className="text-3xl font-bold">${metrics.net_profit.toLocaleString()}</div>
      </QuickInfoCard>

      <QuickInfoCard
        title="Total Organizations"
        description="Number of active organizations"
        icon={<Users className="h-5 w-5 text-purple-500" />}
      >
        <div className="text-3xl font-bold">{metrics.total_organizations.toLocaleString()}</div>
      </QuickInfoCard>
    </div>
  );
}
