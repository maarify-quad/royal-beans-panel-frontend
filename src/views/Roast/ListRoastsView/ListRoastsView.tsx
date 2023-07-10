import { Suspense, lazy } from "react";

// Routing
import { Link, useSearchParams } from "react-router-dom";

// Redux
import { useReduxSelector } from "@app/hook";
import { selectIsAdmin } from "@slices/authSlice";

// UI Components
import { Group, Button, Tabs, LoadingOverlay } from "@mantine/core";
import { openModal } from "@mantine/modals";

// Icons
import { IconCoffee, IconFileDownload, IconPlus } from "@tabler/icons";

// Components
import { RoastIngredientsTab } from "./RoastIngredientsTab";
import { RoastsTab } from "./RoastsTab";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy Components
const ExcelExportRoasts = lazy(() => import("@components/Roast/ExcelExportRoasts"));

export const ListRoastsView = () => {
  const isAdmin = useReduxSelector(selectIsAdmin);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExcelExport = () => {
    openModal({
      title: "Kavrum Exceli İndir",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <ExcelExportRoasts />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Kavrumlar"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Kavrumlar",
          href: "/dashboard/roasts",
        },
      ]}
      actions={
        <Group>
          <Button leftIcon={<IconCoffee />} component={Link} to="/dashboard/roasts/create">
            Yeni Kavrum
          </Button>
          {isAdmin && (
            <Button
              leftIcon={<IconPlus />}
              component={Link}
              to="/dashboard/roasts/ingredients/create"
            >
              Yeni Kavrum İçeriği
            </Button>
          )}
          <Button color="green" onClick={handleExcelExport} leftIcon={<IconFileDownload />}>
            Excel
          </Button>
        </Group>
      }
    >
      <Tabs
        value={searchParams.get("tab") || "roasts"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
        keepMounted={false}
        mt="md"
      >
        <Tabs.List>
          <Tabs.Tab value="roasts">Kavrumlar</Tabs.Tab>
          {isAdmin && <Tabs.Tab value="roast-ingredients">Kavrum İçerikleri</Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value="roasts" mt="md">
          <RoastsTab />
        </Tabs.Panel>
        {isAdmin && (
          <Tabs.Panel value="roast-ingredients" mt="md">
            <RoastIngredientsTab />
          </Tabs.Panel>
        )}
      </Tabs>
    </PageLayout>
  );
};
