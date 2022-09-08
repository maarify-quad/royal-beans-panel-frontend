import React from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { LoadingOverlay, Select, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type GeneralStepProps = {
  form: UseFormReturnType<Inputs>;
};

export const GeneralStep: React.FC<GeneralStepProps> = ({ form }) => {
  const { data, isLoading } = useGetPriceListsQuery();

  const priceListSelectOptions = React.useMemo(
    () =>
      data?.priceLists.map((product) => ({
        value: product.id,
        label: product.name,
      })) || [],
    [data?.priceLists.length]
  );

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
