import React, { useEffect } from "react";

// Services
import { useUpdateOrderMutation } from "@services/orderApi";

// UI Components
import { Button, Select, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { X as ErrorIcon, CircleCheck as SuccessIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Interfaces
import { Order } from "@interfaces/order";
import { closeModal } from "@mantine/modals";

// Props
type UpdateDeliveryProps = {
  order: Order;
};

export const UpdateDelivery: React.FC<UpdateDeliveryProps> = ({ order }) => {
  const [updateOrder, { isLoading: isUpdating, isSuccess: isUpdated }] = useUpdateOrderMutation();

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
        orderNumber: order.orderNumber,
        ...values,
      });
    } catch (error) {
      showNotification({
        title: "Sipariş kargolanamdı",
        message: "Beklenmedik bir hata oluştu",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  };

  useEffect(() => {
    if (isUpdated) {
      showNotification({
        title: "Başarılı",
        message: "Sipariş kargolandı",
        color: "green",
        icon: <SuccessIcon />,
      });
      closeModal("updateDelivery");
    }
  }, [isUpdated]);

  return (
    <form onSubmit={form.onSubmit(onUpdateDeliverySubmit)}>
      <Select
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
