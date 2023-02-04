import React from "react";

// UI Components
import { Table, Paper, Alert } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type CustomersResultProps = {
  customers?: Customer[];
};

export const CustomersResult: React.FC<CustomersResultProps> = ({ customers }) => {
  if (customers?.length === 0) {
    return (
      <Alert icon={<IconInfoCircle />} color="cyan">
        Bu fiyat listesinde müşteri bulunmamaktadır.
      </Alert>
    );
  }

  return (
    <Paper p="sm" radius="md" shadow="sm" withBorder>
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
    </Paper>
  );
};
