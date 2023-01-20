import React from "react";

// Services
import { useUpdatePriceListProductMutation } from "@services/priceListProductApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

// Props
type EditPriceListProductProps = {
  priceListProduct: PriceListProduct;
};

export const EditPriceListProduct: React.FC<EditPriceListProductProps> = ({ priceListProduct }) => {
  const [updatePriceListProduct, { isLoading: isUpdating }] = useUpdatePriceListProductMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues: {
      name: priceListProduct.product.name,
      ...priceListProduct,
    },
    validate: zodResolver(schema),
  });

  const onEditPriceListProductSubmit = async (values: Inputs) => {
    try {
      await updatePriceListProduct({
        id: priceListProduct.id,
        priceListId: priceListProduct.priceListId,
        unitPrice: values.unitPrice,
        taxRate: values.taxRate,
        product: {
          ...priceListProduct.product,
          name: values.name,
        },
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Ürün güncellendi",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeModal("updatePriceListProduct");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onEditPriceListProductSubmit)}>
      <LoadingOverlay visible={isUpdating} />
      <TextInput label="Ürün adı" required {...form.getInputProps("name")} />
      <NumberInput
        label="Birim fiyat"
        precision={2}
        mt="md"
        icon={<span>₺</span>}
        required
        {...form.getInputProps("unitPrice")}
      />
      <Select
        label="Vergi oranı"
        data={[
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "8", value: "8" },
          { label: "18", value: "18" },
        ]}
        icon={<span>%</span>}
        mt="md"
        required
        {...form.getInputProps("taxRate")}
      />
      <Button type="submit" mt="md" loading={isUpdating}>
        Güncelle
      </Button>
    </form>
  );
};
