import React from "react";

// UI Components
import { Table, ScrollArea, Container, Text, Card, Group } from "@mantine/core";

// Interfaces
import { Delivery } from "@interfaces/delivery";

// Props
type ResultsProps = {
  delivery: Delivery;
};

export const Results: React.FC<ResultsProps> = ({ delivery }) => {
  return (
    <Container fluid p={0}>
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
                <td>{deliveryDetail.product.name}</td>
                <td>
                  {deliveryDetail.quantity} {deliveryDetail.unit}
                </td>
                <td>{deliveryDetail.unitPriceTRY} ₺</td>
                <td>
                  {deliveryDetail.taxTotal} ₺ &nbsp;
                  <span style={{ color: "#868E96" }}>(%{deliveryDetail.taxRate})</span>
                </td>
                <td>{deliveryDetail.total} ₺</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <Group position="right">
        <Card withBorder mt="md" style={{ minWidth: 320, width: "max-content" }}>
          <Group position="apart">
            <Text>Ara Toplam</Text>
            <Text size="lg" weight="bold">
              {delivery.subTotal} ₺
            </Text>
          </Group>
          <Group position="apart">
            <Text>KDV Toplam</Text>
            <Text size="lg" weight="bold">
              {delivery.taxTotal} ₺
            </Text>
          </Group>
          <Group position="apart">
            <Text>Toplam</Text>
            <Text size="lg" weight="bold">
              {delivery.total} ₺
            </Text>
          </Group>
        </Card>
      </Group>
    </Container>
  );
};
