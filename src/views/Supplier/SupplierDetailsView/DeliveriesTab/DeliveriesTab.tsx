import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// UI Components
import { Table, ScrollArea, Container } from "@mantine/core";

// Interfaces
import { Delivery } from "@interfaces/delivery";

// Props
type DeliveriesTabProps = {
  deliveries: Delivery[];
};

export const DeliveriesTab: React.FC<DeliveriesTabProps> = ({ deliveries }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => () => {
    navigate(`/dashboard/deliveries/${id}`);
  };

  return (
    <Container fluid p={0}>
      <ScrollArea>
        <Table highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              <th>Sevkiyat Tarihi</th>
              <th>Sevkiyat Kodu</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, i) => (
              <tr
                onClick={handleRowClick(delivery.id)}
                style={{
                  cursor: "pointer",
                  width: "100%",
                }}
                key={i}
              >
                <td>{dayjs(delivery.deliveryDate).format("DD MMM YYYY")}</td>
                <td>{delivery.id}</td>
                <td>{delivery.total} ₺</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};
