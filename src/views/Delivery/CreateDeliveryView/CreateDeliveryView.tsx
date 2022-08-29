import React, { useEffect } from "react";

// Routing
import { Link, useNavigate } from "react-router-dom";

// Services
import { useCreateDeliveryMutation } from "@services/deliveryApi";

// UI Components
import { createStyles, Title, Breadcrumbs, Anchor, Grid, LoadingOverlay } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { X as ErrorIcon, CircleCheck as CircleCheckIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./Form/validation/Inputs";
import { schema, initialValues } from "./Form/validation/schema";

// Components
import { Form } from "./Form";
import { Summary } from "./Summary";

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

export const CreateDeliveryView = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  // Services
  const [createDelivery, { isLoading, isSuccess, data, error }] = useCreateDeliveryMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onCreateDeliverySubmit = async (values: typeof form.values) => {
    try {
      const { deliveryDate, invoiceDate, supplierId, deliveryDetails } = values;
      await createDelivery({
        deliveryDate,
        invoiceDate,
        supplierId,
        deliveryDetails,
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
        message: data?.id ? `${data.id} koduyla sevkiyat oluşturuldu` : "Sevkiyat oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      navigate("/dashboard/deliveries");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Sevkiyat oluşturma başarısız",
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
        <Anchor component={Link} to="/dashboard/deliveries">
          Sevkiyatlar
        </Anchor>
        <Anchor component={Link} to="/dashboard/deliveries/create">
          Yeni Sevkiyat
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        Sevkiyat Oluştur
      </Title>
      <form onSubmit={form.onSubmit(onCreateDeliverySubmit)}>
        <Grid mt="md">
          <Grid.Col lg={6}>
            <Form form={form} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
