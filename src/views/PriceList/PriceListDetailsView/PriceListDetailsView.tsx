import React from "react";

// Services
import { useGetPriceListByIdQuery } from "@services/priceListApi";

// Routing
import { Navigate, useParams } from "react-router-dom";

// UI Components
import { Alert, Loader, Grid, Group, Button, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconAlertCircle, IconPlus, IconUserPlus } from "@tabler/icons";

// Components
import { ProductsResult } from "./ProductsResult";
import { CustomersResult } from "./CustomersResult";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const CreatePriceListProduct = React.lazy(
  () => import("@components/PriceListProduct/CreatePriceListProduct")
);
const AssignPriceList = React.lazy(() => import("@components/PriceList/AssignPriceList"));

export const PriceListDetailsView = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPriceListByIdQuery(id!, {
    skip: !id,
  });

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  const onAddProductClick = () => {
    openModal({
      key: "createPriceListProduct",
      title: "Ürün Ekle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreatePriceListProduct
            priceListId={parseInt(id)}
            priceListProducts={data?.priceListProducts}
          />
        </React.Suspense>
      ),
    });
  };

  const onAssignPriceListClick = () => {
    openModal({
      key: "assignPriceList",
      title: "Müşteri Ekle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <AssignPriceList priceListId={parseInt(id)} />
        </React.Suspense>
      ),
    });
  };

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout
      title={data?.name}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Fiyat Listeleri",
          href: "/dashboard/price-lists",
        },
        {
          label: data?.name,
          href: `/dashboard/price-lists/${id}`,
        },
      ]}
      actions={
        <Group>
          <Button leftIcon={<IconPlus />} onClick={onAddProductClick}>
            Ürün Ekle
          </Button>
          <Button variant="default" leftIcon={<IconUserPlus />} onClick={onAssignPriceListClick}>
            Müşteri Ekle
          </Button>
        </Group>
      }
    >
      <Grid mt="md">
        <Grid.Col lg={8}>
          <ProductsResult priceListProducts={data?.priceListProducts} />
        </Grid.Col>
        <Grid.Col lg={4}>
          <CustomersResult customers={data?.customers} />
        </Grid.Col>
      </Grid>
    </PageLayout>
  );
};
