import React from "react";

// UI Components
import { Table, Container, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type CustomersResultProps = {
  customers?: Customer[];
};

export const CustomersResult: React.FC<CustomersResultProps> = ({ customers }) => {
  if (customers?.length === 0) {
    return (
      <Alert icon={<AlertCircleIcon />} color="cyan">
        Bu fiyat listesinde müşteri bulunmamaktadır.
      </Alert>
    );
  }

  return (
    <Container fluid p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Müşteri</th>
            <th>Bakiye</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer, i) => (
            <tr key={i}>
              <td>{customer.name}</td>
              <td>{customer.currentBalance.toFixed(2)} ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
