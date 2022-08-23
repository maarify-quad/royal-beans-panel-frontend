import React, { useEffect } from "react";

// Services
import { useGetAllProductsQuery } from "@services/productApi";
import { useCreatePriceListProductMutation } from "@services/priceListProductApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { X as ErrorIcon, CircleCheck as CircleCheckIcon } from "tabler-icons-react";

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
  const { data: products, isLoading: isProductsLoading } = useGetAllProductsQuery();

  // Mutations
  const [
    createPriceListProduct,
    {
      isLoading: isCreateProductLoading,
      isSuccess: isCreateProductSuccess,
      error: createProductError,
    },
  ] = useCreatePriceListProductMutation();

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
          value: product.id,
          label: product.name,
        })) || [],
    [products?.length]
  );

  const onAddProductSubmit = async (values: Inputs) => {
    try {
      await createPriceListProduct({
        ...values,
        priceListId,
      });
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Ürün oluşturma başarısız",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isCreateProductSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Ürün oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("createPriceListProduct");
    }
  }, [isCreateProductSuccess]);

  useEffect(() => {
    if (createProductError) {
      showNotification({
        title: "Ürün oluşturma başarısız",
        message: (createProductError as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(createProductError as any)?.data?.message]);

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
          const item = { value, label: query };
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
          precision={2}
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
          { label: "0", value: 0 },
          { label: "1", value: 1 },
          { label: "8", value: 8 },
          { label: "18", value: 18 },
        ]}
        {...form.getInputProps("taxRate")}
      />
      <Button type="submit" mt="lg">
        Ürün ekle
      </Button>
    </form>
  );
};
