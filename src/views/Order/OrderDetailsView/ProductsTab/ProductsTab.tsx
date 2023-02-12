import React, { useMemo } from "react";

// UI Components
import { Badge, Card, Flex, Group, Paper, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Order } from "@interfaces/order";
import { ManualOrderProduct, OrderProduct } from "@interfaces/orderProduct";

// Props
type ProductsTabProps = {
  order: Order;
};

export const ProductsTab: React.FC<ProductsTabProps> = ({ order }) => {
  const columns = useMemo<DataTableColumn<any>[]>(() => {
    if (order.type === "BULK") {
      return [
        {
          title: "Ürün",
          accessor: "priceListProduct.product.name",
          render: (orderProduct: OrderProduct) => (
            <Flex align="center" gap="xs">
              <Text>{orderProduct.priceListProduct.product.name}</Text>
              {orderProduct.priceListProduct.product.deletedAt && (
                <Badge color="red" size="sm">
                  İNAKTİF
                </Badge>
              )}
            </Flex>
          ),
        },
        { title: "Öğütüm", accessor: "grindType" },
        { title: "Adet", accessor: "quantity" },
        {
          title: "Birim Fiyat",
          accessor: "unitPrice",
          render: (product) => formatCurrency(product.unitPrice),
        },
        {
          title: "Ara Toplam",
          accessor: "subTotal",
          render: (product) => formatCurrency(product.subTotal),
        },
      ];
    }
    return [
      {
        title: "Ürün",
        accessor: "product.name",
        render: (product) => (
          <Flex align="center" gap="xs">
            <Text>{product.product.name}</Text>
            {product.product.deletedAt && (
              <Badge color="red" size="sm">
                İNAKTİF
              </Badge>
            )}
          </Flex>
        ),
      },
      { title: "Öğütüm", accessor: "grindType" },
      { title: "Adet", accessor: "quantity" },
      {
        title: "Birim Fiyat",
        accessor: "unitPrice",
        render: (product) => formatCurrency(product.unitPrice),
      },
      {
        title: "Ara Toplam",
        accessor: "subTotal",
        render: (product) => formatCurrency(product.subTotal),
      },
    ];
  }, [order]);

  return (
    <div>
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable<OrderProduct | ManualOrderProduct>
          highlightOnHover
          records={order.orderProducts}
          columns={columns}
        />
      </Paper>
      <Group>
        <Card withBorder shadow="xs" mt="md" style={{ minWidth: 320, width: "max-content" }}>
          <Group position="apart">
            <Text>Ara Toplam</Text>
            <Text size="lg" weight="bold">
              {formatCurrency(order.subTotal)}
            </Text>
          </Group>
          <Group position="apart">
            <Text>KDV Toplam</Text>
            <Text size="lg" weight="bold">
              {formatCurrency(order.taxTotal)}
            </Text>
          </Group>
          <Group position="apart">
            <Text>Toplam</Text>
            <Text size="lg" weight="bold">
              {formatCurrency(order.total)}
            </Text>
          </Group>
        </Card>
      </Group>
    </div>
  );
};
