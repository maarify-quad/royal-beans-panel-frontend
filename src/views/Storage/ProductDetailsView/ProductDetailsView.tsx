// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import {
  useGetProductByStockCodeQuery,
  useDeleteProductByStockCodeMutation,
} from "@services/productApi";

// UI Components
import { Tabs, Button, Alert, Text } from "@mantine/core";

// UI Utils
import { openConfirmModal } from "@mantine/modals";

// Icons
import { IconAlertCircle, IconTrash } from "@tabler/icons";

// Components
import { SummaryTab } from "./SummaryTab";
import { DeliveriesTab } from "./DeliveriesTab";

// Layout
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ProductDetailsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { stockCode } = useParams();

  // Queries
  const {
    data: product,
    isLoading,
    isFetching,
    error,
  } = useGetProductByStockCodeQuery(stockCode || "", {
    skip: !stockCode,
  });

  // Mutations
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductByStockCodeMutation();

  const handleDeleteProduct = () => {
    openConfirmModal({
      title: "Ürünü silmek istediğinize emin misiniz?",
      confirmProps: { color: "red", loading: isDeleting },
      labels: { cancel: "İptal", confirm: "Sil" },
      centered: true,
      onConfirm: async () => {
        try {
          if (!stockCode) return;
          await deleteProduct(stockCode).unwrap();
        } catch {}
      },
    });
  };

  if (!stockCode) {
    return <Navigate to="/dashboard/storage" replace />;
  }

  return (
    <>
      {product?.deletedAt && (
        <Alert icon={<IconAlertCircle />} variant="filled" color="red" mb="md">
          <Text weight="bold">Bu ürün devre dışı bırakılmıştır</Text>
        </Alert>
      )}
      <PageLayout
        title={product?.name}
        breadcrumbs={[
          {
            label: "Panel",
            href: "/dashboard",
          },
          {
            label: "Depo",
            href: "/dashboard/storage",
          },
          {
            label: product?.name,
            href: `/dashboard/storage/${stockCode}`,
          },
        ]}
        actions={
          !product?.deletedAt && (
            <Button
              color="red"
              variant="outline"
              leftIcon={<IconTrash />}
              onClick={handleDeleteProduct}
            >
              Ürünü Sil
            </Button>
          )
        }
        isLoading={isLoading || isFetching}
        error={error}
      >
        {product && (
          <Tabs
            keepMounted={false}
            defaultValue={searchParams.get("tab") || "summary"}
            onTabChange={(value) => setSearchParams({ tab: value as string })}
            mt="md"
          >
            <Tabs.List>
              <Tabs.Tab value="summary">Özet</Tabs.Tab>
              <Tabs.Tab value="delivery">Sevkiyat</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="summary" mt="md">
              <SummaryTab product={product} />
            </Tabs.Panel>
            <Tabs.Panel value="delivery" mt="md">
              <DeliveriesTab stockCode={stockCode} />
            </Tabs.Panel>
          </Tabs>
        )}
      </PageLayout>
    </>
  );
};
