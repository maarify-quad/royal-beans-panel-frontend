// Routing
import { Link } from "react-router-dom";

// Services
import { useGetProductsWithIngredientsQuery } from "@services/productApi";

// UI Components
import { Button, Card, Flex, Loader, Paper, SimpleGrid, Stack, Text } from "@mantine/core";

export const FnUpdateIngredients = () => {
  const { data, isLoading, isFetching } = useGetProductsWithIngredientsQuery();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <Stack>
      {data?.products.map((product) => (
        <Card withBorder shadow="sm" radius="md" key={product.id}>
          <SimpleGrid
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 3 },
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
                <Paper p="xs" radius="md" withBorder>
                  <Text size="sm" key={ingredient.id}>
                    {ingredient.ingredientProduct.stockCode &&
                      `${ingredient.ingredientProduct.stockCode} -`}{" "}
                    {ingredient.ingredientProduct.name} * {ingredient.ratio}{" "}
                    {ingredient.ingredientProduct.amountUnit}
                  </Text>
                </Paper>
              ))}
            </Flex>
            <Stack align="center" justify="center">
              <Button component={Link} to={`/dashboard/stock-admin/fn-update/${product.stockCode}`}>
                Güncelle
              </Button>
            </Stack>
          </SimpleGrid>
        </Card>
      ))}
    </Stack>
  );
};
