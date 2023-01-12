import React from "react";

// Routing
import { Link, useParams, useNavigate } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";
import {
  useGetOrderByOrderIdQuery,
  useUpdateManualOrderProductsMutation,
} from "@services/orderApi";

// UI Components
import { Breadcrumbs, createStyles, Loader, Title, Anchor, Grid } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { Form, Summary, Inputs, schema, initialValues } from "./Form";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
  titleLink: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const UpdateManualOrderView = () => {
  const { classes } = useStyles();

  // Routing
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  // Queries
  const { data, isLoading: isOrderLoading } = useGetOrderByOrderIdQuery(orderId!, {
    skip: !orderId,
  });
  const { data: products, isLoading: isProductsLoading } = useGetProductsByStorageTypeQuery("FN");

  // Mutations
  const [updateOrderProducts, { isLoading: isUpdating }] = useUpdateManualOrderProductsMutation();

  const onUpdateOrderSubmit = async (values: Inputs) => {
    try {
      if (!data?.order) return;

      await updateOrderProducts({
        orderId: data.order.orderId,
        orderProducts: values.orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Gönderi güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });

      navigate(`/dashboard/orders/${data.order.orderId}`);
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  if (isOrderLoading || isProductsLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/orders">
          Siparişler
        </Anchor>
        <Anchor component={Link} to={`/dashboard/orders/manual/update/${orderId}`}>
          Güncelle
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle} mb="md">
        #{orderId} - Manuel Gönderi Güncelle
      </Title>
      <form onSubmit={form.onSubmit(onUpdateOrderSubmit)}>
        <Grid>
          <Grid.Col lg={6}>
            <Form form={form} products={products} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} submitProps={{ text: "Gönderi Güncelle", loading: isUpdating }} />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
