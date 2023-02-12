// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Components
import { Form } from "./Form";

export const CreateRoastIngredientView = () => {
  return (
    <PageLayout
      title="Yeni Kavrum İçeriği"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Kavrumlar",
          href: "/dashboard/roasts",
        },
        {
          label: "Yeni Kavrum İçeriği",
          href: "/dashboard/roasts/ingredients/create",
        },
      ]}
    >
      <Form />
    </PageLayout>
  );
};
