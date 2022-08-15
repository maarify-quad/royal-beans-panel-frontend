import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetOrdersQuery } from "@services/orderApi";

// UI Components
import { Table, Container, Loader, Alert, ThemeIcon } from "@mantine/core";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  CircleCheck as CircleCheckIcon,
  X as XIcon,
} from "tabler-icons-react";
import { StatusBadge } from "@components/Order/StatusBadge";

export const Results = () => {
  // Queries
  const { data, isLoading, error } = useGetOrdersQuery();

  // Routing
  const navigate = useNavigate();

  const handleRowClick = (id: number) => () => {
    navigate(`/dashboard/orders/${id}`);
  };

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
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Tarih</th>
            <th>Müşteri</th>
            <th>Tutar</th>
            <th>Bakiye</th>
            <th>Fatura</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {data?.orders.map((order, i) => (
            <tr
              onClick={handleRowClick(order.id)}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              key={i}
            >
              <td>{order.orderNumber}</td>
              <td>{dayjs(order.createdAt).format("DD MMM YYYY")}</td>
              <td>{order.customer.name}</td>
              <td>{order.total} ₺</td>
              <td>{order.customerBalanceAfterOrder} ₺</td>
              <td>
                {order.isParasutVerified ? (
                  <ThemeIcon color="green" radius="xl">
                    <CircleCheckIcon />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="red" radius="xl">
                    <XIcon />
                  </ThemeIcon>
                )}
              </td>
              <td>
                <StatusBadge status={order.status} deliveryType={order.deliveryType} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
