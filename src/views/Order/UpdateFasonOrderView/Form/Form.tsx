import React from "react";

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
    const { productId, grindType, weight, quantity } = form.values;

    // Find product
    const product = products?.find((product) => product.id.toString() === productId);

    // Add product to order
    form.insertListItem("orderProducts", {
      product,
      productId: +productId,
      grindType,
      weight,
      quantity,
    });
  };

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
      <Button disabled={form.values.productId === "0"} mt="lg" onClick={handleAddProduct}>
        Ürün ekle
      </Button>
    </>
  );
};
