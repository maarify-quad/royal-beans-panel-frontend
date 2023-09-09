// Services
import { useCreateDeciMutation } from "@services/deciApi";

// Mantine
import { Button, NumberInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Form
import { CreateDeciValues, createDeciSchema } from "./createDeciForm";

// Icons
import { IconCircleCheck } from "@tabler/icons";

export const CreateDeci = () => {
  const form = useForm<CreateDeciValues>({
    validate: zodResolver(createDeciSchema),
  });

  const [createDeci, { isLoading }] = useCreateDeciMutation();

  const handleSubmit = async (values: CreateDeciValues) => {
    try {
      await createDeci(values).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Desi başarıyla oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });

      closeAllModals();
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <NumberInput label="Desi" placeholder="Desi" withAsterisk {...form.getInputProps("value")} />
      <NumberInput
        label="Fiyat"
        placeholder="Fiyat"
        mt="md"
        withAsterisk
        {...form.getInputProps("price")}
      />
      <Button mt="lg" type="submit" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
