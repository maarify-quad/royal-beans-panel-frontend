// Components
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const CreateManualOrderView = () => {
  return (
    <PageLayout
      title="Yeni Gönderi"
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
      <Form />
    </PageLayout>
  );
};
