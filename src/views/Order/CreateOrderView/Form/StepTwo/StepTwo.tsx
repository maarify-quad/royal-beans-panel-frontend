import React, { useEffect } from "react";

// UI Components
import { Grid, NumberInput, Select } from "@mantine/core";

// Validation
import { Inputs } from "../validation/Inputs";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";
import { UseFormReturnType } from "@mantine/form";
import { Summary } from "./Summary";

// Props
type StepTwoProps = {
  form: UseFormReturnType<Inputs>;
  priceListProducts?: PriceListProduct[];
};

export const StepTwo: React.FC<StepTwoProps> = ({ form, priceListProducts }) => {
  const priceListProductsSelectOptions = React.useMemo(
    () =>
      priceListProducts?.map((priceListProduct) => ({
        label: priceListProduct.product.name,
        value: priceListProduct.id,
      })) || [],
    [priceListProducts?.length]
  );

  useEffect(() => {
    const priceListProduct = priceListProducts?.find(
      (priceListProduct) => priceListProduct.id === form.values.priceListProductId
    );

    if (priceListProduct) {
      const subTotal = priceListProduct.unitPrice * form.values.quantity;
      const tax = priceListProduct.taxRate !== 0 ? (subTotal * priceListProduct.taxRate) / 100 : 0;

      form.setFieldValue("unitPrice", priceListProduct.unitPrice);
      form.setFieldValue("taxRate", priceListProduct.taxRate);
      form.setFieldValue("subTotal", subTotal);
      form.setFieldValue("total", subTotal + tax);
    }
  }, [form.values.priceListProductId, form.values.quantity]);

  return (
    <Grid>
      <Grid.Col lg={6}>
        <Select
          label="Ürün"
          placeholder="Ürün seçiniz"
          searchable
          required
          data={priceListProductsSelectOptions}
          {...form.getInputProps("priceListProductId")}
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
          readOnly
          hideControls
          icon={<span>₺</span>}
          mt="md"
          {...form.getInputProps("unitPrice")}
        />
        <NumberInput
          label="KDV Oranı"
          readOnly
          hideControls
          icon={<span>%</span>}
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
