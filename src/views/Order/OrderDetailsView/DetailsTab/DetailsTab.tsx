import React from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { SimpleGrid, ThemeIcon } from "@mantine/core";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Icons
import { IconCircleCheck, IconX } from "@tabler/icons";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type DetailsTabProps = {
  order: Order;
};

const currencyFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const DetailsTab: React.FC<DetailsTabProps> = ({ order }) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      {order.type === "BULK" ? (
        <Link to={`/dashboard/customers/${order.customer.id}`} style={{ textDecoration: "none" }}>
          <DetailsCard title="Müşteri" value={order.customer.name} />
        </Link>
      ) : (
        <DetailsCard title="Müşteri" value={order.receiver} />
      )}
      {order.type === "BULK" && (
        <DetailsCard
          title="Müşteri Bakiye (Sipariş Sonrası)"
          value={currencyFormatter.format(order.customerBalanceAfterOrder)}
        />
      )}
      <DetailsCard title="Tutar" value={currencyFormatter.format(order.total)} />
      <DetailsCard title="Özel Not" value={order.specialNote || "-"} />
      <DetailsCard
        title={order.type === "BULK" ? "Faturalandırma" : "Fatura Durumu"}
        value={
          order.type === "BULK" ? (
            order.isParasutVerified ? (
              <ThemeIcon color="green" radius="xl">
                <IconCircleCheck />
              </ThemeIcon>
            ) : (
              <ThemeIcon color="red" radius="xl">
                <IconX />
              </ThemeIcon>
            )
          ) : (
            order.manualInvoiceStatus
          )
        }
      />
      <DetailsCard
        title="Gönderim Adresi"
        value={
          order.type === "BULK" ? (
            <>
              {order.customer.address || "-"}
              <br />
              {order.customer.city || "-"} / {order.customer.province || "-"}
            </>
          ) : (
            <>
              {order.receiverNeighborhood} {order.receiverAddress}
              <br />
              {order.receiverProvince} / {order.receiverCity}
            </>
          )
        }
      />
      <DetailsCard title="Gönderi Tipi" value={order.deliveryType} />
      <DetailsCard title="Gönderi Durumu" value={order.status} />
      <DetailsCard title="Kargo Takip No" value={order.cargoTrackNo || "-"} />
      <DetailsCard
        title="Gönderi Tarihi"
        value={dayjs(order.deliveryDate).format("DD MMMM YYYY")}
      />
      <DetailsCard title="Sipariş Tarihi" value={dayjs(order.createdAt).format("DD MMMM YYYY")} />
    </SimpleGrid>
  );
};
