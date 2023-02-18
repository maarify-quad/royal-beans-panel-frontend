// Routing
import { Link } from "react-router-dom";

// UI Components
import { Table, ScrollArea, Text, Card, Group, Paper, Badge, Anchor } from "@mantine/core";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Delivery } from "@interfaces/delivery";

// Props
type ResultsProps = {
  delivery: Delivery;
};

export const Results = ({ delivery }: ResultsProps) => {
  return (
    <>
      <Paper p="md" radius="md" shadow="sm" withBorder>
        <ScrollArea>
          <Table highlightOnHover verticalSpacing="sm">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Miktar</th>
                <th>Birim Fiyat</th>
                <th>KDV</th>
                <th>Toplam</th>
              </tr>
            </thead>
            <tbody>
              {delivery.deliveryDetails?.map((deliveryDetail, i) => (
                <tr key={i}>
                  <td>
                    <Anchor
                      component={Link}
                      to={`/dashboard/storage/${deliveryDetail.product.stockCode}`}
                    >
                      {deliveryDetail.product.name}
                    </Anchor>
                    {deliveryDetail.product.deletedAt && (
                      <Badge color="red" size="sm" ml={4}>
                        İNAKTİF
                      </Badge>
                    )}
                  </td>
                  <td>
                    {deliveryDetail.quantity} {deliveryDetail.unit}
                  </td>
                  <td>{formatCurrency(deliveryDetail.unitPriceTRY)}</td>
                  <td>
                    {formatCurrency(deliveryDetail.taxTotal)}&nbsp;
                    <span style={{ color: "#868E96" }}>(%{deliveryDetail.taxRate})</span>
                  </td>
                  <td>{formatCurrency(deliveryDetail.total)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <Card withBorder shadow="xs" mt="md" style={{ minWidth: 320, width: "max-content" }}>
        <Group position="apart">
          <Text>Ara Toplam</Text>
          <Text size="lg" weight="bold">
            {formatCurrency(delivery.subTotal)}
          </Text>
        </Group>
        <Group position="apart">
          <Text>KDV Toplam</Text>
          <Text size="lg" weight="bold">
            {formatCurrency(delivery.taxTotal)}
          </Text>
        </Group>
        <Group position="apart">
          <Text>Toplam</Text>
          <Text size="lg" weight="bold">
            {formatCurrency(delivery.total)}
          </Text>
        </Group>
      </Card>
    </>
  );
};
