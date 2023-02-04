import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { Button } from "@mantine/core";

// Icons
import { IconTruckLoading } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListDeliveriesView = () => {
  return (
    <PageLayout
      title="Sevkiyatlar"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Sevkiyatlar",
          href: "/dashboard/deliveries",
        },
      ]}
      actions={
        <Button leftIcon={<IconTruckLoading />} component={Link} to="/dashboard/deliveries/create">
          Yeni Sevkiyat
        </Button>
      }
    >
      <Results />
    </PageLayout>
  );
};
