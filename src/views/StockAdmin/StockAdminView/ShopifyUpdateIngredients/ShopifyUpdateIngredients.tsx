import { lazy, memo, Suspense, useMemo, useState } from "react";

// Services
import { useGetProductsWithShopifyIngredientsQuery } from "@services/productApi";
import { useDeleteShopifyIngredientMutation } from "@services/shopifyIngredientApi";

// UI Components
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
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
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import { IconTrash } from "@tabler/icons";

// Interfaces
import { ProductWithShopifyIngredients } from "@interfaces/product";

// Lazy Components
const AddShopifyIngredient = lazy(
  () => import("@components/ShopifyIngredient/AddShopifyIngredient")
);

export const ShopifyUpdateIngredients = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // Queries
  const { data, isLoading, isFetching } = useGetProductsWithShopifyIngredientsQuery({ pagination });

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
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <ProductList products={products} />
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Group>
            <Text size="sm">Sayfa başı satır</Text>
            <Select
              value={pagination.limit.toString()}
              onChange={(limit) => {
                if (limit) {
                  setPagination({ page: 1, limit: +limit });
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
              page={pagination.page}
              onChange={(page) => setPagination({ ...pagination, page })}
            />
          )}
        </Group>
      </Paper>
    </Stack>
  );
};

const ProductList = memo(({ products }: { products: ProductWithShopifyIngredients[] }) => {
  const [deleteShopifyIngredient, { isLoading }] = useDeleteShopifyIngredientMutation();

  const handleUpdate = (product: ProductWithShopifyIngredients) => {
    openModal({
      title: `${product.name} - Shopify İçerik Güncelle`,
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <AddShopifyIngredient productId={product.id} />
        </Suspense>
      ),
    });
  };

  const handleDelete = (id: number) => {
    openConfirmModal({
      title: "Bu içeriği silmek istediğinize emin misiniz?",
      confirmProps: { color: "red" },
      labels: { cancel: "İptal", confirm: "Sil" },
      centered: true,
      onConfirm: async () => {
        try {
          await deleteShopifyIngredient(id).unwrap();
        } catch {}
      },
    });
  };

  return (
    <>
      {products.map((product) => (
        <Card withBorder shadow="sm" radius="md" key={product.id}>
          <LoadingOverlay visible={isLoading} />
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
              {product.shopifyIngredients.map((ingredient) => (
                <Paper p="xs" radius="md" withBorder key={ingredient.id}>
                  <Group>
                    <Group spacing="xs">
                      <Text size="sm" color="dimmed">
                        Shopify Ürün ID:
                      </Text>
                      <Text inline size="sm">
                        {ingredient.shopifyProductId}
                      </Text>
                    </Group>
                    <Divider orientation="vertical" />
                    <Group spacing="xs">
                      <Text size="sm" color="dimmed">
                        Shopify Varyant ID:
                      </Text>
                      <Text inline size="sm">
                        {ingredient.shopifyVariantId || "-"}
                      </Text>
                    </Group>
                    <Divider orientation="vertical" />
                    <ActionIcon color="red" onClick={() => handleDelete(ingredient.id)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </Flex>
            <Stack align="center" justify="center">
              <Button onClick={() => handleUpdate(product)}>Güncelle</Button>
            </Stack>
          </SimpleGrid>
        </Card>
      ))}
    </>
  );
});
