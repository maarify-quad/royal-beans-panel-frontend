import { lazy, Suspense } from "react";

// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetSupplierByIdQuery } from "@services/supplierApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Button, LoadingOverlay, Tabs } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconEdit } from "@tabler/icons";

// Components
import DetailsTab from "./DetailsTab";
import DeliveriesTab from "./DeliveriesTab";

// Layout
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const EditSupplier = lazy(() => import("@components/Supplier/EditSupplier"));

export const SupplierDetailsView = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { supplier, isLoading, error } = useGetSupplierByIdQuery(id ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => ({
      supplier: data,
      ...rest,
    }),
  });

  const handleEditSupplier = () => {
    if (!supplier) return;
    openModal({
      title: "Tedarikçi Düzenle",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <EditSupplier supplier={supplier} />
        </Suspense>
      ),
    });
  };

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout
      title={supplier?.name}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Tedarikçiler",
          href: "/dashboard/suppliers",
        },
        {
          label: id,
          href: `/dashboard/suppliers/${id}`,
        },
      ]}
      actions={
        <Button onClick={handleEditSupplier} leftIcon={<IconEdit size={20} />}>
          Düzenle
        </Button>
      }
      isLoading={isLoading}
      error={error}
    >
      {supplier && (
        <Tabs
          keepMounted={false}
          value={searchParams.get("tab") || "details"}
          onTabChange={(tab: string) => setSearchParams({ tab })}
          mt="md"
        >
          <Tabs.List>
            <Tabs.Tab value="details">Detaylar</Tabs.Tab>
            <Tabs.Tab value="deliveries">Sevkiyatlar</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="details" mt="md">
            <DetailsTab supplier={supplier} />
          </Tabs.Panel>
          <Tabs.Panel value="deliveries" mt="md">
            <DeliveriesTab supplierId={id} />
          </Tabs.Panel>
        </Tabs>
      )}
    </PageLayout>
  );
};
