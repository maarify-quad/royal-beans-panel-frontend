import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetOrdersQuery } from "@services/orderApi";

// UI Components
import { Container, Loader, Alert, ThemeIcon } from "@mantine/core";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  CircleCheck as CircleCheckIcon,
  X as XIcon,
} from "tabler-icons-react";

// Components
import { ResultsTable } from "@components/ResultsTable";
import { StatusBadge } from "@components/Order/StatusBadge";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Routing
  const navigate = useNavigate();

  // Queries
  const { data, isLoading, error } = useGetOrdersQuery(page);

  const orderRows: RowDef[][] = React.useMemo(
    () =>
      data?.orders.map((order) => [
        { value: order.orderNumber, renderCell: () => `#${order.orderNumber}` },
        { value: dayjs(order.createdAt).format("DD MMM YYYY") },
        { value: order.customer.name },
        { value: `${order.total} ₺` },
        { value: `${order.customerBalanceAfterOrder} ₺` },
        {
          value: order.isParasutVerified ? (
            <ThemeIcon color="green" radius="xl">
              <CircleCheckIcon />
            </ThemeIcon>
          ) : (
            <ThemeIcon color="red" radius="xl">
              <XIcon />
            </ThemeIcon>
          ),
        },
        { value: <StatusBadge status={order.status} deliveryType={order.deliveryType} /> },
      ]) || [],
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Siparişlere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.orders.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Sipariş bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
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
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
        onRowClick={(row, i) => {
          const orderNumber = row[0].value;
          navigate(`/dashboard/orders/${orderNumber}`);
        }}
        rowStyles={{
          cursor: "pointer",
        }}
      />
    </Container>
  );
};
