import React from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { SimpleGrid, ThemeIcon } from "@mantine/core";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Icons
import { CircleCheck as CircleCheckIcon, X as XIcon } from "tabler-icons-react";

// Interfaces
import { OrderWithAll } from "@interfaces/order";

// Props
type DetailsTabProps = {
  order: OrderWithAll;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ order }) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <Link to={`/dashboard/customers/${order.customer.id}`} style={{ textDecoration: "none" }}>
        <DetailsCard title="Müşteri" value={order.customer.name} />
      </Link>
      <DetailsCard
        title="Müşteri Bakiye (Sipariş Sonrası)"
        value={`${order.customerBalanceAfterOrder.toFixed(2)} ₺`}
      />
      <DetailsCard title="Tutar" value={`${order.total.toFixed(2)} ₺`} />
      <DetailsCard title="Özel Not" value={order.specialNote || "-"} />
      <DetailsCard
        title="Faturalandırma"
        value={
          order.isParasutVerified ? (
            <ThemeIcon color="green" radius="xl">
              <CircleCheckIcon />
            </ThemeIcon>
          ) : (
            <ThemeIcon color="red" radius="xl">
              <XIcon />
            </ThemeIcon>
          )
        }
      />
      <DetailsCard
        title="Gönderim Adresi"
        value={
          <>
            {order.customer.address || "-"}
            <br />
            {order.customer.city || "-"} / {order.customer.province || "-"}
          </>
        }
      />
      <DetailsCard title="Gönderi Tipi" value={order.deliveryType} />
      <DetailsCard title="Gönderi Durumu" value={order.status} />
      <DetailsCard title="Kargo Takip No" value={order.cargoTrackNo || "-"} />
      <DetailsCard title="Gönderi Tarihi" value={dayjs(order.deliveryDate).format("DD MMM YYYY")} />
      <DetailsCard title="Sipariş Tarihi" value={dayjs(order.createdAt).format("DD MMM YYYY")} />
    </SimpleGrid>
  );
};
