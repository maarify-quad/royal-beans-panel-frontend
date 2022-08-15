import React from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { Table, Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

export const Results = () => {
  // Queries
  const { data, isLoading, error } = useGetCustomersQuery();

  // Routing
  const navigate = useNavigate();

  const handleRowClick = (id: number) => () => {
    navigate(`/dashboard/customers/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Müşterilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.customers.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Müşteri bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Müşteri</th>
            <th>Bakiye</th>
          </tr>
        </thead>
        <tbody>
          {data?.customers.map((customer, i) => (
            <tr
              onClick={handleRowClick(customer.id)}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              key={i}
            >
              <td>{customer.name}</td>
              <td>{customer.currentBalance} ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
