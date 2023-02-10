import React from "react";

// UI Components
import { Table, Paper, Alert, ThemeIcon, Flex } from "@mantine/core";

// Icons
import { IconInfoCircle, IconUserOff } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

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
              <td>
                <Flex gap="xs">
                  {customer.name}
                  {customer.deletedAt && (
                    <ThemeIcon variant="outline" size="sm" color="red">
                      <IconUserOff />
                    </ThemeIcon>
                  )}
                </Flex>
              </td>
              <td>{formatCurrency(customer.currentBalance)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};
