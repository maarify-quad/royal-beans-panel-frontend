// Routing
import { useParams, useNavigate } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";
import {
  useGetOrderByOrderIdQuery,
  useUpdateManualOrderProductsMutation,
} from "@services/orderApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Loader, Grid } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { Form, Summary, Inputs, schema, initialValues } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Utils
import { handleFormError } from "@utils/form";

export const UpdateManualOrderView = () => {
  // Routing
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  // Queries
  const { data, isLoading: isOrderLoading } = useGetOrderByOrderIdQuery(orderId ?? skipToken);
  const { products, isLoading: isProductsLoading } = useGetProductsByStorageTypeQuery(
    {
      storageType: "FN",
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

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
    <PageLayout
      title={`#${orderId} - Gönderi Güncelle`}
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
          href: `/dashboard/orders/manual/update/${orderId}`,
        },
      ]}
    >
      <form onSubmit={form.onSubmit(onUpdateOrderSubmit, handleFormError)}>
        <Grid>
          <Grid.Col lg={6}>
            <Form form={form} products={products} />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} submitProps={{ text: "Gönderi Güncelle", loading: isUpdating }} />
          </Grid.Col>
        </Grid>
      </form>
    </PageLayout>
  );
};
