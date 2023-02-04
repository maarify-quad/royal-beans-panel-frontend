// Routing
import { Link } from "react-router-dom";

// UI Components
import { Group, Button } from "@mantine/core";

// Icons
import { IconCoffee, IconPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListRoastsView = () => {
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
          <Button leftIcon={<IconPlus />} onClick={() => window.alert("TODO")}>
            Yeni Kavrum İçeriği
          </Button>
        </Group>
      }
    >
      <Results />
    </PageLayout>
  );
};
