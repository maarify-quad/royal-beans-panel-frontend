// Services
import { useCreateShopifyProductIngredientMutation } from "@services/shopifyProductApi";

// UI Components
import {
  Button,
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
  Text,
  Stack,
  Group,
  ActionIcon,
} from "@mantine/core";

// Components
import SelectProduct from "@components/Product/SelectProduct";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck, IconTrash } from "@tabler/icons";

// Validation
import {
  ShopifyUpdateValues,
  shopifyUpdateInitialValues,
  shopifyUpdateSchema,
} from "./shopifyUpdateValidation";

// Utils
import { handleFormError } from "@utils/form";

// Props
type FormProps = {
  shopifyProductId: number;
  shopifyVariantId: number;
};

export const Form = ({ shopifyProductId, shopifyVariantId }: FormProps) => {
  const form = useForm<ShopifyUpdateValues>({
    initialValues: shopifyUpdateInitialValues,
    validate: zodResolver(shopifyUpdateSchema),
  });

  // Mutations
  const [createShopifyProductIngredient, { isLoading: isCreating }] =
    useCreateShopifyProductIngredientMutation();

  const handleSubmit = async (values: ShopifyUpdateValues) => {
    try {
      await createShopifyProductIngredient({
        shopifyProductId,
        shopifyVariantId,
        ingredients: values.ingredients.map((ingredient) => ({
          productId: +ingredient.productId,
          quantity: ingredient.quantity,
        })),
      }).unwrap();
      form.reset();
      showNotification({
        title: "Başarılı",
        message: "İçerikler başarıyla eklendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleFormError)}>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        <div>
          <SelectProduct
            label="Ürünler"
            placeholder="İçerik ürünü seçiniz"
            nothingFound="Ürün bulunamadı"
            searchable
            dropdownComponent="div"
            {...form.getInputProps("productId")}
            onChange={(value, product) => {
              if (value && product) {
                form.setFieldValue("productId", value);
                form.setFieldValue("product", product);
              }
            }}
          />
          <TextInput
            label="Stok Kodu"
            mt="md"
            readOnly
            value={form.values.product?.stockCode || ""}
          />
          <TextInput
            label="Depo Tipi"
            mt="md"
            readOnly
            value={form.values.product?.storageType || ""}
          />
          <TextInput label="Birim" mt="md" readOnly value={form.values.product?.amountUnit || ""} />
          <NumberInput
            label="Miktar"
            mt="md"
            precision={2}
            min={0}
            {...form.getInputProps("quantity")}
          />
          <Button
            mt="lg"
            disabled={form.values.productId === "0"}
            onClick={() => {
              form.insertListItem("ingredients", {
                productId: form.values.productId,
                product: form.values.product,
                quantity: form.values.quantity,
              });
              form.setFieldValue("product", null);
              form.setFieldValue("productId", "0");
              form.setFieldValue("quantity", 1);
            }}
          >
            İçerik Ekle
          </Button>
        </div>
        <Stack spacing="md">
          {form.values.ingredients.map((ingredient, index) => (
            <Card withBorder shadow="sm" radius="md" key={index}>
              <Group position="apart">
                <div>
                  <Text color="dimmed" size="xs">
                    {ingredient.product.stockCode}
                  </Text>
                  <Text weight="bold">{ingredient.product.name}</Text>
                  <Text size="sm">
                    Miktar: {ingredient.quantity} {ingredient.product.amountUnit}
                  </Text>
                </div>
                <ActionIcon color="red" onClick={() => form.removeListItem("ingredients", index)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
          <Group>
            <Button disabled={!form.values.ingredients.length} loading={isCreating} type="submit">
              Güncelle
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </form>
  );
};
