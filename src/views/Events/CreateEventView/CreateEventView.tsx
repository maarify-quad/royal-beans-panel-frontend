import React from "react";

// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const CreateEventView = () => {
  return (
    <PageLayout
      title="Yeni Etkinlik"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Etkinlikler",
          href: "/dashboard/events",
        },
        {
          label: "Yeni Etkinlik",
          href: "/dashboard/events/create",
        },
      ]}
    >
      <Form />
    </PageLayout>
  );
};
