import React, { useEffect } from "react";

// Services
import { useCreateProductMutation } from "@services/productApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { IconCircleCheck, IconX } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

export const ManualCreate = () => {
  // Mutations
  const [createProductMutation, { isSuccess, isLoading }] = useCreateProductMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateProductSubmit = async (values: Inputs) => {
    try {
      await createProductMutation(values);
    } catch {
      showNotification({
        title: "Ürün oluşturulamadı",
        message: "Beklenmedik bir hata oluştu",
        icon: <IconX />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: `${form.values.name} ürünü oluşturuldu`,
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeModal("createProduct");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={form.onSubmit(onCreateProductSubmit)}>
      <LoadingOverlay visible={isLoading} />
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
      <Button type="submit" mt="md" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
