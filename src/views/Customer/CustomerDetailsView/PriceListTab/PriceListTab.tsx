import React, { useEffect } from "react";

// Services
import {
  useGetPriceListProductsQuery,
  useDeletePriceListProductMutation,
} from "@services/priceListProductApi";

// UI Components
import { Alert, Button, Container, Group, Loader, LoadingOverlay, Text } from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
} from "tabler-icons-react";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { Customer } from "@interfaces/customer";
import { PriceListProduct } from "@interfaces/priceListProduct";
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

// Lazy Imports
const EditPriceListProduct = React.lazy(() =>
  import("../../../../components/PriceListProduct/EditPriceListProduct").then((module) => ({
    default: module.EditPriceListProduct,
  }))
);

// Props
type PriceListTabProps = {
  customer: Customer;
};

export const PriceListTab: React.FC<PriceListTabProps> = ({ customer }) => {
  const { data, isLoading, error } = useGetPriceListProductsQuery(customer.priceListId!, {
    skip: !customer.priceListId,
  });
  const [deletePriceListProduct, { isLoading: isDeleting }] = useDeletePriceListProductMutation();

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
        await deletePriceListProduct({ id, priceListId });
      },
    });
  };

  const priceListProducts: RowDef[][] = React.useMemo(
    () =>
      data?.map((priceListProduct) => [
        { value: priceListProduct.product.name },
        { value: `${priceListProduct.unitPrice} ₺` },
        { value: `${priceListProduct.taxRate} %` },
        {
          value: "actions",
          renderCell: () => (
            <Group spacing={4}>
              <Button
                px={4}
                size="xs"
                variant="subtle"
                color="gray"
                onClick={openEditPriceListProduct(priceListProduct)}
              >
                <EditIcon size={18} />
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
                <TrashIcon size={18} />
              </Button>
            </Group>
          ),
        },
      ]) || [],
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Fiyat listesine ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Fiyat listesinde ürün bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <LoadingOverlay visible={isDeleting} />
      <ResultsTable
        headers={[{ value: "Ürün" }, { value: "Fiyat" }, { value: "Vergi" }, { value: "İşlem" }]}
        rows={priceListProducts}
      />
    </Container>
  );
};
