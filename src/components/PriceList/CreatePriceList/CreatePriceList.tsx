import React from "react";

// Services
import { useCreatePriceListMutation } from "@services/priceListApi";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { IconX, IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const CreatePriceList = () => {
  const [createPriceList, { isLoading: isCreating }] = useCreatePriceListMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: zodResolver(schema),
  });

  const onCreatePriceListSubmit = async (values: Inputs) => {
    try {
      await createPriceList(values).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Fiyat listesi oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });
      closeModal("createPriceList");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreatePriceListSubmit)}>
      <TextInput
        label="Fiyat Listesi Adı"
        placeholder="Fiyat listesi adı giriniz"
        required
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Fiyat Listesi Açıklama"
        placeholder="(opsiyonel)"
        mt="md"
        {...form.getInputProps("description")}
      />
      <Button type="submit" mt="lg" loading={isCreating}>
        Oluştur
      </Button>
    </form>
  );
};
