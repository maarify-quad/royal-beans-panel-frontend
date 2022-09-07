import React, { useEffect } from "react";

// Routing
import { Link, useParams, useNavigate } from "react-router-dom";

// Services
import { useGetPriceListProductsQuery } from "@services/priceListProductApi";
import { useGetOrderByOrderNumberQuery, useUpdateOrderProductsMutation } from "@services/orderApi";

// UI Components
import { Breadcrumbs, createStyles, Loader, Title, Anchor, Grid } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { X as ErrorIcon, CircleCheck as SuccessIcon } from "tabler-icons-react";

// Components
import { Form, Summary, Inputs, schema, initialValues } from "@components/Order/CartForm";

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

export const UpdateOrderView = () => {
  const { classes } = useStyles();

  // Routing
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  // Queries
  const { data, isLoading: isOrderLoading } = useGetOrderByOrderNumberQuery(
    parseInt(orderNumber!),
    {
      skip: !orderNumber,
    }
  );
  const { data: priceListProducts, isLoading: isPriceListProductsLoading } =
    useGetPriceListProductsQuery(data?.order.customer.priceListId!, {
      skip: !data?.order,
    });

  // Mutations
  const [updateOrderProducts, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateOrderProductsMutation();

  const onUpdateOrderSubmit = async (values: Inputs) => {
    try {
      await updateOrderProducts({
        orderNumber: parseInt(orderNumber!),
        orderProducts: values.orderProducts,
      });
    } catch (error) {
      showNotification({
        title: "Hata",
        message: "Beklenmedik bir hata oluştu",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  };

  useEffect(() => {
    if (isUpdated) {
      showNotification({
        title: "Başarılı",
        message: "Sipariş güncellendi",
        color: "green",
        icon: <SuccessIcon />,
      });
      navigate(`/dashboard/orders/${orderNumber}`);
    }
  }, [isUpdated]);

  if (isOrderLoading || isPriceListProductsLoading) {
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
        <Anchor component={Link} to={`/dashboard/orders/update/${orderNumber}`}>
          Güncelle
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle} mb="md">
        #{data?.order.orderNumber} - Sipariş Güncelle
      </Title>
      <form onSubmit={form.onSubmit(onUpdateOrderSubmit)}>
        <Grid>
          <Grid.Col lg={6}>
            <Form form={form} priceListProducts={priceListProducts} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} submitProps={{ text: "Siparişi Güncelle", loading: isUpdating }} />
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};