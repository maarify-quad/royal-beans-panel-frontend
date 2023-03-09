import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { RequestQuery, useGetOrdersByCustomerQuery } from "@services/orderApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type LastOrdersTabProps = {
  customer: string;
};

export const LastOrdersTab = ({ customer }: LastOrdersTabProps) => {
  // State
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 25,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "createdAt",
    direction: "desc",
  });

  // Queries
  const { orders, totalCount, isTableLoading, error } = useGetOrdersByCustomerQuery(
    { customer, query },
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
            {order.orderId}
          </Anchor>
        ),
        sortable: true,
      },
      {
        accessor: "createdAt",
        title: "Tarih",
        render: (order) => dayjs(order.createdAt).format("DD MMMM YYYY"),
        sortable: true,
      },
      {
        accessor: "total",
        title: "Tutar",
        render: (order) => formatCurrency(order.total),
        sortable: true,
      },
    ],
    [orders]
  );

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
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
        recordsPerPage={query.limit || 25}
        totalRecords={totalCount}
        page={query.page || 1}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        sortStatus={sortStatus}
        onSortStatusChange={(status) => {
          setSortStatus(status);
          setQuery((prev) => ({
            ...prev,
            sortBy: status.columnAccessor as keyof Order,
            sortOrder: status.direction === "asc" ? "ASC" : "DESC",
          }));
        }}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit?.toString() || "25"}
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
