import React, { useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import {
  useGetPriceListProductsQuery,
  useDeletePriceListProductMutation,
} from "@services/priceListProductApi";
import { useCreatePriceListMutation } from "@services/priceListApi";
import { useUpdateCustomerMutation } from "@services/customerApi";

// UI Components
import { Alert, Anchor, Button, Group, LoadingOverlay, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import { IconInfoCircle, IconTrash, IconEdit, IconAlertCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Customer } from "@interfaces/customer";
import { PriceListProduct } from "@interfaces/priceListProduct";

// Lazy Imports
const EditPriceListProduct = React.lazy(
  () => import("@components/PriceListProduct/EditPriceListProduct")
);

// Props
type PriceListTabProps = {
  customer: Customer;
};

export const PriceListTab = ({ customer }: PriceListTabProps) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { priceListProducts, totalCount, isTableLoading, error } = useGetPriceListProductsQuery(
    {
      query,
      priceListId: customer.priceListId!,
    },
    {
      skip: !customer.priceListId || customer.priceList?.name === "Baz",
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        priceListProducts: data?.priceListProducts,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
        ...rest,
      }),
    }
  );

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

  const columns = useMemo<DataTableColumn<PriceListProduct>[]>(
    () => [
      {
        accessor: "product.name",
        title: "Ürün",
      },
      {
        accessor: "unitPrice",
        title: "Birim Fiyat",
        render: (priceListProduct) => formatCurrency(priceListProduct.unitPrice),
      },
      {
        accessor: "taxRate",
        title: "KDV Oranı",
        render: (priceListProduct) => `${priceListProduct.taxRate} %`,
      },
      {
        accessor: "actions",
        title: "İşlemler",
        render: (priceListProduct) => (
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
    ],
    [priceListProducts]
  );

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Fiyat listesine ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (priceListProducts?.length === 0) {
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

  if (!customer.priceListId) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Bu müşteriye herhangi bir fiyat listesi atanmamıştır.
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={priceListProducts}
        columns={columns}
        fetching={isTableLoading || isCreating || isUpdating || isDeleting}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit}
        totalRecords={totalCount}
        page={query.page}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit.toString()}
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
    </Paper>
  );
};
