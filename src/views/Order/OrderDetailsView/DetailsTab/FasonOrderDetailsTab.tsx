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
import { FasonOrder } from "@interfaces/order";

// Props
type FasonOrderDetailsTabProps = {
  order: FasonOrder;
};

export const FasonOrderDetailsTab = ({ order }: FasonOrderDetailsTabProps) => {
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
        value="0,00 ₺"
      />
      <DetailsCard title="Tutar" value="0,00 ₺" />
      <DetailsCard title="Özel Not" value={order.specialNote || "-"} />
      <DetailsCard
        title="Faturalandırma"
        value={
          order.isParasutVerified ? (
            <ThemeIcon color="green" radius="xl">
              <IconCircleCheck />
            </ThemeIcon>
          ) : (
            <ThemeIcon color="red" radius="xl">
              <IconX />
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
      <DetailsCard
        title="Gönderi Tarihi"
        value={dayjs(order.deliveryDate).format("DD MMMM YYYY")}
      />
      <DetailsCard title="Sipariş Tarihi" value={dayjs(order.createdAt).format("DD MMMM YYYY")} />
      <DetailsCard title="Oluşturan" value={order.user?.username || "-"} />
    </SimpleGrid>
  );
};
