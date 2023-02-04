import React from "react";

// Services
import { useUpdateOrderMutation } from "@services/orderApi";

// UI Components
import { Button, Select, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type UpdateDeliveryProps = {
  order: Order;
};

export const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ order }) => {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues: {
      deliveryType: order.deliveryType,
      cargoTrackNo: order.cargoTrackNo || "",
    },
    validate: zodResolver(schema),
  });

  const onUpdateDeliverySubmit = async (values: Inputs) => {
    try {
      await updateOrder({
        orderId: order.orderId,
        ...values,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Sipariş kargolandı",
        color: "green",
        icon: <IconCircleCheck />,
      });
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onUpdateDeliverySubmit)}>
      <Select
        label="Kargo Tipi"
        data={[
          { label: "Kargo", value: "Kargo" },
          { label: "Elden", value: "Elden" },
          { label: "Moto Kurye", value: "Moto Kurye" },
          { label: "Dükkan Teslim", value: "Dükkan Teslim" },
          { label: "Belirsiz", value: "Belirsiz" },
        ]}
        {...form.getInputProps("deliveryType")}
      />
      <TextInput
        label="Kargo Takip No"
        placeholder="(opsiyonel)"
        mt="md"
        {...form.getInputProps("cargoTrackNo")}
      />
      <Button type="submit" mt="md" loading={isUpdating}>
        Kargola
      </Button>
    </form>
  );
};
