import React from "react";

// Services
import { useCreatePriceListMutation } from "@services/priceListApi";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Utils
import { handleFormError } from "@utils/form";

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
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreatePriceListSubmit, handleFormError)}>
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
