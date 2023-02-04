// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCreateDeliveryMutation } from "@services/deliveryApi";

// UI Components
import { Grid, LoadingOverlay } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs } from "./Form/validation/Inputs";
import { schema, initialValues } from "./Form/validation/schema";

// Components
import { Form } from "./Form";
import { Summary } from "./Summary";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Utils
import { handleFormError } from "@utils/form";

export const CreateDeliveryView = () => {
  const navigate = useNavigate();

  // Services
  const [createDelivery, { isLoading }] = useCreateDeliveryMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onCreateDeliverySubmit = async (values: typeof form.values) => {
    try {
      const { deliveryDate, invoiceDate, supplierId, deliveryDetails } = values;
      const result = await createDelivery({
        deliveryDate,
        invoiceDate,
        supplierId,
        deliveryDetails,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: `${result.id} koduyla sevkiyat oluşturuldu`,
        icon: <IconCircleCheck />,
        color: "green",
      });
      navigate("/dashboard/deliveries");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <PageLayout
      title="Sevkiyat Oluştur"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Sevkiyatlar",
          href: "/dashboard/deliveries",
        },
        {
          label: "Yeni Sevkiyat",
          href: "/dashboard/deliveries/create",
        },
      ]}
    >
      <form onSubmit={form.onSubmit(onCreateDeliverySubmit, handleFormError)}>
        <LoadingOverlay visible={isLoading} />
        <Grid mt="md">
          <Grid.Col lg={6}>
            <Form form={form} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </PageLayout>
  );
};
