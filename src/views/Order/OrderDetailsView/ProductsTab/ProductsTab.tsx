import React from "react";

// UI Components
import { Card, Group, Text } from "@mantine/core";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { OrderWithAll } from "@interfaces/order";

// Props
type ProductsTabProps = {
  order: OrderWithAll;
};

export const ProductsTab: React.FC<ProductsTabProps> = ({ order }) => {
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
        rows={order.orderProducts.map((orderProduct) => [
          { value: orderProduct.priceListProduct.product.name },
          { value: orderProduct.grindType },
          { value: orderProduct.quantity },
          { value: `${orderProduct.unitPrice.toFixed(2)} ₺` },
          { value: `${orderProduct.subTotal.toFixed(2)} ₺` },
        ])}
      />
      <Group>
        <Card withBorder shadow="xs" mt="md" style={{ minWidth: 320, width: "max-content" }}>
          <Group position="apart">
            <Text>Ara Toplam</Text>
            <Text size="lg" weight="bold">
              {order.subTotal.toFixed(2)} ₺
            </Text>
          </Group>
          <Group position="apart">
            <Text>KDV Toplam</Text>
            <Text size="lg" weight="bold">
              {order.taxTotal.toFixed(2)} ₺
            </Text>
          </Group>
          <Group position="apart">
            <Text>Toplam</Text>
            <Text size="lg" weight="bold">
              {order.total.toFixed(2)} ₺
            </Text>
          </Group>
        </Card>
      </Group>
    </div>
  );
};
