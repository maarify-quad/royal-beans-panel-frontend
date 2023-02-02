import React, { useMemo } from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetOrdersQuery } from "@services/orderApi";

// UI Components
import { Text, Alert, ThemeIcon, Group, Paper, Select } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

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
  // Internal state
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 25,
  });

  // Routing
  const navigate = useNavigate();

  // Queries
  const { orders, isTableLoading, totalCount, error } = useGetOrdersQuery(
    { ...query, type },
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
      { accessor: "orderId", title: "Sipariş No", render: (order) => `#${order.orderId}` },
      {
        accessor: "createdAt",
        title: "Tarih",
        render: (order) => dayjs(order.createdAt).format("DD MMM YYYY"),
      },
      {
        accessor: "customer",
        title: "Müşteri",
        render: (order) => (order.type === "BULK" ? order.customer.name : order.receiver),
      },
      { accessor: "total", title: "Tutar", render: (order) => formatCurrency(order.total) },
      {
        accessor: "customerBalanceAfterOrder",
        title: "Bakiye",
        render: (order) =>
          order.type === "BULK" ? formatCurrency(order.customerBalanceAfterOrder) : "-",
      },
      {
        accessor: "invoiceStatus",
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
        recordsPerPage={query.limit}
        totalRecords={totalCount}
        page={query.page}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        onRowClick={(order) => navigate(`/dashboard/orders/${order.orderId}`)}
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
