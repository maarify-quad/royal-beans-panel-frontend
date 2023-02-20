// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetSupplierByIdQuery } from "@services/supplierApi";

// UI Components
import { Tabs } from "@mantine/core";

// Components
import { DetailsTab } from "./DetailsTab";
import { DeliveriesTab } from "./DeliveriesTab";

// Layout
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const SupplierDetailsView = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { supplier, isLoading, error } = useGetSupplierByIdQuery(id!, {
    skip: !id,
    selectFromResult: ({ data, ...rest }) => ({
      supplier: data,
      ...rest,
    }),
  });

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
      isLoading={isLoading}
      error={error}
    >
      {supplier && (
        <Tabs
          keepMounted={false}
          defaultValue={searchParams.get("tab") || "details"}
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
