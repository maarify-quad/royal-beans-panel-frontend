// Routing
import { Link } from "react-router-dom";

// UI Components
import { Button } from "@mantine/core";

// Icons
import { IconPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListPriceListsView = () => {
  return (
    <PageLayout
      title="Fiyat Listeleri"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Fiyat Listeleri",
          href: "/dashboard/price-lists",
        },
      ]}
      actions={
        <Button leftIcon={<IconPlus />} component={Link} to="/dashboard/price-lists/create">
          Yeni Fiyat Listesi
        </Button>
      }
    >
      <Results />
    </PageLayout>
  );
};
