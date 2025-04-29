import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';

export const query = `
  SELECT o.organization_name, SUM(r.total_revenue) as total_revenue, SUM(r.total_cost) as total_cost, SUM(r.net_profit) as net_profit 
  FROM organizations o 
  JOIN revenue r ON o.organization_id = r.organization_id 
  GROUP BY o.organization_name 
  ORDER BY total_revenue DESC 
  LIMIT 10
`;

export type TopOrganizationsData = {
  organization_name: string;
  total_revenue: number;
  total_cost: number;
  net_profit: number;
};

interface TopOrganizationsProps {
  data: TopOrganizationsData[];
}

export function TopOrganizations({ data }: TopOrganizationsProps) {
  return (
    <UniversalTableCard title="Top Organizations by Revenue" description="Top 10 organizations by total revenue">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead className="text-right">Net Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((org) => (
            <TableRow key={org.organization_name}>
              <TableCell>{org.organization_name}</TableCell>
              <TableCell className="text-right">${org.total_revenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">${org.total_cost.toLocaleString()}</TableCell>
              <TableCell className="text-right">${org.net_profit.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
