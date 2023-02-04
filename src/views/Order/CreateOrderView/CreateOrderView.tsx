// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const CreateOrderView = () => {
  return (
    <PageLayout
      title="Yeni Sipariş"
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
      <Form />
    </PageLayout>
  );
};
