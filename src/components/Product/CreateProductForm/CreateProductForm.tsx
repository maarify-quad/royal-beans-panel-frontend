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
import { CircleCheck as CircleCheckIcon, X as ErrorIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

export const CreateProductForm = () => {
  // Mutations
  const [createProductMutation, { isSuccess, isLoading, error }] = useCreateProductMutation();

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
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: `${form.values.name} ürünü oluşturuldu`,
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("createProductModal");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Ürün oluşturulamadı",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

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
