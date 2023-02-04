// Routing
import { Link, useSearchParams } from "react-router-dom";

// UI Components
import { Group, Button, Tabs } from "@mantine/core";

// Icons
import { IconPaperBag, IconShoppingCartPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListOrdersView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
      </Tabs>
    </PageLayout>
  );
};
