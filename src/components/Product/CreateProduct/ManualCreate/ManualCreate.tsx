import React from "react";

// Services
import { useCreateProductMutation } from "@services/productApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

export const ManualCreate = () => {
  // Mutations
  const [createProductMutation, { isLoading: isCreating }] = useCreateProductMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateProductSubmit = async (values: Inputs) => {
    try {
      await createProductMutation(values).unwrap();
      showNotification({
        title: "Başarılı",
        message: `${form.values.name} ürünü oluşturuldu`,
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeAllModals();
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateProductSubmit)}>
      <LoadingOverlay visible={isCreating} />
      <TextInput
        label="Ürün adı"
        type="text"
        placeholder="Ürün adı giriniz"
        autoFocus
        required
        {...form.getInputProps("name")}
      />
      <Select
        label="Depo tipi"
        placeholder="Depo tipi seçiniz"
        required
        mt="md"
        data={[
          { label: "HM", value: "HM" },
          { label: "YM", value: "YM" },
          { label: "FN", value: "FN" },
          { label: "Diğer", value: "Other" },
        ]}
        {...form.getInputProps("storageType")}
      />
      <NumberInput
        label="Stok miktarı"
        placeholder="Stok miktarı giriniz"
        min={0}
        precision={2}
        mt="md"
        required
        {...form.getInputProps("amount")}
      />
      <TextInput
        label="Miktar birimi"
        type="text"
        placeholder="Miktar birimi giriniz"
        mt="md"
        required
        {...form.getInputProps("amountUnit")}
      />
      <Button type="submit" mt="md" loading={isCreating}>
        Oluştur
      </Button>
    </form>
  );
};
