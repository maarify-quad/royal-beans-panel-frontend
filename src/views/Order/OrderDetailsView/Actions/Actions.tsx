import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { Button, Group, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Hooks
import { useCancelOrder } from "@hooks/order/useCancelOrder";

// Icons
import { IconTrash, IconTruckDelivery, IconBasket } from "@tabler/icons";

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
  const { openCancelOrder } = useCancelOrder();

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
    return <></>;
  }

  return (
    <Group>
      <Button color="teal" leftIcon={<IconTruckDelivery />} onClick={openUpdateDelivery}>
        Kargola
      </Button>
      <Button
        color="orange"
        leftIcon={<IconBasket />}
        component={Link}
        to={`/dashboard/orders/update/${order.orderNumber}`}
      >
        Güncelle
      </Button>
      <Button
        color="red"
        variant="subtle"
        leftIcon={<IconTrash />}
        onClick={() => {
          openCancelOrder(order.orderNumber);
        }}
      >
        İptal Et
      </Button>
    </Group>
  );
};
