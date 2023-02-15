// Services
import { useDeleteShopifyProductIngredientMutation } from "@services/shopifyProductApi";

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
import { ShopifyProduct } from "@interfaces/shopifyProduct";

// Props
type IngredientDetailsProps = {
  shopifyProduct: ShopifyProduct;
};

export const IngredientDetails = ({ shopifyProduct }: IngredientDetailsProps) => {
  const [deleteShopifyProductIngredient, { isLoading: isDeleting }] =
    useDeleteShopifyProductIngredientMutation();

  const handleDeleteIngredient = (shopifyProductToProductId: number) => {
    openConfirmModal({
      title: "İçeriği silmek istediğinize emin misiniz?",
      labels: { cancel: "İptal", confirm: "Sil" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: async () => {
        try {
          await deleteShopifyProductIngredient({
            shopifyProductToProductId,
            shopifyVariantId: shopifyProduct.variantId,
          }).unwrap();
        } catch {}
      },
    });
  };

  return (
    <Card my="md" withBorder shadow="sm" radius="md" key={shopifyProduct.id}>
      <LoadingOverlay visible={isDeleting} />
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Flex direction="column">
          <Text weight="bold" size="xl">
            {shopifyProduct.productTitle} / {shopifyProduct.variantTitle}
          </Text>
        </Flex>
        <Flex align="start" rowGap="xs" direction="column">
          <Text size="xl" weight="bold">
            İçerikler:
          </Text>
          {shopifyProduct.ingredients.map((ingredient) => (
            <Paper p="xs" radius="md" withBorder key={ingredient.shopifyProductToProductId}>
              <Group spacing="sm">
                <Text size="sm">
                  {ingredient.product.name} * {ingredient.quantity} {ingredient.product.amountUnit}
                </Text>
                <ActionIcon
                  color="red"
                  onClick={() => handleDeleteIngredient(ingredient.shopifyProductToProductId)}
                >
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
