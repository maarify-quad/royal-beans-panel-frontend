import React, { useEffect } from "react";

// Services
import { useCancelOrderMutation } from "@services/orderApi";

// UI Components
import { Text } from "@mantine/core";

// UI Utils
import { openConfirmModal } from "@mantine/modals";
import { hideNotification, showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

export const useCancelOrder = () => {
  const [cancelOrder, { isSuccess: isCancelled }] = useCancelOrderMutation();

  const openCancelOrder = (orderId: string) => {
    openConfirmModal({
      title: "Sipariş İptal Et",
      children: <Text size="sm">#{orderId} siparişini iptal etmek istediğinize emin misiniz?</Text>,
      labels: { confirm: "İptal Et", cancel: "Vazgeç" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        showNotification({
          id: "cancelOrderLoading",
          title: "İptal Ediliyor",
          message: "Sipariş iptal ediliyor...",
          color: "teal",
          loading: true,
          disallowClose: true,
          autoClose: false,
        });

        await cancelOrder(orderId);

        hideNotification("cancelOrderLoading");
      },
    });
  };

  useEffect(() => {
    if (isCancelled) {
      showNotification({
        title: "Başarılı",
        message: "Sipariş iptal edildi",
        color: "green",
        icon: <IconCircleCheck />,
      });
    }
  }, [isCancelled]);

  return { openCancelOrder };
};
