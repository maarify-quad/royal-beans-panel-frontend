import React from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";
import { useCreatePriceListProductMutation } from "@services/priceListProductApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

// Props
type ManualCreateProps = {
  priceListId: number;
  priceListProducts?: PriceListProduct[];
};

export const ManualCreate: React.FC<ManualCreateProps> = ({ priceListId, priceListProducts }) => {
  // Queries
  const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();

  // Mutations
  const [createPriceListProduct, { isLoading: isCreateProductLoading }] =
    useCreatePriceListProductMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const productSelectOptions = React.useMemo(
    () =>
      products
        ?.filter((product) => !priceListProducts?.find((p) => p.productId === product.id))
        .map((product) => ({
          value: product.id.toString(),
          label: product.name,
        })) || [],
    [products?.length]
  );

  const onAddProductSubmit = async (values: Inputs) => {
    try {
      await createPriceListProduct({
        ...values,
        priceListId,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Ürün oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeModal("createPriceListProduct");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onAddProductSubmit)}>
      <LoadingOverlay visible={isProductsLoading || isCreateProductLoading} />
      <Select
        label="Ürün"
        placeholder="Ürün seçiniz"
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        searchable
        creatable
        required
        getCreateLabel={(query) => `+ ${query} oluştur`}
        onCreate={(query) => {
          const value = -Math.random();
          const item = { value: value.toString(), label: query };
          productSelectOptions.push(item);
          form.setFieldValue("productId", value);
          form.setFieldValue("newProductName", query);
          return item;
        }}
        data={productSelectOptions}
        {...form.getInputProps("productId")}
      />
      {form.values.productId < 0 && (
        <TextInput
          label="Birim"
          placeholder="Miktar birimi giriniz"
          mt="md"
          required
          {...form.getInputProps("unit")}
        />
      )}
      <NumberInput
        label="Birim fiyat"
        placeholder="Birim fiyat giriniz"
        mt="md"
        precision={2}
        icon={<span>₺</span>}
        required
        min={0}
        {...form.getInputProps("unitPrice")}
      />
      <Select
        label="KDV"
        mt="md"
        placeholder="KDV oranı seçiniz"
        dropdownComponent="div"
        required
        icon={<span>%</span>}
        data={[
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "8", value: "8" },
          { label: "18", value: "18" },
        ]}
        {...form.getInputProps("taxRate")}
      />
      <Button type="submit" mt="lg">
        Ürün ekle
      </Button>
    </form>
  );
};
