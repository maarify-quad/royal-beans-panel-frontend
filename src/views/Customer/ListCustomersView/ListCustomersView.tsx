import { Suspense, lazy } from "react";

// Routing
import { useSearchParams } from "react-router-dom";

// UI Components
import { Button, LoadingOverlay, Tabs } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconUserPlus } from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Imports
const CustomersResult = lazy(() => import("./CustomersResult"));
const ReceiversResult = lazy(() => import("./ReceiversResult"));
const CreateCustomer = lazy(() => import("@components/Customer/CreateCustomer"));

export const ListCustomersView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const openCreateCustomer = () => {
    openModal({
      key: "createCustomer",
      title: "Müşteri Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateCustomer />
        </Suspense>
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
      <Tabs
        mt="md"
        keepMounted={false}
        value={searchParams.get("tab") || "customers"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
      >
        <Tabs.List>
          <Tabs.Tab value="customers">Müşteriler</Tabs.Tab>
          <Tabs.Tab value="receiver">Alıcılar</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="customers">
          <CustomersResult />
        </Tabs.Panel>
        <Tabs.Panel value="receiver">
          <ReceiversResult />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
