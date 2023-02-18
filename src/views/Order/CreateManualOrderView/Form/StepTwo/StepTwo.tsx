import React, { useEffect, useMemo } from "react";

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
  useEffect(() => {
    const subTotal = form.values.unitPrice * form.values.quantity;
    const tax = form.values.taxRate !== 0 ? (subTotal * form.values.taxRate) / 100 : 0;

    form.setFieldValue("subTotal", subTotal);
    form.setFieldValue("total", subTotal + tax);
  }, [form.values.quantity, form.values.unitPrice, form.values.taxRate]);

  return (
    <Grid>
      <Grid.Col lg={6}>
        <SelectStorageTypeProduct
          storageType="FN"
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
          label="Öğütme Metodu"
          placeholder="Öğütme metodu seçiniz"
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
          label="Adet"
          placeholder="Adet giriniz"
          mt="md"
          min={1}
          required
          {...form.getInputProps("quantity")}
        />
        <NumberInput
          label="Birim Fiyat"
          precision={2}
          min={0}
          icon={<span>₺</span>}
          mt="md"
          {...form.getInputProps("unitPrice")}
        />
        <NumberInput
          label="KDV Oranı"
          icon={<span>%</span>}
          min={0}
          mt="md"
          {...form.getInputProps("taxRate")}
        />
        <NumberInput
          label="Ara Toplam"
          readOnly
          hideControls
          precision={2}
          icon={<span>₺</span>}
          mt="md"
          {...form.getInputProps("subTotal")}
        />
        <NumberInput
          label="Toplam"
          readOnly
          hideControls
          precision={2}
          icon={<span>₺</span>}
          mt="md"
          {...form.getInputProps("total")}
        />
      </Grid.Col>
      <Grid.Col lg={6}>
        <Summary form={form} />
      </Grid.Col>
    </Grid>
  );
};
