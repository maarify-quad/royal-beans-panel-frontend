import React from "react";

// UI Components
import { Table, Card } from "@mantine/core";

// Interfaces
import { RoastDetail } from "@interfaces/roast";

// Props
type RoundsTableProps = {
  roastDetails?: RoastDetail[];
};

export const RoundsTable: React.FC<RoundsTableProps> = ({ roastDetails }) => {
  return (
    <Card withBorder shadow="xs">
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Posta</th>
            <th>Kahve</th>
            <th>Atılan Miktar</th>
            <th>Alınan Miktar</th>
            <th>Fire Miktar</th>
          </tr>
        </thead>
        <tbody>
          {roastDetails?.map((roastDetail, i) => (
            <tr key={i}>
              <td>POSTA-{roastDetail.roundId.charAt(roastDetail.roundId.length - 1)}</td>
              <td>{roastDetail.product.name}</td>
              <td>{roastDetail.inputAmount} kg</td>
              <td>{roastDetail.outputAmount} kg</td>
              <td>{roastDetail.differenceAmount} kg</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
