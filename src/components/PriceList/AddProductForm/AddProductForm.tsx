import React, { useEffect } from "react";

// Services
import { useGetAllProductsQuery } from "@services/productApi";
import { useCreatePriceListProductMutation } from "@services/priceListProductApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { X as ErrorIcon, CircleCheck as CircleCheckIcon } from "tabler-icons-react";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";
import { PriceListProduct } from "@interfaces/priceListProduct";

// Props
type AddProductFormProps = {
  priceListId: number;
  priceListProducts?: PriceListProduct[];
};

export const AddProductForm: React.FC<AddProductFormProps> = ({
  priceListId,
  priceListProducts,
}) => {
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
      closeModal("addPriceListProduct");
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
        searchable
        data={productSelectOptions}
        {...form.getInputProps("productId")}
      />
      <NumberInput
        label="Birim fiyat"
        placeholder="Birim fiyat giriniz"
        mt="md"
        precision={2}
        icon={<span>₺</span>}
        min={0}
        {...form.getInputProps("unitPrice")}
      />
      <Select
        label="KDV"
        mt="md"
        placeholder="KDV oranı seçiniz"
        dropdownComponent="div"
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
