import React, { useEffect } from "react";

// UI Components
import { Button, NumberInput, Select } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "./validation/Inputs";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type FormProps = {
  form: UseFormReturnType<Inputs>;
  products?: Product[];
};

export const Form = ({ form, products }: FormProps) => {
  const productSelectOptions = React.useMemo(
    () =>
      products?.map((product) => ({
        value: product.id.toString(),
        label: product.name,
      })) || [],
    [products]
  );

  const handleAddProduct = () => {
    // Destructure form values
    const { productId, grindType, unitPrice, quantity, taxRate, subTotal, total } = form.values;

    // Find price list product
    const product = products?.find((product) => product.id.toString() === productId);

    // Add product to order
    form.insertListItem("orderProducts", {
      product,
      productId: +productId,
      grindType,
      unitPrice,
      quantity,
      taxRate,
      subTotal,
      total,
    });
  };

  useEffect(() => {
    const subTotal = form.values.unitPrice * form.values.quantity;
    const tax = form.values.taxRate !== 0 ? (subTotal * form.values.taxRate) / 100 : 0;

    form.setFieldValue("subTotal", subTotal);
    form.setFieldValue("total", subTotal + tax);
  }, [form.values.quantity, form.values.unitPrice, form.values.taxRate]);

  return (
    <>
      <Select
        label="Ürün"
        placeholder="Ürün seçiniz"
        searchable
        required
        data={productSelectOptions}
        {...form.getInputProps("productId")}
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
        min={0}
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
      <Button disabled={!form.values.productId} mt="lg" onClick={handleAddProduct}>
        Ürün ekle
      </Button>
    </>
  );
};
