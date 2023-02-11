import React from "react";

// Services
import { useDeletePriceListProductMutation } from "@services/priceListProductApi";

// UI Components
import { Table, Alert, Paper, Group, Text, Button, LoadingOverlay, Badge } from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import { IconEdit, IconInfoCircle, IconTrash } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

// Lazy Imports
const EditPriceListProduct = React.lazy(
  () => import("@components/PriceListProduct/EditPriceListProduct")
);

// Props
type ProductsResultProps = {
  priceListProducts?: PriceListProduct[];
};

export const ProductsResult: React.FC<ProductsResultProps> = ({ priceListProducts }) => {
  const [deletePriceListProduct, { isLoading: isDeleting }] = useDeletePriceListProductMutation();

  if (priceListProducts?.length === 0) {
    return (
      <Alert icon={<IconInfoCircle />} color="cyan">
        Bu fiyat listesinde ürün bulunmamaktadır.
      </Alert>
    );
  }

  const openEditPriceListProduct = (priceListProduct: PriceListProduct) => () => {
    openModal({
      key: "updatePriceListProduct",
      title: "Fiyat Listesi Ürünü Düzenle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <EditPriceListProduct priceListProduct={priceListProduct} />
        </React.Suspense>
      ),
    });
  };

  const openDeletePriceListProduct = (id: number, priceListId: number) => () => {
    openConfirmModal({
      centered: true,
      title: "Fiyat Listesi Ürünü Sil",
      children: (
        <Text size="sm">Bu ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz</Text>
      ),
      labels: { confirm: "Sil", cancel: "Vazgeç" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await deletePriceListProduct({ id, priceListId }).unwrap();
        } catch (error) {}
      },
    });
  };

  return (
    <Paper p="sm" radius="md" shadow="sm" withBorder>
      <Table highlightOnHover verticalSpacing="sm" style={{ position: "relative" }}>
        <LoadingOverlay visible={isDeleting} />
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Birim Fiyat</th>
            <th>Vergi</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {priceListProducts?.map((priceListProduct, i) => (
            <tr key={i}>
              <td>
                {priceListProduct.product.name}{" "}
                {priceListProduct.product.deletedAt && (
                  <Badge color="red" size="sm" ml={4}>
                    İNAKTİF
                  </Badge>
                )}
              </td>
              <td>{formatCurrency(priceListProduct.unitPrice)}</td>
              <td>%{priceListProduct.taxRate}</td>
              <td>
                <Group spacing={4}>
                  <Button
                    px={4}
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={openEditPriceListProduct(priceListProduct)}
                  >
                    <IconEdit size={18} />
                  </Button>
                  <Button
                    px={4}
                    size="xs"
                    variant="subtle"
                    color="red"
                    onClick={openDeletePriceListProduct(
                      priceListProduct.id,
                      priceListProduct.priceListId
                    )}
                  >
                    <IconTrash size={18} />
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};
