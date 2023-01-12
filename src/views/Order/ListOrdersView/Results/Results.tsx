import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetOrdersQuery } from "@services/orderApi";

// UI Components
import { Container, Loader, Alert, ThemeIcon, Group } from "@mantine/core";

// Icons
import { IconInfoCircle, IconCircleCheck, IconX } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";
import { StatusBadge } from "@components/Order/StatusBadge";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";
import { OrderType } from "@interfaces/order";

// Props
type ResultsProps = {
  type?: OrderType;
};

const currencyFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const Results = ({ type }: ResultsProps) => {
  // Internal state
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 50,
  });

  // Routing
  const navigate = useNavigate();

  // Queries
  const { data, isLoading, isFetching, error } = useGetOrdersQuery({ ...filters, type });

  const orderRows: RowDef[][] = React.useMemo(
    () =>
      data?.orders.map((order) => [
        { value: order.orderId, renderCell: () => `#${order.orderId}` },
        { value: dayjs(order.createdAt).format("DD MMM YYYY") },
        { value: order.type === "BULK" ? order.customer.name : order.receiver },
        { value: currencyFormatter.format(order.total) },
        {
          value:
            order.type === "BULK" ? currencyFormatter.format(order.customerBalanceAfterOrder) : "-",
        },
        {
          value:
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
          value: (
            <Group>
              <StatusBadge status={order.status} deliveryType={order.deliveryType} />
              {order.isCancelled && <StatusBadge status={"İPTAL"} />}
            </Group>
          ),
        },
      ]) || [],
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert icon={<IconInfoCircle />} color="red" title="Siparişlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.orders.length === 0) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        Sipariş bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid p={0}>
      <ResultsTable
        headers={[
          { value: "Sipariş No" },
          { value: "Tarih" },
          { value: "Müşteri" },
          { value: "Tutar" },
          { value: "Bakiye" },
          { value: "Fatura" },
          { value: "Durum" },
        ]}
        rows={orderRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: filters.page,
          onPageChange: (page) => setFilters({ ...filters, page }),
          onPageSizeChange: (limit) => setFilters({ ...filters, limit }),
        }}
        onRowClick={(row, i) => {
          const orderId = row[0].value;
          navigate(`/dashboard/orders/${orderId}`);
        }}
        rowStyles={{
          cursor: "pointer",
        }}
        isLoading={isFetching}
      />
    </Container>
  );
};
