import React from "react";

// Services
import { useCreateDeliveryAddressMutation } from "@services/deliveryAddressApi";

// UI Components
import { Button, LoadingOverlay, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";
import { closeAllModals } from "@mantine/modals";

// Utils
import { handleFormError } from "@utils/form";

// Props
type CreateDeliveryAddressProps = {
  customerId: string;
};

export const CreateDeliveryAddress: React.FC<CreateDeliveryAddressProps> = ({ customerId }) => {
  const [createDeliveryAddress, { isLoading: isCreating }] = useCreateDeliveryAddressMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onCreateDelieryAddressSubmit = async (values: Inputs) => {
    try {
      await createDeliveryAddress({
        customerId,
        ...values,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Sevkiyat adresi oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateDelieryAddressSubmit, handleFormError)}>
      <LoadingOverlay visible={isCreating} />
      <TextInput
        label="Adres başlığı"
        placeholder="Adres başlığı giriniz"
        required
        {...form.getInputProps("title")}
      />
      <TextInput
        label="Alıcı ad"
        placeholder="Alıcı adı giriniz"
        mt="md"
        required
        {...form.getInputProps("receiverName")}
      />
      <TextInput
        label="Alıcı adres"
        placeholder="Alıcı adresi giriniz"
        mt="md"
        required
        {...form.getInputProps("receiverAddress")}
      />
      <TextInput
        label="Alıcı telefon"
        placeholder="Alıcı telefonu giriniz"
        mt="md"
        required
        {...form.getInputProps("receiverPhone")}
      />
      <TextInput
        label="Alıcı ilçe"
        placeholder="Alıcı ilçe giriniz"
        mt="md"
        required
        {...form.getInputProps("receiverProvince")}
      />
      <TextInput
        label="Alıcı il"
        placeholder="Alıcı il giriniz"
        mt="md"
        required
        {...form.getInputProps("receiverCity")}
      />
      <Button mt="lg" type="submit" disabled={isCreating} loading={isCreating}>
        Oluştur
      </Button>
    </form>
  );
};
