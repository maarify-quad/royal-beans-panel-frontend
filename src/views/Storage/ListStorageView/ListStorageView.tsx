import { lazy, Suspense } from "react";

// Routing
import { useSearchParams } from "react-router-dom";

// Services
import { useUpdateDailyStockMutation } from "@services/stockApi";

// UI Components
import { Tabs, Button, LoadingOverlay, Group } from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Hooks
import { useVerifyRole } from "@hooks/auth/useVerifyRole";

// Icons
import { IconCircleCheck, IconFileDownload, IconPlus, IconSettingsAutomation } from "@tabler/icons";

// Components
import { StorageProducts } from "./StorageProducts";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const CreateProduct = lazy(() => import("@components/Product/CreateProduct"));
const ExcelExportProducts = lazy(() => import("@components/Product/ExcelExportProducts"));

export const ListStorageView = () => {
  const canSeeUpdateDailyStocks = useVerifyRole(["admin", "updateDailyStocks"]);
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

  const handleCreateProduct = () => {
    const storageType =
      searchParams.get("tab") === "Diğer" ? "Other" : searchParams.get("tab") || "HM";
    openModal({
      key: "createProduct",
      title: "Ürün Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateProduct storageType={storageType} />
        </Suspense>
      ),
    });
  };

  const handleExcelExport = () => {
    openModal({
      key: "excelExportProducts",
      title: "Ürün Exceli İndir",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <ExcelExportProducts />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title={`Depo - ${searchParams.get("tab") || "HM"} `}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Depo",
          href: "/dashboard/storage",
        },
      ]}
      actions={
        <Group>
          <Button leftIcon={<IconPlus />} onClick={handleCreateProduct}>
            Yeni Ürün
          </Button>
          {canSeeUpdateDailyStocks && (
            <Button
              loading={isLoading}
              leftIcon={<IconSettingsAutomation />}
              onClick={handleUpdateDailyStock}
            >
              Stok Güncelle
            </Button>
          )}
          <Button color="green" onClick={handleExcelExport} leftIcon={<IconFileDownload />}>
            Excel
          </Button>
        </Group>
      }
    >
      <Tabs
        keepMounted={false}
        value={searchParams.get("tab") || "HM"}
        onTabChange={(value) => setSearchParams({ tab: value as string })}
        mt="md"
      >
        <Tabs.List>
          <Tabs.Tab value="HM">Hammadde</Tabs.Tab>
          <Tabs.Tab value="YM">Yarı Mamül</Tabs.Tab>
          <Tabs.Tab value="FN">Bitmiş Ürün</Tabs.Tab>
          <Tabs.Tab value="Diğer">Diğer</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="HM" mt="md">
          <StorageProducts storageType="HM" />
        </Tabs.Panel>
        <Tabs.Panel value="YM" mt="md">
          <StorageProducts storageType="YM" />
        </Tabs.Panel>
        <Tabs.Panel value="FN" mt="md">
          <StorageProducts storageType="FN" />
        </Tabs.Panel>
        <Tabs.Panel value="Diğer" mt="md">
          <StorageProducts storageType="Other" />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
