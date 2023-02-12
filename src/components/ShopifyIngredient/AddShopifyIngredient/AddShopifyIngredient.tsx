// Services
import { useCreateShopifyIngredientMutation } from "@services/shopifyIngredientApi";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";

// Utils
import { handleFormError } from "@utils/form";

// Validation
import { AddShopifyIngredientInputs, initialValues } from "./validation/Inputs";
import { addShopifyIngredientSchema } from "./validation/schema";

// Props
type Props = {
  productId: number;
};

export const AddShopifyIngredient = ({ productId }: Props) => {
  const [createShopifyIngredient, { isLoading }] = useCreateShopifyIngredientMutation();

  const form = useForm<AddShopifyIngredientInputs>({
    initialValues,
    validate: zodResolver(addShopifyIngredientSchema),
  });

  const handleSubmit = async (values: AddShopifyIngredientInputs) => {
    try {
      await createShopifyIngredient({
        productId,
        shopifyProductId: +values.shopifyProductId,
        shopifyVariantId: values.shopifyVariantId ? +values.shopifyVariantId : null,
      }).unwrap();
      closeAllModals();
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleFormError)}>
      <TextInput
        label="Shopify Ürün ID"
        mt="md"
        withAsterisk
        placeholder="Ürün ID"
        {...form.getInputProps("shopifyProductId")}
      />
      <TextInput
        label="Shopify Varyant ID"
        mt="md"
        placeholder="Opsiyonel"
        {...form.getInputProps("shopifyVariantId")}
      />
      <Button type="submit" mt="lg" loading={isLoading}>
        Ekle
      </Button>
    </form>
  );
};
