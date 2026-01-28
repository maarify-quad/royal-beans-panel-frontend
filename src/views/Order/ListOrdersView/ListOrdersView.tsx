import { Suspense, lazy } from "react";

// Routing
import { Link, useSearchParams } from "react-router-dom";

// UI Components
import { Group, Button, Tabs, LoadingOverlay } from "@mantine/core";
import { openModal } from "@mantine/modals";

// Icons
import { IconFileDownload, IconPaperBag, IconShoppingCartPlus, IconCoffee } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const ExcelExportOrders = lazy(() => import("@components/Order/ExcelExportOrders"));

export const ListOrdersView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExcelExport = () => {
    openModal({
      title: "Sipariş Exceli İndir",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <ExcelExportOrders />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Siparişler"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Siparişler",
          href: "/dashboard/orders",
        },
      ]}
      actions={
        <Group>
          <Button
            leftIcon={<IconShoppingCartPlus />}
            component={Link}
            to="/dashboard/orders/create"
          >
            Yeni Sipariş
          </Button>
          <Button leftIcon={<IconPaperBag />} component={Link} to="/dashboard/orders/manual/create">
            Yeni Gönderi
          </Button>
          <Button leftIcon={<IconCoffee />} component={Link} to="/dashboard/orders/fason/create" color="orange">
            Fason Sipariş
          </Button>
          <Button color="green" onClick={handleExcelExport} leftIcon={<IconFileDownload />}>
            Excel
          </Button>
        </Group>
      }
    >
      <Tabs
        mt="md"
        keepMounted={false}
        value={searchParams.get("tab") || "all"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
      >
        <Tabs.List>
          <Tabs.Tab value="all">Tüm Siparişler</Tabs.Tab>
          <Tabs.Tab value="bulk">Toplu Siparişler</Tabs.Tab>
          <Tabs.Tab value="manual">Manuel Gönderiler</Tabs.Tab>
          <Tabs.Tab value="fason">Fason Siparişler</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel mt="md" value="all">
          <Results />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="bulk">
          <Results type="BULK" />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="manual">
          <Results type="MANUAL" />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="fason">
          <Results type="FASON" />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
