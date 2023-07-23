import { useState } from "react";

// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Interfaces
import { Customer } from "@interfaces/customer";

export const CreateOrderView = () => {
  const [customer, setCustomer] = useState<Customer>();

  return (
    <PageLayout
      title={`Yeni Sipariş${customer ? ` - ${customer.name}` : ""}`}
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
          label: "Yeni Sipariş",
          href: "/dashboard/orders/create",
        },
      ]}
    >
      <Form setCustomer={setCustomer} />
    </PageLayout>
  );
};
