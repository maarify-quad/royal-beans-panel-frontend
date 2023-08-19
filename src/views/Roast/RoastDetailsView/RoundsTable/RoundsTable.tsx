// UI Components
import { Table, Card } from "@mantine/core";

// Interfaces
import { RoastDetail } from "@interfaces/roast";

// Props
type RoundsTableProps = {
  roastDetails?: RoastDetail[];
};

export const RoundsTable = ({ roastDetails }: RoundsTableProps) => {
  return (
    <Card withBorder shadow="xs">
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Posta</th>
            <th>Kahve</th>
            <th>Atılan Miktar</th>
            <th>Alınan Miktar</th>
            <th>Fire Oranı</th>
          </tr>
        </thead>
        <tbody>
          {roastDetails?.map((roastDetail, i) => (
            <tr key={i}>
              <td>POSTA-{roastDetail.roundId.split("P")[1]}</td>
              <td>{roastDetail.product.name}</td>
              <td>{roastDetail.inputAmount} kg</td>
              <td>{roastDetail.outputAmount} kg</td>
              <td>% {Number(roastDetail.differenceAmount / roastDetail.inputAmount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
