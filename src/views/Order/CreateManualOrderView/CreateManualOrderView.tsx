import { useState } from "react";

// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const CreateManualOrderView = () => {
  const [receiver, setReceiver] = useState<string>();

  return (
    <PageLayout
      title={`Yeni Gönderi${receiver ? ` - ${receiver}` : ""}`}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Siparişler",
          href: "/dashboard/orders",
        },
        {
          label: "Yeni Gönderi",
          href: "/dashboard/orders/manual/create",
        },
      ]}
    >
      <Form setReceiver={setReceiver} />
    </PageLayout>
  );
};
