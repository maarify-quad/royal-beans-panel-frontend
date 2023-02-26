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
import { IconTrash, IconTruckDelivery, IconBasket, IconCircleCheck } from "@tabler/icons";

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
      {order.type === "BULK" && !order.isParasutVerified ? (
        <Button
          onClick={handleCreateParasutSalesInvoice}
          loading={isCreatingPrasutInvoice}
          disabled={isCreatingPrasutInvoice}
          leftIcon={<img src={ParasutLogo} style={{ height: 30 }} />}
          color="gray"
        >
          Paraşüt
        </Button>
      ) : null}
      <Button color="teal" leftIcon={<IconTruckDelivery />} onClick={openUpdateDelivery}>
        Kargola
      </Button>
      {order.source !== "shopify" && (
        <Button
          color="orange"
          leftIcon={<IconBasket />}
          component={Link}
          to={`/dashboard/orders${order.type === "MANUAL" ? "/manual" : ""}/update/${
            order.orderId
          }`}
        >
          Güncelle
        </Button>
      )}
      {order.source !== "shopify" && (
        <Button
          color="red"
          variant="subtle"
          leftIcon={<IconTrash />}
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
