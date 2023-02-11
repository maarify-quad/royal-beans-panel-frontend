// Services
import { useDeleteIngredientByIdMutation } from "@services/ingredientApi";

// UI Components
import {
  Card,
  SimpleGrid,
  Flex,
  Paper,
  Text,
  ActionIcon,
  Group,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openConfirmModal } from "@mantine/modals";

// Icons
import { IconTrash } from "@tabler/icons";

// Interfaces
import { ProductWithIngredients } from "@interfaces/product";

// Props
type ProductDetailsProps = {
  product: ProductWithIngredients;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [deleteIngredient, { isLoading: isDeleting }] = useDeleteIngredientByIdMutation();

  const handleDeleteIngredient = (id: number) => {
    openConfirmModal({
      title: "İçeriği silmek istediğinize emin misiniz?",
      labels: { cancel: "İptal", confirm: "Sil" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: async () => {
        try {
          await deleteIngredient({ id, stockCode: product.stockCode }).unwrap();
        } catch {}
      },
    });
  };

  return (
    <Card my="md" withBorder shadow="sm" radius="md" key={product.id}>
      <LoadingOverlay visible={isDeleting} />
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Flex direction="column">
          <Text size="xs" color="dimmed">
            {product.stockCode || "Stok Kodu Yok"}
          </Text>
          <Text weight="bold" size="xl">
            {product.name}
          </Text>
        </Flex>
        <Flex align="start" rowGap="xs" direction="column">
          <Text size="xl" weight="bold">
            İçerikler:
          </Text>
          {product.ingredients.map((ingredient) => (
            <Paper p="xs" radius="md" withBorder key={ingredient.id}>
              <Group spacing="sm">
                <Text size="sm" key={ingredient.id}>
                  {ingredient.ingredientProduct.stockCode &&
                    `${ingredient.ingredientProduct.stockCode} -`}{" "}
                  {ingredient.ingredientProduct.name} * {ingredient.ratio}{" "}
                  {ingredient.ingredientProduct.amountUnit}
                </Text>
                <ActionIcon color="red" onClick={() => handleDeleteIngredient(ingredient.id)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Paper>
          ))}
        </Flex>
      </SimpleGrid>
    </Card>
  );
};
