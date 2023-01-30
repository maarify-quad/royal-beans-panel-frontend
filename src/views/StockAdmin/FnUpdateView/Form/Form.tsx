import { useMemo } from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";
import { useCreateIngredientMutation } from "@services/ingredientApi";

// UI Components
import {
  Button,
  Card,
  Loader,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
  Text,
  Stack,
  Group,
  ActionIcon,
} from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { IconCircleCheck, IconTrash } from "@tabler/icons";

// Validation
import { FnUpdateValues, fnUpdateInitialValues, fnUpdateSchema } from "./fnUpdateValidation";
import { showNotification } from "@mantine/notifications";

// Props
type FormProps = {
  productId: number;
  stockCode: string;
};

export const Form = ({ productId, stockCode }: FormProps) => {
  const form = useForm<FnUpdateValues>({
    initialValues: fnUpdateInitialValues,
    validate: zodResolver(fnUpdateSchema),
  });

  // Queries
  const { products, isProductsLoading } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      products: data?.products.filter(
        (product) => product.storageType === "HM" || product.storageType === "YM"
      ),
      isProductsLoading: rest.isLoading || rest.isFetching,
    }),
  });

  // Mutations
  const [createIngredient, { isLoading: isCreating }] = useCreateIngredientMutation();

  const handleSubmit = async (values: FnUpdateValues) => {
    try {
      const params = {
        ingredients: values.ingredients.map(({ ingredientProductId, productId, ratio }) => ({
          ingredientProductId: +ingredientProductId,
          productId,
          ratio,
        })),
        stockCode,
      };
      await createIngredient(params).unwrap();
      form.reset();
      showNotification({
        title: "Başarılı",
        message: "İçerikler başarıyla eklendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch {}
  };

  const productSelections = useMemo(() => {
    return (
      products?.map((product) => ({
        label: product.name,
        value: product.id.toString(),
      })) ?? []
    );
  }, [products]);

  if (isProductsLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        <div>
          <Select
            label="Ürünler"
            placeholder="İçerik ürünü seçiniz"
            data={productSelections}
            dropdownComponent="div"
            {...form.getInputProps("ingredientProductId")}
            onChange={(value) => {
              if (value) {
                form.setFieldValue("ingredientProductId", value);
                const product = products?.find((product) => product.id === parseInt(value, 10));
                if (product) {
                  form.setFieldValue("ingredientProduct", product);
                }
              }
            }}
          />
          <TextInput
            label="Stok Kodu"
            mt="md"
            readOnly
            value={form.values.ingredientProduct?.stockCode}
          />
          <TextInput
            label="Depo Tipi"
            mt="md"
            readOnly
            value={form.values.ingredientProduct?.storageType}
          />
          <TextInput
            label="Birim"
            mt="md"
            readOnly
            value={form.values.ingredientProduct?.amountUnit}
          />
          <NumberInput
            label="Miktar"
            mt="md"
            precision={2}
            min={0}
            {...form.getInputProps("ratio")}
          />
          <Button
            mt="lg"
            disabled={form.values.ingredientProductId === "0"}
            onClick={() => {
              form.insertListItem("ingredients", {
                productId,
                ingredientProductId: form.values.ingredientProductId,
                ratio: form.values.ratio,
                ingredientProduct: form.values.ingredientProduct,
              });
              form.setFieldValue("ingredientProductId", "0");
              form.setFieldValue("ratio", 0);
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
                    {ingredient.ingredientProduct.stockCode}
                  </Text>
                  <Text weight="bold">{ingredient.ingredientProduct.name}</Text>
                  <Text size="sm">
                    Miktar: {ingredient.ratio} {ingredient.ingredientProduct.amountUnit}
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
              Kaydet
            </Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </form>
  );
};
