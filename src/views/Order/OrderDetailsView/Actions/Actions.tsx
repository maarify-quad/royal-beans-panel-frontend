import React, { useEffect } from "react";

// Services
import { useCancelOrderMutation } from "@services/orderApi";

// UI Components
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Icons
import {
  Trash as TrashIcon,
  TruckDelivery as TruckDeliveryIcon,
  CircleCheck as SuccessIcon,
  X as ErrorIcon,
} from "tabler-icons-react";

// Interfaces
import { OrderWithAll } from "@interfaces/order";

// Props
type ActionsProps = {
  order: OrderWithAll;
};

// Lazy Imports
const UpdateDelivery = React.lazy(() =>
  import("../../../../components/Order/UpdateDelivery").then((module) => ({
    default: module.UpdateDelivery,
  }))
);

export const Actions: React.FC<ActionsProps> = ({ order }) => {
  const [cancelOrder, { isLoading: isCancelling, isSuccess: isCancelled, error: cancelError }] =
    useCancelOrderMutation();

  const openUpdateDelivery = () => {
    openModal({
      key: "updateDelivery",
      title: "Kargola",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <UpdateDelivery order={order} />
        </React.Suspense>
      ),
    });
  };

  const openCancelOrder = () => {
    openConfirmModal({
      centered: true,
      title: "Sipariş iptal et",
      children: <Text size="sm">Siparişi iptal etmek istediğinize emin misiniz?</Text>,
      labels: { confirm: "İptal Et", cancel: "Vazgeç" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await cancelOrder(order.orderNumber);
      },
    });
  };

  useEffect(() => {
    if (isCancelled) {
      showNotification({
        title: "Başarılı",
        message: "Sipariş iptal edildi",
        color: "green",
        icon: <SuccessIcon />,
      });
    }
  }, [isCancelled]);

  useEffect(() => {
    if (cancelError) {
      showNotification({
        title: "Sipariş iptal edilemedi",
        message: (cancelError as any)?.data?.message || "Beklenmedik bir hata oluştu",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  }, [cancelError]);

  return (
    <Group>
      <Button leftIcon={<TruckDeliveryIcon />} onClick={openUpdateDelivery}>
        Kargola
      </Button>
      <Button
        color="red"
        variant="subtle"
        leftIcon={<TrashIcon />}
        onClick={openCancelOrder}
        loading={isCancelling}
      >
        İptal Et
      </Button>
    </Group>
  );
};
