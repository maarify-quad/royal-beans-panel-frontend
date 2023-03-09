import { memo, useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { RequestQuery, useGetProductsWithIngredientsQuery } from "@services/productApi";

// UI Components
import {
  Button,
  Card,
  Flex,
  Group,
  Loader,
  Pagination,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

// UI Utils
import { useDebouncedValue } from "@mantine/hooks";

// Icons
import { IconSearch } from "@tabler/icons";

// Interfaces
import { ProductWithIngredients } from "@interfaces/product";

export const FnUpdateIngredients = () => {
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 100,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // Queries
  const { data, isLoading, isFetching } = useGetProductsWithIngredientsQuery({ query });

  const products = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.products.filter((product) => {
      if (!debouncedSearch) {
        return true;
      }

      const searchRegex = new RegExp(debouncedSearch, "i");

      return searchRegex.test(product.name) || searchRegex.test(product.stockCode);
    });
  }, [data, debouncedSearch]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <Stack>
      <TextInput
        placeholder="Ürün adı veya stok kodu ile ara"
        icon={<IconSearch size={18} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <ProductList products={products} />
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Group>
            <Text size="sm">Sayfa başı satır</Text>
            <Select
              value={query.limit?.toString() || "100"}
              onChange={(limit) => {
                if (limit) {
                  setQuery({ page: 1, limit: +limit });
                }
              }}
              data={[
                { label: "25", value: "25" },
                { label: "50", value: "50" },
                { label: "100", value: "100" },
              ]}
              style={{ width: 60 }}
              size="xs"
            />
          </Group>
          {data && (
            <Pagination
              total={data?.totalPages}
              page={query.page}
              onChange={(page) => setQuery({ ...query, page })}
            />
          )}
        </Group>
      </Paper>
    </Stack>
  );
};

const ProductList = memo(({ products }: { products: ProductWithIngredients[] }) => {
  return (
    <>
      {products.map((product) => (
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
              <Text size="xl">İçerikler:</Text>
              {product.ingredients.map((ingredient) => (
                <Paper p="xs" radius="md" withBorder key={ingredient.id}>
                  <Text size="sm">
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
    </>
  );
});
