import React, { useMemo, useState } from "react";

// Services
import { useGetOrderProductsByCustomerQuery } from "@services/orderProductApi";

// UI Components
import { Alert, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { OrderProduct } from "@interfaces/orderProduct";

// Props
type LastProductsTabProps = {
  customer: string;
};

export const LastProductsTab: React.FC<LastProductsTabProps> = ({ customer }) => {
  // State
  const [limit, setLimit] = useState(5);

  // Queries
  const { data, isLoading, isFetching, error } = useGetOrderProductsByCustomerQuery({
    customer,
    limit,
  });

  const columns = useMemo<DataTableColumn<OrderProduct>[]>(
    () => [
      {
        title: "Ürün",
        accessor: "priceListProduct.product.name",
      },
      {
        title: "Adet",
        accessor: "quantity",
      },
      {
        title: "Öğütüm",
        accessor: "grindType",
      },
      {
        title: "Birim Fiyat",
        accessor: "unitPrice",
        render: (orderProduct) => formatCurrency(orderProduct.unitPrice),
      },
    ],
    [data]
  );

  if (data?.orderProducts.length === 0) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        <Text size="sm">Bu müşteriye ait son ürün(ler) bulunmamaktadır</Text>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Ürünlere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        records={data?.orderProducts}
        columns={columns}
        fetching={isLoading || isFetching}
        style={{ height: "auto" }}
      />
      <Group spacing="xs" mt="md">
        <Text size="sm">Son</Text>
        <Select
          value={limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setLimit(+limit);
            }
          }}
          data={[
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
          ]}
          style={{ width: 60 }}
          size="xs"
        />
        <Text size="sm">ürün</Text>
      </Group>
    </Paper>
  );
};
