// Services
import { useGetProductsWithRoastIngredientsQuery } from "@services/productApi";
import { useDeleteRoastIngredientMutation } from "@services/roastIngredientApi";

// UI Components
import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

// UI Utils
import { openConfirmModal } from "@mantine/modals";

// Icons
import { IconTrash } from "@tabler/icons";

export const RoastIngredientsTab = () => {
  // Mutations
  const [deleteRoastIngredient, { isLoading: isDeleting }] = useDeleteRoastIngredientMutation();

  // Queries
  const { products, isLoading } = useGetProductsWithRoastIngredientsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      products: data?.products,
      ...rest,
    }),
  });

  const handleDeleteIngredient = async (id: number) => {
    openConfirmModal({
      title: "Bu içeriği silmek istediğinize emin misiniz?",
      confirmProps: { color: "red" },
      labels: { cancel: "İptal", confirm: "Sil" },
      centered: true,
      onConfirm: async () => {
        try {
          await deleteRoastIngredient({ id }).unwrap();
        } catch {}
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack>
      {products?.map((product) => (
        <Card withBorder shadow="sm" radius="md" key={product.id}>
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
              {product.roastIngredients.map((ingredient) => (
                <Paper p="xs" radius="md" withBorder>
                  <Group spacing="sm">
                    <Text size="sm" key={ingredient.id}>
                      {ingredient.ingredient.stockCode && `${ingredient.ingredient.stockCode} -`}{" "}
                      {ingredient.ingredient.name} - %{ingredient.rate}
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
      ))}
    </Stack>
  );
};
