import { memo, useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetShopifyProductsWithIngredientsQuery } from "@services/shopifyProductApi";

// UI Components
import {
  Button,
  Card,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

// UI Utils
import { useDebouncedValue } from "@mantine/hooks";

// Interfaces
import { ShopifyProduct } from "@interfaces/shopifyProduct";

export const ShopifyUpdateIngredients = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // Queries
  const { data, isLoading, isFetching } = useGetShopifyProductsWithIngredientsQuery();

  const shopifyIngredients = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.shopifyProducts.filter((product) => {
      if (!debouncedSearch) {
        return true;
      }

      const searchRegex = new RegExp(debouncedSearch, "i");

      return searchRegex.test(product.productTitle) || searchRegex.test(product.variantTitle);
    });
  }, [data, debouncedSearch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack>
      <LoadingOverlay visible={isFetching} />
      <TextInput
        placeholder="Ürün adı veya varyant adı ile ara"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      {shopifyIngredients.map((shopifyProduct) => (
        <ShopifyProductCard shopifyProduct={shopifyProduct} key={shopifyProduct.id} />
      ))}
    </Stack>
  );
};

type ShopifyProductCardProps = {
  shopifyProduct: ShopifyProduct;
};

const ShopifyProductCard = memo(({ shopifyProduct }: ShopifyProductCardProps) => {
  return (
    <Card withBorder shadow="sm" radius="md" key={shopifyProduct.variantId}>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 3 },
        ]}
      >
        <Text weight="bold" size="xl">
          {shopifyProduct.productTitle} / {shopifyProduct.variantTitle}
        </Text>
        <Flex align="start" rowGap="xs" direction="column">
          <Text size="xl">İçerikler:</Text>
          {shopifyProduct.ingredients.map((ingredient) => (
            <Paper p="xs" radius="md" withBorder key={ingredient.shopifyProductToProductId}>
              <Group>
                <Text inline size="sm">
                  {ingredient.product.name} * {ingredient.quantity} {ingredient.product.amountUnit}
                </Text>
              </Group>
            </Paper>
          ))}
        </Flex>
        <Stack align="center" justify="center">
          <Button
            component={Link}
            to={`/dashboard/stock-admin/shopify-update/${shopifyProduct.variantId}`}
          >
            Güncelle
          </Button>
        </Stack>
      </SimpleGrid>
    </Card>
  );
});
