import React from "react";

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

// Lazy Imports
const CreateCustomer = React.lazy(() => import("@components/Customer/CreateCustomer"));

export const ListCustomersView = () => {
  const openCreateCustomer = () => {
    openModal({
      key: "createCustomer",
      title: "Müşteri Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateCustomer />
        </React.Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Müşteriler"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Müşteriler",
          href: "/dashboard/customers",
        },
      ]}
      actions={
        <Button leftIcon={<IconUserPlus />} onClick={openCreateCustomer}>
          Yeni Müşteri
        </Button>
      }
    >
      <Results />
    </PageLayout>
  );
};
