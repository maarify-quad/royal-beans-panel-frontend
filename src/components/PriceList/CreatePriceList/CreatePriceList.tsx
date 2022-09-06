import React, { useEffect } from "react";

// Services
import { useCreatePriceListMutation } from "@services/priceListApi";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { X as ErrorIcon, CircleCheck as SuccessIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const CreatePriceList = () => {
  const [createPriceList, { isLoading: isCreating, isSuccess: isCreated }] =
    useCreatePriceListMutation();

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
      await createPriceList(values);
    } catch (error) {
      showNotification({
        title: "Hata",
        message: "Beklenmedik bir hata oluştu",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  };

  useEffect(() => {
    if (isCreated) {
      showNotification({
        title: "Başarılı",
        message: "Fiyat listesi oluşturuldu",
        color: "green",
        icon: <SuccessIcon />,
      });
      closeModal("createPriceList");
    }
  }, [isCreated]);

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
      <Button type="submit" mt="md">
        Oluştur
      </Button>
    </form>
  );
};
