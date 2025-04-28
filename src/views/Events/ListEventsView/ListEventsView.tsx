import React from 'react'
import { Link } from "react-router-dom";

// UI Components
import { Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListEventsView = () => {
  return (
    <PageLayout
      title="Etkinlikler"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Etkinlikler",
          href: "/dashboard/events",
        },
      ]}
      actions={
        <Group>
          <Button
            leftIcon={<IconPlus />}
            component={Link}
            to="/dashboard/events/create"
          >
            Yeni Etkinlik
          </Button>
        </Group>
      }
    >
      <Results />
    </PageLayout>
  )
}
