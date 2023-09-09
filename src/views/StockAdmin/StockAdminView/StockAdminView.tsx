import { lazy } from "react";

// Routing
import { useSearchParams } from "react-router-dom";

// Mantine
import { Tabs } from "@mantine/core";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy components
const BulkUpdateStock = lazy(() => import("./BulkUpdateStock"));
const FnUpdateIngredients = lazy(() => import("./FnUpdateIngredients"));
const ShopifyUpdateIngredients = lazy(() => import("./ShopifyUpdateIngredients"));
const Decis = lazy(() => import("./Decis"));

export const StockAdminView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <PageLayout
      title="Stok Admin"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Stok Admin",
          href: "/dashboard/stock-admin",
        },
      ]}
    >
      <Tabs
        mt="md"
        keepMounted={false}
        value={searchParams.get("tab") || "bulk-update"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
      >
        <Tabs.List>
          <Tabs.Tab value="bulk-update">Toplu Stok Güncelle</Tabs.Tab>
          <Tabs.Tab value="fn-update">FN İçerik Güncelle</Tabs.Tab>
          <Tabs.Tab value="shopify-update">Shopify İçerik Güncelle</Tabs.Tab>
          <Tabs.Tab value="decis">Desiler</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel mt="md" value="bulk-update">
          <BulkUpdateStock />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="fn-update">
          <FnUpdateIngredients />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="shopify-update">
          <ShopifyUpdateIngredients />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="decis">
          <Decis />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
