import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const query = `
  SELECT o.industry, 
         AVG(r.gross_profit / NULLIF(r.total_revenue, 0)) * 100 as avg_margin_percentage 
  FROM organizations o 
  JOIN revenue r ON o.organization_id = r.organization_id 
  GROUP BY o.industry 
  ORDER BY avg_margin_percentage DESC
`;

export type IndustryMarginsData = {
  industry: string;
  avg_margin_percentage: number;
};

interface IndustryMarginsProps {
  data: IndustryMarginsData[];
}

export function IndustryMargins({ data }: IndustryMarginsProps) {
  const chartConfig = {
    avg_margin_percentage: {
      label: 'Average Margin %',
      color: 'var(--chart-3)',
    },
  };

  return (
    <UniversalChartCard
      title="Profit Margins by Industry"
      description="Average profit margins across different industries"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" unit="%" />
          <YAxis dataKey="industry" type="category" width={150} />
          <Tooltip />
          <Bar
            dataKey="avg_margin_percentage"
            fill="var(--chart-3)"
            stroke="var(--chart-3-stroke)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
