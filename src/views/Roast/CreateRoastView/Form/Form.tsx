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
  roundId: number;
  form: UseFormReturnType<Inputs>;
  setRoundId: React.Dispatch<React.SetStateAction<number>>;
};

export const Form: React.FC<FormProps> = ({ roundId, form, setRoundId }) => {
  // Queries
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsByStorageTypeQuery("YM");

  const handleAddRound = () => {
    setRoundId((prev) => prev + 1);
    form.setFieldValue(`roastDetails.${roundId}`, []);
  };

  const handleAddProduct = () => {
    const { roastDetails, ...item } = form.values;

    // Check if product already exists
    const product = products?.find((p) => p.id === item.productId);
    if (product) {
      if (!form.values.roastDetails[roundId - 1]) {
        form.setFieldValue(`roastDetails.${roundId - 1}`, []);
      }
      form.insertListItem(`roastDetails.${roundId - 1}`, {
        ...item,
        product,
      });
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      form.setFieldValue("productId", products[0].id);
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
            label: product.name,
            value: product.id,
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
        {form.values.roastDetails[0]?.length > 0 && (
          <Button onClick={handleAddRound} variant="light">
            Yeni Posta
          </Button>
        )}
      </Group>
    </div>
  );
};
