import React, { useEffect } from "react";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Select, NumberInput, Button, LoadingOverlay, Group } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "./validation/Inputs";

// Props
type FormProps = {
  form: UseFormReturnType<Inputs>;
};

export const Form: React.FC<FormProps> = ({ form }) => {
  // Queries
  const { products, isLoading: isProductsLoading } = useGetProductsByStorageTypeQuery(
    {
      storageType: "YM",
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

  const handleAddProduct = () => {
    const { roastDetails, ...item } = form.values;

    // Check if product already exists
    const product = products?.find((p) => p.id.toString() === item.productId);
    if (product) {
      form.insertListItem(`roastDetails`, {
        ...item,
        productId: +item.productId,
        product,
      });
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      form.setFieldValue("productId", products[0].id.toString());
    }
  }, [products?.length]);

  return (
    <div>
      <LoadingOverlay visible={isProductsLoading} />
      <Select
        label="Ürün"
        placeholder="Ürün seçiniz"
        searchable
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        data={
          products?.map((product) => ({
            value: product.id.toString(),
            label: product.name,
          })) || []
        }
        {...form.getInputProps("productId")}
      />
      <NumberInput
        label="Atılan KG"
        mt="md"
        precision={2}
        min={0}
        {...form.getInputProps("inputAmount")}
      />
      <NumberInput
        label="Alınan KG"
        mt="md"
        precision={2}
        min={0}
        {...form.getInputProps("outputAmount")}
      />
      <Group mt="md">
        <Button
          disabled={form.values.inputAmount === 0 || form.values.outputAmount === 0}
          onClick={handleAddProduct}
        >
          Ekle
        </Button>
      </Group>
    </div>
  );
};
