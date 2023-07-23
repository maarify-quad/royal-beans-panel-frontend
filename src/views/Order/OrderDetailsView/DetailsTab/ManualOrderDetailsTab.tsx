import dayjs from "dayjs";

// UI Components
import { SimpleGrid } from "@mantine/core";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { ManualOrder } from "@interfaces/order";

// Props
type ManualOrderDetailsTabProps = {
  order: ManualOrder;
};

export const ManualOrderDetailsTab = ({ order }: ManualOrderDetailsTabProps) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <DetailsCard title="Müşteri" value={order.receiver} />
      <DetailsCard title="Tutar" value={formatCurrency(order.total)} />
      <DetailsCard title="Özel Not" value={order.specialNote || "-"} />
      <DetailsCard title="Fatura Durumu" value={order.manualInvoiceStatus} />
      <DetailsCard
        title="Gönderim Adresi"
        value={
          <>
            {order.receiverNeighborhood} {order.receiverAddress}
            <br />
            {order.receiverProvince} / {order.receiverCity}
            <br />
            {order.receiverPhone}
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
