import { useMemo } from "react";

// UI Components
import { Badge, Button, Card, Flex, Group, LoadingOverlay, Paper, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Components
import { ShopifyTotalProductCount } from "./ShopifyTotalProductCount";

// Hooks
import { useDeleteOrderProduct } from "@hooks/orderProduct/useDeleteOrderProduct";

// Icons
import { IconTrash } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { ManualOrder } from "@interfaces/order";
import { ManualOrderProduct } from "@interfaces/orderProduct";

// Props
type ManualOrderProductsTabProps = {
  order: ManualOrder;
};

export const ManualOrderProductsTab = ({ order }: ManualOrderProductsTabProps) => {
  const { handleDeleteOrderProduct, isDeleting } = useDeleteOrderProduct();

  const columns = useMemo<DataTableColumn<ManualOrderProduct>[]>(
    () => [
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
      { title: "Öğütüm", accessor: "grindType", hidden: order.source === "shopify" },
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
        render: (orderProduct) =>
          order.orderProducts.length > 1 && (
            <Button
              size="xs"
              color="red"
              variant="subtle"
              leftIcon={<IconTrash size={18} />}
              onClick={() => handleDeleteOrderProduct(orderProduct.id, order.orderId)}
            >
              Sil
            </Button>
          ),
      },
    ],
    []
  );

  return (
    <div>
      <LoadingOverlay visible={isDeleting} />
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable<ManualOrderProduct>
          highlightOnHover
          records={order.orderProducts}
          columns={columns}
        />
      </Paper>
      <Group align="start" mt="md">
        <Card withBorder shadow="xs">
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
        {order.source === "shopify" && (
          <ShopifyTotalProductCount orderProduts={order.orderProducts} />
        )}
      </Group>
    </div>
  );
};
