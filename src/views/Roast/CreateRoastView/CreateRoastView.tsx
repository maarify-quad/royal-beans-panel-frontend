import React, { useEffect } from "react";

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
import { X as ErrorIcon, CircleCheck as CircleCheckIcon } from "tabler-icons-react";

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

  // Internal state
  const [roundId, setRoundId] = React.useState(1);

  // Services
  const [createRoast, { isLoading, isSuccess, error }] = useCreateRoastMutation();

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
      });
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Sevkiyat oluşturma başarısız",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Kavrum oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      navigate("/dashboard/roasts");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Kavrum oluşturma başarısız",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

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
            <Form roundId={roundId} form={form} setRoundId={setRoundId} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Rounds form={form} setRoundId={setRoundId} />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
