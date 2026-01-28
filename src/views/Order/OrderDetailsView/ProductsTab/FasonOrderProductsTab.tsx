import { useMemo } from "react";

// UI Components
import { Badge, Button, Card, Flex, Group, LoadingOverlay, Paper, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Hooks
import { useDeleteOrderProduct } from "@hooks/orderProduct/useDeleteOrderProduct";

// Icons
import { IconTrash } from "@tabler/icons";

// Interfaces
import { FasonOrder } from "@interfaces/order";

// Props
type FasonOrderProductsTabProps = {
  order: FasonOrder;
};

export const FasonOrderProductsTab = ({ order }: FasonOrderProductsTabProps) => {
  const { handleDeleteOrderProduct, isDeleting } = useDeleteOrderProduct();

  const columns = useMemo<DataTableColumn<FasonOrder["orderProducts"][number]>[]>(
    () => [
      {
        title: "Ürün",
        accessor: "product.name",
        render: (orderProduct) => (
          <Flex align="center" gap="xs">
            <Text>{orderProduct.product.name}</Text>
            {orderProduct.product.deletedAt && (
              <Badge color="red" size="sm">
                İNAKTİF
              </Badge>
            )}
          </Flex>
        ),
      },
      { 
        title: "Gramaj", 
        accessor: "weight",
        render: (orderProduct) => <Text>{orderProduct.weight}</Text>
      },
      { 
        title: "Öğütüm", 
        accessor: "grindType",
        render: (orderProduct) => <Text>{orderProduct.grindType}</Text>
      },
      { 
        title: "Miktar", 
        accessor: "quantity",
        render: (orderProduct) => <Text>{orderProduct.quantity} adet</Text>
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
    [order.orderProducts.length, order.orderId]
  );

  return (
    <div>
      <LoadingOverlay visible={isDeleting} />
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable
          highlightOnHover
          records={order.orderProducts}
          columns={columns}
        />
      </Paper>
    </div>
  );
};
