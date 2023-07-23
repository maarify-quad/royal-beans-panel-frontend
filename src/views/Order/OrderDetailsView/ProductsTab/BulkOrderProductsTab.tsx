import { useMemo } from "react";

// UI Components
import { Badge, Button, Card, Flex, Group, LoadingOverlay, Paper, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Hooks
import { useDeleteOrderProduct } from "@hooks/orderProduct/useDeleteOrderProduct";

// Icons
import { IconEdit, IconTrash } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { BulkOrder } from "@interfaces/order";
import { OrderProduct } from "@interfaces/orderProduct";
import { useEditOrderProduct } from "@hooks/orderProduct/useEditOrderProduct";

// Props
type BulkOrderProductsTabProps = {
  order: BulkOrder;
};

export const BulkOrderProductsTab = ({ order }: BulkOrderProductsTabProps) => {
  const { handleDeleteOrderProduct, isDeleting } = useDeleteOrderProduct();
  const { handleEditOrderProduct } = useEditOrderProduct();

  const columns = useMemo<DataTableColumn<OrderProduct>[]>(
    () => [
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
      {
        accessor: "action",
        title: "İşlem",
        render: (orderProduct) => (
          <Group spacing="xs">
            <Button
              size="xs"
              color="gray"
              variant="subtle"
              leftIcon={<IconEdit size={18} />}
              onClick={() => handleEditOrderProduct(orderProduct, order.orderId)}
            >
              Düzenle
            </Button>
            {order.orderProducts.length > 1 && (
              <Button
                size="xs"
                color="red"
                variant="subtle"
                leftIcon={<IconTrash size={18} />}
                onClick={() => handleDeleteOrderProduct(orderProduct.id, order.orderId)}
              >
                Sil
              </Button>
            )}
          </Group>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <LoadingOverlay visible={isDeleting} />
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable<OrderProduct> highlightOnHover records={order.orderProducts} columns={columns} />
      </Paper>
      <Group>
        <Card withBorder shadow="xs" mt="md">
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
