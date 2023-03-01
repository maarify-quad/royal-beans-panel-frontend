import { lazy, Suspense } from "react";

// Routing
import { useSearchParams } from "react-router-dom";

// UI Components
import { Tabs, Button, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconPlus } from "@tabler/icons";

// Components
import { StorageProducts } from "./StorageProducts";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const CreateProduct = lazy(() => import("@components/Product/CreateProduct"));

export const ListStorageView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onCreateProductClick = () => {
    openModal({
      key: "createProduct",
      title: "Ürün Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateProduct />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Depo"
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
        <Button leftIcon={<IconPlus />} onClick={onCreateProductClick}>
          Yeni Ürün
        </Button>
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
          <Tabs.Tab value="Other">Diğer</Tabs.Tab>
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
        <Tabs.Panel value="Other" mt="md">
          <StorageProducts storageType="Other" />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
