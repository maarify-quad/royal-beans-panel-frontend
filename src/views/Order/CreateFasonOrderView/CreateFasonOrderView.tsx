import { useState } from "react";

// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Interfaces
import { Customer } from "@interfaces/customer";

export const CreateFasonOrderView = () => {
  const [customer, setCustomer] = useState<Customer>();

  return (
    <PageLayout
      title={`Fason Sipariş${customer ? ` - ${customer.name}` : ""}`}
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
          label: "Fason Sipariş",
          href: "/dashboard/orders/fason/create",
        },
      ]}
    >
      <Form setCustomer={setCustomer} />
    </PageLayout>
  );
};
