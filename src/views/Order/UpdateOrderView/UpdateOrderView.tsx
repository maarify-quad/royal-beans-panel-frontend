// Routing
import { useParams, useNavigate } from "react-router-dom";

// Services
import { useGetPriceListProductsQuery } from "@services/priceListProductApi";
import { useGetOrderByOrderIdQuery, useUpdateOrderProductsMutation } from "@services/orderApi";

// UI Components
import { Loader, Grid } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { Form, Summary, Inputs, schema, initialValues } from "@components/Order/CartForm";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const UpdateOrderView = () => {
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
  const { priceListProducts, isLoading: isPriceListProductsLoading } = useGetPriceListProductsQuery(
    {
      priceListId: data?.order.customer?.priceListId!,
    },
    {
      skip: orderId?.startsWith("MG") || !data?.order || !data?.order.customer?.priceListId,
      selectFromResult: ({ data, ...rest }) => ({
        priceListProducts: data?.priceListProducts,
        ...rest,
      }),
    }
  );

  // Mutations
  const [updateOrderProducts, { isLoading: isUpdating }] = useUpdateOrderProductsMutation();

  const onUpdateOrderSubmit = async (values: Inputs) => {
    try {
      if (!data?.order) return;

      await updateOrderProducts({
        orderId: data.order.orderId,
        orderProducts: values.orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Sipariş güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });

      navigate(`/dashboard/orders/${data.order.orderId}`);
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  if (isOrderLoading || isPriceListProductsLoading) {
    return <Loader />;
  }

  return (
    <PageLayout
      title={`#${orderId} - Sipariş Güncelle`}
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
          label: `Güncelle`,
          href: `/dashboard/orders/update/${orderId}`,
        },
      ]}
    >
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
    </PageLayout>
  );
};
