import React from "react";

// Routing
import { Link, useNavigate } from "react-router-dom";

// Services
import { useCreateRoastMutation } from "@services/roastApi";

// UI Components
import { createStyles, Title, Breadcrumbs, Anchor, Grid, LoadingOverlay } from "@mantine/core";

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

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const CreateRoastView = () => {
  const { classes } = useStyles();
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
    <div className={classes.root}>
      <LoadingOverlay visible={isLoading} />
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/roasts">
          Kavrumlar
        </Anchor>
        <Anchor component={Link} to="/dashboard/roasts/create">
          Yeni Kavrum
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        Kavrum Oluştur
      </Title>
      <form onSubmit={form.onSubmit(onCreateRoastSubmit)}>
        <Grid gutter="xl" mt="md">
          <Grid.Col lg={6}>
            <Form form={form} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Rounds form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
