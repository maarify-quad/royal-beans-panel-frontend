// Services
import { Deci, useUpdateDeciMutation } from "@services/deciApi";

// Mantine
import { useForm, zodResolver } from "@mantine/form";
import { Button, NumberInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Form
import { EditDeciValues, editDeciSchema } from "./editDeciForm";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Props
type Props = {
  deci: Deci;
};

export const EditDeci = ({ deci }: Props) => {
  const form = useForm<EditDeciValues>({
    validate: zodResolver(editDeciSchema),
    initialValues: {
      price: deci.price,
    },
  });

  const [updateDeci, { isLoading }] = useUpdateDeciMutation();

  const handleSubmit = async (values: EditDeciValues) => {
    try {
      await updateDeci({ id: deci.id, ...values }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Desi başarıyla güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });

      closeAllModals();
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <NumberInput
        label="Fiyat"
        placeholder="Fiyat"
        withAsterisk
        {...form.getInputProps("price")}
      />
      <Button mt="lg" type="submit" loading={isLoading}>
        Kaydet
      </Button>
    </form>
  );
};
