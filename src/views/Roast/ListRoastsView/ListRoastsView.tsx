// Routing
import { Link, useSearchParams } from "react-router-dom";

// Redux
import { useReduxSelector } from "@app/hook";
import { selectIsAdmin } from "@slices/authSlice";

// UI Components
import { Group, Button, Tabs } from "@mantine/core";

// Icons
import { IconCoffee, IconPlus } from "@tabler/icons";

// Components
import { RoastIngredientsTab } from "./RoastIngredientsTab";
import { RoastsTab } from "./RoastsTab";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListRoastsView = () => {
  const isAdmin = useReduxSelector(selectIsAdmin);
  const [searchParams, setSearchParams] = useSearchParams();

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
        </Group>
      }
    >
      <Tabs
        defaultValue={searchParams.get("tab") || "roasts"}
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
