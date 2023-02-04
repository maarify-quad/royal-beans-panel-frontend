import React from "react";

// Services
import {
  useGetPriceListProductsQuery,
  useDeletePriceListProductMutation,
} from "@services/priceListProductApi";
import { useCreatePriceListMutation } from "@services/priceListApi";
import { useUpdateCustomerMutation } from "@services/customerApi";

// UI Components
import {
  Alert,
  Anchor,
  Button,
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Text,
} from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import { IconInfoCircle, IconTrash, IconEdit } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Customer } from "@interfaces/customer";
import { PriceListProduct } from "@interfaces/priceListProduct";
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";
import { Link } from "react-router-dom";

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
  // Queries
  const { data, isLoading, error } = useGetPriceListProductsQuery(customer.priceListId!, {
    skip: !customer.priceListId || customer.priceList?.name === "Baz",
  });

  // Mutations
  const [deletePriceListProduct, { isLoading: isDeleting }] = useDeletePriceListProductMutation();
  const [createPriceList, { isLoading: isCreating }] = useCreatePriceListMutation();
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  // Handlers
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

  const handleCreateCustomPriceList = async () => {
    try {
      const priceList = await createPriceList({
        name: `Özel-${customer.name}`,
        cloneDefaultPriceList: true,
      }).unwrap();
      await updateCustomer({
        id: customer.id,
        priceListId: priceList.id,
      }).unwrap();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  // Table rows
  const priceListProducts: RowDef[][] = React.useMemo(
    () =>
      data?.map((priceListProduct) => [
        { value: priceListProduct.product.name },
        { value: formatCurrency(priceListProduct.unitPrice) },
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
          ),
        },
      ]) || [],
    [data]
  );

  if (isLoading || isCreating || isUpdating) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
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
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        {customer.priceList ? (
          <>
            <Anchor component={Link} to={`/dashboard/price-lists/${customer.priceListId}`}>
              {customer.priceList.name}
            </Anchor>{" "}
            fiyat listesinde ürün bulunmamaktadır
          </>
        ) : (
          "Fiyat listesinde ürün bulunmamaktadır"
        )}
      </Alert>
    );
  }

  if (customer.priceList?.name === "Baz") {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Bu müşteri <strong>Baz</strong> fiyat listesini kullanmaktadır. Özel fiyat listesi
        oluşturmak için{" "}
        <strong
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleCreateCustomPriceList}
        >
          tıklayınız
        </strong>
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
