import React from "react";

// UI Components
import { Grid, NumberInput, Select } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Components
import SelectStorageTypeProduct from "@components/Product/SelectStorageTypeProduct";
import { Summary } from "./Summary";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type StepTwoProps = {
  form: UseFormReturnType<Inputs>;
};

export const StepTwo: React.FC<StepTwoProps> = ({ form }) => {
  return (
    <Grid>
      <Grid.Col lg={6}>
        <SelectStorageTypeProduct
          storageType="YM"
          label="Ürün"
          placeholder="Ürün seçiniz"
          searchable
          withAsterisk
          {...form.getInputProps("productId")}
          onChange={(productId, product) => {
            if (productId && product) {
              form.setFieldValue("productId", productId);
              form.setFieldValue("product", product);
            }
          }}
        />
        <Select
          label="Gramaj"
          placeholder="Gramaj seçiniz"
          mt="md"
          required
          data={[
            { label: "50gr", value: "50gr" },
            { label: "100gr", value: "100gr" },
            { label: "150gr", value: "150gr" },
            { label: "200gr", value: "200gr" },
            { label: "250gr", value: "250gr" },
            { label: "500gr", value: "500gr" },
            { label: "1kg", value: "1kg" },
          ]}
          {...form.getInputProps("weight")}
        />
        <Select
          label="Öğütüm Metodu"
          placeholder="Öğütüm metodu seçiniz"
          mt="md"
          required
          data={[
            { label: "Çekirdek", value: "Çekirdek" },
            { label: "Kağıt Filtre", value: "Kağıt Filtre" },
            { label: "French Press", value: "French Press" },
          ]}
          {...form.getInputProps("grindType")}
        />
        <NumberInput
          label="Miktar"
          placeholder="Miktar giriniz"
          mt="md"
          min={1}
          required
          {...form.getInputProps("quantity")}
        />
      </Grid.Col>
      <Grid.Col lg={6}>
        <Summary form={form} />
      </Grid.Col>
    </Grid>
  );
};
