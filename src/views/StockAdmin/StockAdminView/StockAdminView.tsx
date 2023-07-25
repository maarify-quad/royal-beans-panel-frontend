// Routing
import { useSearchParams } from "react-router-dom";

// Services
import { useUpdateDailyStockMutation } from "@services/stockApi";

// Mantine
import { Button, Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck, IconSettingsAutomation } from "@tabler/icons";

// Components
import BulkUpdateStock from "./BulkUpdateStock";
import FnUpdateIngredients from "./FnUpdateIngredients";
import { ShopifyUpdateIngredients } from "./ShopifyUpdateIngredients";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { openConfirmModal } from "@mantine/modals";

export const StockAdminView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mutations
  const [updateDailyStock, { isLoading }] = useUpdateDailyStockMutation();

  const handleUpdateDailyStock = async () => {
    openConfirmModal({
      title: "Stokları güncellemek istediğinize emin misiniz?",
      confirmProps: { color: "green" },
      labels: { confirm: "Güncelle", cancel: "İptal" },
      onConfirm: async () => {
        try {
          await updateDailyStock().unwrap();
          showNotification({
            title: "Başarılı",
            message: "Stoklar güncellendi",
            color: "green",
            icon: <IconCircleCheck />,
          });
        } catch {}
      },
    });
  };

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
      actions={
        <Button
          loading={isLoading}
          leftIcon={<IconSettingsAutomation />}
          onClick={handleUpdateDailyStock}
        >
          Stok Güncelle
        </Button>
      }
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
      </Tabs>
    </PageLayout>
  );
};
