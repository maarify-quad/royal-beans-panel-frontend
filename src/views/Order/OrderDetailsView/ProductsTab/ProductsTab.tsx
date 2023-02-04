import React, { useMemo } from "react";

// UI Components
import { Card, Group, Text } from "@mantine/core";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type ProductsTabProps = {
  order: Order;
};

const currencyFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const ProductsTab: React.FC<ProductsTabProps> = ({ order }) => {
  const rows = useMemo(() => {
    if (order.type === "BULK") {
      return order.orderProducts.map((orderProduct) => {
        return [
          { value: orderProduct.priceListProduct.product.name },
          { value: orderProduct.grindType },
          { value: orderProduct.quantity },
          { value: currencyFormatter.format(orderProduct.unitPrice) },
          { value: currencyFormatter.format(orderProduct.subTotal) },
        ];
      });
    }
    return order.orderProducts.map((orderProduct) => {
      return [
        { value: orderProduct.product.name },
        { value: orderProduct.grindType },
        { value: orderProduct.quantity },
        { value: currencyFormatter.format(orderProduct.unitPrice) },
        { value: currencyFormatter.format(orderProduct.subTotal) },
      ];
    });
  }, [order]);

  return (
    <div>
      <ResultsTable
        headers={[
          { value: "Ürün" },
          { value: "Öğütüm" },
          { value: "Adet" },
          { value: "Birim Fiyat" },
          { value: "Ara Toplam" },
        ]}
        rows={rows}
      />
      <Group>
        <Card withBorder shadow="xs" mt="md" style={{ minWidth: 320, width: "max-content" }}>
          <Group position="apart">
            <Text>Ara Toplam</Text>
            <Text size="lg" weight="bold">
              {currencyFormatter.format(order.subTotal)}
            </Text>
          </Group>
          <Group position="apart">
            <Text>KDV Toplam</Text>
            <Text size="lg" weight="bold">
              {currencyFormatter.format(order.taxTotal)}
            </Text>
          </Group>
          <Group position="apart">
            <Text>Toplam</Text>
            <Text size="lg" weight="bold">
              {currencyFormatter.format(order.total)}
            </Text>
          </Group>
        </Card>
      </Group>
    </div>
  );
};
