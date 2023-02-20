// Services
import {
  useCreateDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
} from "@services/deliveryAddressApi";

// UI Components
import { Button, Checkbox, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Utils
import { handleFormError } from "@utils/form";

// Interfaces
import { DeliveryAddress } from "@interfaces/deliveryAddress";

// Props
type Props = {
  customerId: string;
  deliveryAddress?: DeliveryAddress;
};

export const CreateDeliveryAddress = ({ customerId, deliveryAddress }: Props) => {
  const [createDeliveryAddress, { isLoading: isCreating }] = useCreateDeliveryAddressMutation();
  const [updateDeliveryAddress, { isLoading: isUpdating }] = useUpdateDeliveryAddressMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues: deliveryAddress || initialValues,
    validate: zodResolver(schema),
  });

  const onCreateDelieryAddressSubmit = async (values: Inputs) => {
    try {
      if (deliveryAddress) {
        await updateDeliveryAddress({
          id: deliveryAddress.id,
          customerId,
          ...values,
        }).unwrap();
      } else {
        await createDeliveryAddress({
          customerId,
          ...values,
        }).unwrap();
      }

      const message = deliveryAddress ? "güncellendi" : "eklendi";
      showNotification({
        title: "Başarılı",
        message: `Teslimat adresi ${message}`,
        color: "green",
        icon: <IconCircleCheck />,
      });

      closeAllModals();
    } catch {
      // Error is handled by RTK middleware
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateDelieryAddressSubmit, handleFormError)}>
      <TextInput
        label="Adres başlığı"
        placeholder="Adres başlığı giriniz"
        withAsterisk
        {...form.getInputProps("title")}
      />
      <TextInput
        label="Alıcı ad"
        placeholder="Alıcı adı giriniz"
        mt="md"
        withAsterisk
        {...form.getInputProps("receiverName")}
      />
      <TextInput
        label="Alıcı adres"
        placeholder="Alıcı adresi giriniz"
        mt="md"
        withAsterisk
        {...form.getInputProps("receiverAddress")}
      />
      <TextInput
        label="Alıcı telefon"
        placeholder="Alıcı telefonu giriniz"
        mt="md"
        withAsterisk
        {...form.getInputProps("receiverPhone")}
      />
      <TextInput
        label="Alıcı ilçe"
        placeholder="Alıcı ilçe giriniz"
        mt="md"
        withAsterisk
        {...form.getInputProps("receiverProvince")}
      />
      <TextInput
        label="Alıcı il"
        placeholder="Alıcı il giriniz"
        mt="md"
        withAsterisk
        {...form.getInputProps("receiverCity")}
      />
      <Checkbox
        label="Birincil adres"
        {...form.getInputProps("isPrimary")}
        checked={form.values.isPrimary}
        onChange={(event) => form.setFieldValue("isPrimary", event.currentTarget.checked)}
        mt="md"
      />
      <Button
        mt="lg"
        type="submit"
        disabled={isCreating || isUpdating}
        loading={isCreating || isUpdating}
      >
        {deliveryAddress ? "Güncelle" : "Oluştur"}
      </Button>
    </form>
  );
};
