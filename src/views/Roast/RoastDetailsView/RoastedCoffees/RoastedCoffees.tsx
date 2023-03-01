// UI Components
import { Table, Card } from "@mantine/core";

// Interfaces
import { RoastDetail } from "@interfaces/roast";
import { groupBy } from "lodash";
import { useMemo } from "react";

// Props
type RoastedCoffeesProps = {
  roastDetails?: RoastDetail[];
};

export const RoastedCoffees = ({ roastDetails }: RoastedCoffeesProps) => {
  const groupedRoastDetails = useMemo(() => {
    const result: { [key: number]: RoastDetail } = {};

    roastDetails?.forEach((roastDetail) => {
      if (result[roastDetail.product.id]) {
        result[roastDetail.product.id].outputAmount += roastDetail.outputAmount;
      } else {
        result[roastDetail.product.id] = {
          ...roastDetail,
          outputAmount: roastDetail.outputAmount,
        };
      }
    });

    return Object.values(result);
  }, [roastDetails]);

  console.log(groupedRoastDetails);

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
          {groupedRoastDetails?.map((roastDetail, i) => (
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
