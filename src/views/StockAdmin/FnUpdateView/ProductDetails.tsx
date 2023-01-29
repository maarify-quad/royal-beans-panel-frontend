// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Card,
  SimpleGrid,
  Flex,
  Paper,
  Text,
} from "@mantine/core";

// Interfaces
import { ProductWithIngredients } from "@interfaces/product";

// Props
type ProductDetailsProps = {
  product: ProductWithIngredients;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <Card my="md" withBorder shadow="sm" radius="md" key={product.id}>
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
              <Text size="sm" key={ingredient.id}>
                {ingredient.ingredientProduct.stockCode &&
                  `${ingredient.ingredientProduct.stockCode} -`}{" "}
                {ingredient.ingredientProduct.name} * {ingredient.ratio}{" "}
                {ingredient.ingredientProduct.amountUnit}
              </Text>
            </Paper>
          ))}
        </Flex>
      </SimpleGrid>
    </Card>
  );
};
