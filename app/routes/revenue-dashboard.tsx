import { useLoaderData } from '@remix-run/react';
import { executePostgresQuery } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';

import {
  KeyMetrics,
  KeyMetricsData,
  query as keyMetricsQuery,
} from './revenue-dashboard/components/KeyMetrics';
import {
  MonthlyRevenueChart,
  MonthlyRevenueData,
  query as monthlyRevenueQuery,
} from './revenue-dashboard/components/MonthlyRevenueChart';
import {
  TopOrganizations,
  TopOrganizationsData,
  query as topOrganizationsQuery,
} from './revenue-dashboard/components/TopOrganizations';
import {
  IndustryMargins,
  IndustryMarginsData,
  query as industryMarginsQuery,
} from './revenue-dashboard/components/IndustryMargins';
import {
  SubscriptionMetrics,
  SubscriptionMetricsData,
  query as subscriptionMetricsQuery,
} from './revenue-dashboard/components/SubscriptionMetrics';
import {
  ProfitTrends,
  ProfitTrendsData,
  query as profitTrendsQuery,
} from './revenue-dashboard/components/ProfitTrends';

export async function loader() {
  const [keyMetrics, monthlyRevenue, topOrganizations, industryMargins, subscriptionMetrics, profitTrends] =
    await Promise.all([
      executePostgresQuery<KeyMetricsData>(keyMetricsQuery),
      executePostgresQuery<MonthlyRevenueData>(monthlyRevenueQuery),
      executePostgresQuery<TopOrganizationsData>(topOrganizationsQuery),
      executePostgresQuery<IndustryMarginsData>(industryMarginsQuery),
      executePostgresQuery<SubscriptionMetricsData>(subscriptionMetricsQuery),
      executePostgresQuery<ProfitTrendsData>(profitTrendsQuery),
    ]);

  return {
    keyMetrics,
    monthlyRevenue,
    topOrganizations,
    industryMargins,
    subscriptionMetrics,
    profitTrends,
  };
}

export default function RevenueDashboard() {
  const { keyMetrics, monthlyRevenue, topOrganizations, industryMargins, subscriptionMetrics, profitTrends } =
    useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Revenue Dashboard</h1>

      <WithErrorHandling queryData={keyMetrics} render={(data) => <KeyMetrics data={data} />} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling queryData={monthlyRevenue} render={(data) => <MonthlyRevenueChart data={data} />} />
        <WithErrorHandling queryData={profitTrends} render={(data) => <ProfitTrends data={data} />} />
      </div>

      <WithErrorHandling queryData={topOrganizations} render={(data) => <TopOrganizations data={data} />} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling queryData={industryMargins} render={(data) => <IndustryMargins data={data} />} />
        <WithErrorHandling queryData={subscriptionMetrics} render={(data) => <SubscriptionMetrics data={data} />} />
      </div>
    </div>
  );
}
