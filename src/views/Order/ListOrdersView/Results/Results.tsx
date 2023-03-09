import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { RequestQuery, useGetOrdersQuery } from "@services/orderApi";

// UI Components
import { Text, Alert, ThemeIcon, Group, Paper, Select } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Icons
import { IconInfoCircle, IconCircleCheck, IconX } from "@tabler/icons";

// Components
import { StatusBadge } from "@components/Order/StatusBadge";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Order, OrderType } from "@interfaces/order";

// Props
type ResultsProps = {
  type?: OrderType;
};

export const Results = ({ type }: ResultsProps) => {
  // State
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 1,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "createdAt",
    direction: "desc",
  });

  // Routing
  const navigate = useNavigate();

  // Queries
  const { orders, isTableLoading, totalCount, error } = useGetOrdersQuery(
    { type, query },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        ...rest,
        orders: data?.orders,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Order>[]>(
    () => [
      {
        accessor: "orderId",
        title: "Sipariş No",
        render: (order) => `#${order.orderId}`,
        sortable: true,
      },
      {
        accessor: "createdAt",
        title: "Tarih",
        render: (order) => dayjs(order.createdAt).format("DD MMMM YYYY"),
        sortable: true,
      },
      {
        accessor: "customer",
        title: "Müşteri",
        render: (order) => (order.type === "BULK" ? order.customer.name : order.receiver),
      },
      {
        accessor: "total",
        title: "Tutar",
        render: (order) => formatCurrency(order.total),
        sortable: true,
      },
      {
        accessor: "customerBalanceAfterOrder",
        title: "Bakiye",
        render: (order) =>
          order.type === "BULK" ? formatCurrency(order.customerBalanceAfterOrder) : "-",
        sortable: true,
      },
      {
        accessor: "isParasutVerified",
        title: "Fatura",
        render: (order) =>
          order.type === "BULK" ? (
            <>
              {order.isParasutVerified ? (
                <ThemeIcon color="green" radius="xl">
                  <IconCircleCheck />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="red" radius="xl">
                  <IconX />
                </ThemeIcon>
              )}
            </>
          ) : (
            order.manualInvoiceStatus
          ),
        sortable: true,
      },
      {
        accessor: "status",
        title: "Durum",
        render: (order) => (
          <Group>
            <StatusBadge status={order.status} deliveryType={order.deliveryType} />
            {order.isCancelled && <StatusBadge status={"İPTAL"} />}
          </Group>
        ),
      },
    ],
    [orders]
  );

  if (error) {
    return (
      <Alert icon={<IconInfoCircle />} color="red" title="Siparişlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (orders?.length === 0) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        Sipariş bulunmamaktadır
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
        onRowClick={(order) => navigate(`/dashboard/orders/${order.orderId}`)}
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
            { label: "1", value: "1" },
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
