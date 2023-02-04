import React from "react";

// UI Components
import { Button, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Imports
const CreatePriceList = React.lazy(() => import("@components/PriceList/CreatePriceList"));

export const ListPriceListsView = () => {
  const openCreatePriceList = () => {
    openModal({
      key: "createPriceList",
      title: "Fiyat Listesi Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreatePriceList />
        </React.Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Fiyat Listeleri"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Fiyat Listeleri",
          href: "/dashboard/price-lists",
        },
      ]}
      actions={
        <Button leftIcon={<IconPlus />} onClick={openCreatePriceList}>
          Yeni Fiyat Listesi
        </Button>
      }
    >
      <Results />
    </PageLayout>
  );
};
