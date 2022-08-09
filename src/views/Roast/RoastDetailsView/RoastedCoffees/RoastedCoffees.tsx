import React from "react";

// UI Components
import { Table, Card } from "@mantine/core";

// Interfaces
import { RoastDetail } from "@interfaces/roast";

// Props
type RoastedCoffeesProps = {
  roastDetails?: RoastDetail[];
};

export const RoastedCoffees: React.FC<RoastedCoffeesProps> = ({ roastDetails }) => {
  return (
    <Card withBorder shadow="xs">
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Kavrulan Kahve</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody>
          {roastDetails?.map((roastDetail, i) => (
            <tr key={i}>
              <td>{roastDetail.product.name}</td>
              <td>{roastDetail.outputAmount} kg</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
