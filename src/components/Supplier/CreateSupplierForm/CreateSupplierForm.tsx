import React, { useEffect } from "react";

// Services
import { useCreateSupplierMutation } from "@services/supplierApi";

// UI Components
import { Button, LoadingOverlay, TextInput } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { CircleCheck as CircleCheckIcon, X as ErrorIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

export const CreateSupplierForm = () => {
  const [createSupplier, { data, isSuccess, isLoading, error }] = useCreateSupplierMutation();
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateSupplierSubmit = async (inputs: Inputs) => {
    try {
      await createSupplier(inputs);
    } catch {
      showNotification({
        title: "Tedarikçi oluşturulamadı",
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
        message: data?.id
          ? `${data.id} koduyla tedarikçi oluşturuldu`
          : "Tedarikçi oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("createSupplierModal");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Tedarikçi oluşturulamadı",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

  return (
    <form onSubmit={form.onSubmit(onCreateSupplierSubmit)}>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Ad"
        type="text"
        placeholder="Tedarikçi adı"
        autoFocus
        required
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Adres"
        type="text"
        placeholder="Tedarikçi adresi"
        mt="md"
        required
        {...form.getInputProps("address")}
      />
      <TextInput
        label="VKN"
        type="text"
        placeholder="Tedarikçi vergi kimlik no"
        mt="md"
        required
        {...form.getInputProps("taxNo")}
      />
      <TextInput
        label="Vergi dairesi"
        type="text"
        placeholder="Tedarikçi vergi dairesi"
        mt="md"
        required
        {...form.getInputProps("taxOffice")}
      />
      <TextInput
        label="Yetkili adı"
        type="text"
        placeholder="Tedarikçi yetkili adı"
        mt="md"
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Yetkili mevki"
        type="text"
        placeholder="Tedarikçi yetkili mevki"
        mt="md"
        {...form.getInputProps("contactPosition")}
      />
      <TextInput
        label="Yetkili telefon"
        type="text"
        placeholder="Tedarikçi yetkili telefon"
        mt="md"
        {...form.getInputProps("contactPhone")}
      />
      <TextInput
        label="Yetkili e-posta"
        type="text"
        placeholder="Tedarikçi yetkili e-posta"
        mt="md"
        {...form.getInputProps("contactEmail")}
      />
      <Button type="submit" mt="md" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
