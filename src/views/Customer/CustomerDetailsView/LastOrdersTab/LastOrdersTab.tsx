import React, { useMemo } from "react";
import dayjs from "dayjs";

// Services
import { useGetOrdersByCustomerQuery } from "@services/orderApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Order } from "@interfaces/order";
import { Link } from "react-router-dom";

// Props
type LastOrdersTabProps = {
  customer: string;
};

export const LastOrdersTab: React.FC<LastOrdersTabProps> = ({ customer }) => {
  // Internal state
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { orders, totalCount, isTableLoading, error } = useGetOrdersByCustomerQuery(
    { customer, ...query },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        orders: data?.orders,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
        ...rest,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Order>[]>(
    () => [
      {
        accessor: "orderId",
        title: "Sipariş No",
        render: (order) => (
          <Anchor component={Link} to={`/dashboard/orders/${order.orderId}`}>
            #{order.orderId}
          </Anchor>
        ),
      },
      {
        accessor: "createdAt",
        title: "Tarih",
        render: (order) => dayjs(order.createdAt).format("DD MMM YYYY"),
      },
      {
        accessor: "total",
        title: "Tutar",
        render: (order) => formatCurrency(order.total),
      },
    ],
    [orders]
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Siparişlere ulaşılamadı"
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
        highlightOnHover
        records={orders}
        columns={columns}
        fetching={isTableLoading}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit}
        totalRecords={totalCount}
        page={query.page}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setQuery({ page: 1, limit: +limit });
            }
          }}
          data={[
            { label: "25", value: "25" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
          ]}
          style={{ width: 60 }}
          size="xs"
        />
      </Group>
    </Paper>
  );
};
