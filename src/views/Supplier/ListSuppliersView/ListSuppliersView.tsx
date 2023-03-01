import { Suspense, lazy } from "react";

// UI Components
import { Button, LoadingOverlay } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconUserPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const CreateSupplier = lazy(() => import("@components/Supplier/CreateSupplier"));

export const ListSuppliersView = () => {
  const handleCreateSupplier = () => {
    openModal({
      key: "createSupplier",
      title: "Tedarikçi Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateSupplier />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Tedarikçiler"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Tedarikçiler",
          href: "/dashboard/suppliers",
        },
      ]}
      actions={
        <Button leftIcon={<IconUserPlus />} onClick={handleCreateSupplier}>
          Yeni Tedarikçi
        </Button>
      }
    >
      <Results />
    </PageLayout>
  );
};
