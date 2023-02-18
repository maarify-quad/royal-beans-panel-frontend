// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCreateRoastMutation } from "@services/roastApi";

// UI Components
import { Grid, LoadingOverlay } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Validation
import { Inputs } from "./Form/validation/Inputs";
import { schema, initialValues } from "./Form/validation/schema";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { Form } from "./Form";
import { Rounds } from "./Rounds";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Utils
import { handleFormError } from "@utils/form";

export const CreateRoastView = () => {
  const navigate = useNavigate();

  // Services
  const [createRoast, { isLoading }] = useCreateRoastMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onCreateRoastSubmit = async (values: typeof form.values) => {
    try {
      const { roastDetails } = values;
      await createRoast({
        roastDetails,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Kavrum oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });
      navigate("/dashboard/roasts");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <PageLayout
      title="Yeni Kavrum"
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
          label: "Yeni Kavrum",
          href: "/dashboard/roasts/create",
        },
      ]}
    >
      <form onSubmit={form.onSubmit(onCreateRoastSubmit, handleFormError)}>
        <LoadingOverlay visible={isLoading} />
        <Grid gutter="xl" mt="md">
          <Grid.Col lg={6}>
            <Form form={form} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Rounds form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </PageLayout>
  );
};
