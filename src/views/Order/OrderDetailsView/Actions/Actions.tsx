import React from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useCreateParasutSalesInvoiceMutation } from "@services/parasutApi";

// UI Components
import { Button, Group, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Hooks
import { useCancelOrder } from "@hooks/order/useCancelOrder";

// Icons
import {
  IconTrash,
  IconTruckDelivery,
  IconBasket,
  IconCircleCheck,
  IconRepeat,
} from "@tabler/icons";

// Interfaces
import { Order } from "@interfaces/order";

// Assets
import ParasutLogo from "@assets/parasut-logo.png";

// Props
type ActionsProps = {
  order: Order;
};

// Lazy Imports
const UpdateDelivery = React.lazy(() =>
  import("@components/Order/UpdateDelivery").then((module) => ({
    default: module.UpdateDelivery,
  }))
);

export const Actions = ({ order }: ActionsProps) => {
  // Mutataions
  const [createParasutSalesInvoice, { isLoading: isCreatingPrasutInvoice }] =
    useCreateParasutSalesInvoiceMutation();

  // Hooks
  const { openCancelOrder } = useCancelOrder();

  // Handlers
  const handleCreateParasutSalesInvoice = async () => {
    try {
      await createParasutSalesInvoice({
        orderId: order.orderId,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Paraşüt satış faturası oluşturuldu.",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch {}
  };

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

  if (order.isCancelled) {
    return null;
  }

  return (
    <Group>
      <Button color="teal" leftIcon={<IconTruckDelivery size={20} />} onClick={openUpdateDelivery}>
        Kargola
      </Button>
      {order.source !== "shopify" && (
        <Button
          color="violet"
          leftIcon={<IconBasket size={20} />}
          component={Link}
          to={`/dashboard/orders${order.type === "MANUAL" ? "/manual" : ""}/update/${
            order.orderId
          }`}
        >
          Güncelle
        </Button>
      )}
      {order.type === "BULK" && !order.isParasutVerified ? (
        <Button
          onClick={handleCreateParasutSalesInvoice}
          loading={isCreatingPrasutInvoice}
          disabled={isCreatingPrasutInvoice}
          leftIcon={<img src={ParasutLogo} style={{ height: 25 }} />}
          color="orange"
          variant="outline"
        >
          Paraşüt
        </Button>
      ) : null}
      {order.type === "BULK" && (
        <Button color="gray" variant="light" leftIcon={<IconRepeat size={20} />}>
          Tekrarla
        </Button>
      )}
      {order.source !== "shopify" && (
        <Button
          color="red"
          variant="subtle"
          leftIcon={<IconTrash size={20} />}
          onClick={() => {
            openCancelOrder(order.orderId);
          }}
        >
          İptal Et
        </Button>
      )}
    </Group>
  );
};
