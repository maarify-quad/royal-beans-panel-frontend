import { useNavigate } from "react-router-dom";

// Services
import { useCreateRoastIngredientMutation } from "@services/roastIngredientApi";

// UI Components
import { Button, Grid, NumberInput } from "@mantine/core";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Components
import { SelectStorageTypeProduct } from "@components/Product/SelectStorageTypeProduct";
import { Summary } from "./Summary";

// Utils
import { handleFormError } from "@utils/form";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const Form = () => {
  const navigate = useNavigate();

  // Mutations
  const [createRoastIngredient, { isLoading }] = useCreateRoastIngredientMutation();

  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const handleAddRoastIngredient = () => {
    form.insertListItem("roastIngredients", {
      productId: form.values.productId,
      ingredientId: form.values.ingredientId,
      rate: form.values.rate,
      product: form.values.product,
      ingredient: form.values.ingredient,
    });
  };

  const handleSubmit = async (values: Inputs) => {
    try {
      const roastIngredients = values.roastIngredients.map(({ productId, ingredientId, rate }) => ({
        productId: +productId,
        ingredientId: +ingredientId,
        rate,
      }));
      await createRoastIngredient({ roastIngredients }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Kavrum içeriği oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });
      navigate("/dashboard/roasts");
    } catch {}
  };

  return (
    <Grid mt="md">
      <Grid.Col lg={6}>
        <form
          id="roastIngredientForm"
          name="roastIngredientForm"
          onSubmit={form.onSubmit(handleSubmit, handleFormError)}
        >
          <SelectStorageTypeProduct
            storageType="YM"
            label="Kavrulacak Ürün (YM)"
            placeholder="Ürün seçiniz"
            nothingFound="Sonuç bulunamadı"
            dropdownComponent="div"
            searchable
            withAsterisk
            {...form.getInputProps("productId")}
            onChange={(value, product) => {
              if (value && product) {
                form.setFieldValue("productId", value);
                form.setFieldValue("product", product);
              }
            }}
          />
          <SelectStorageTypeProduct
            storageType="HM"
            label="İçerik Ürün (HM)"
            placeholder="Ürün seçiniz"
            nothingFound="Sonuç bulunamadı"
            dropdownComponent="div"
            mt="md"
            searchable
            withAsterisk
            {...form.getInputProps("ingredientId")}
            onChange={(value, product) => {
              if (value && product) {
                form.setFieldValue("ingredientId", value);
                form.setFieldValue("ingredient", product);
              }
            }}
          />
          <NumberInput
            label="Oran (%)"
            min={1}
            max={100}
            mt="md"
            withAsterisk
            {...form.getInputProps("rate")}
          />
          <Button
            disabled={form.values.productId === "0" || form.values.ingredientId === "0"}
            mt="lg"
            onClick={handleAddRoastIngredient}
          >
            Ekle
          </Button>
        </form>
      </Grid.Col>
      <Grid.Col lg={6}>
        <Summary form={form} isLoading={isLoading} />
      </Grid.Col>
    </Grid>
  );
};
