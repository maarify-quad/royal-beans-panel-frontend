// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetProductByStockCodeQuery } from "@services/productApi";

// UI Components
import { Tabs, Loader, Alert } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

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
    error,
  } = useGetProductByStockCodeQuery(stockCode || "", {
    skip: !stockCode,
  });

  if (!stockCode) {
    return <Navigate to="/dashboard/storage" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Ürüne ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
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
  );
};
