import React, { useEffect } from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { LoadingOverlay, Select, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { X as ErrorIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type GeneralStepProps = {
  form: UseFormReturnType<Inputs>;
};

export const GeneralStep: React.FC<GeneralStepProps> = ({ form }) => {
  const { data, isLoading, error } = useGetPriceListsQuery();

  const priceListSelectOptions = React.useMemo(
    () =>
      data?.priceLists.map((product) => ({
        value: product.id,
        label: product.name,
      })) || [],
    [data?.priceLists.length]
  );

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Fiyat listelerine ulaşılamadı",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

  return (
    <React.Fragment>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Müşteri Adı"
        placeholder="Müşteri adı giriniz"
        required
        autoFocus
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Firma Ünvanı"
        placeholder="Firma ünvanı giriniz"
        mt="md"
        {...form.getInputProps("companyTitle")}
      />
      <TextInput
        label="Yetkili adı"
        placeholder="Yetkili adı giriniz"
        mt="md"
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Yetkili mevki"
        placeholder="Yetkili mevki giriniz"
        mt="md"
        {...form.getInputProps("contactTitle")}
      />
      <TextInput
        label="İkincil yetkili adı"
        placeholder="İkincil yetkili adı giriniz"
        mt="md"
        {...form.getInputProps("secondContactName")}
      />
      <TextInput
        label="İkincil yetkili mevki"
        placeholder="İkincil yetkili mevki giriniz"
        mt="md"
        {...form.getInputProps("secondContactTitle")}
      />
      <Select
        label="Fiyat listesi"
        placeholder="Fiyat listesi seçiniz"
        searchable
        mt="md"
        data={priceListSelectOptions}
        {...form.getInputProps("priceListId")}
      />
    </React.Fragment>
  );
};
