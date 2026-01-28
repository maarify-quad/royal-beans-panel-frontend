// Routing
import { useParams, useNavigate } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";
import {
  useGetOrderByOrderIdQuery,
  useUpdateFasonOrderProductsMutation,
} from "@services/orderApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Loader, Grid, Stack, Card, Text } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { Form } from "./Form";
import { Summary } from "./Form/Summary";

// Validation
import { Inputs } from "./Form/validation/Inputs";
import { initialValues } from "./Form/validation/Inputs";
import { schema } from "./Form/validation/schema";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Utils
import { handleFormError } from "@utils/form";

export const UpdateFasonOrderView = () => {
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
      storageType: "YM",
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

  // Mutations
  const [updateOrderProducts, { isLoading: isUpdating }] = useUpdateFasonOrderProductsMutation();

  const onUpdateOrderSubmit = async (values: Inputs) => {
    try {
      if (!data?.order) return;

      await updateOrderProducts({
        orderId: data.order.orderId,
        orderProducts: values.orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Fason sipariş güncellendi",
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
      title={`#${orderId} - Fason Sipariş Güncelle`}
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
          href: `/dashboard/orders/fason/update/${orderId}`,
        },
      ]}
    >
      <form onSubmit={form.onSubmit(onUpdateOrderSubmit, handleFormError)}>
        <Grid>
          <Grid.Col lg={6}>
            <Form form={form} products={products} />
            <Text my="sm" size="xl" weight={700}>
              Güncel Sepet
            </Text>
            <Stack spacing="sm">
              {data?.order.type === "FASON" &&
                data.order.orderProducts.map((orderProduct) => (
                  <Card withBorder shadow="xs" key={orderProduct.id}>
                    <Card.Section inheritPadding py="xs">
                      <div>
                        <Text weight={700}>{orderProduct.product.name}</Text>
                        <Text color="dimmed" size="sm">
                          {orderProduct.grindType} / {orderProduct.weight}
                        </Text>
                        <Text size="sm">Miktar: {orderProduct.quantity} adet</Text>
                        <Text size="sm" color="dimmed">
                          Fiyat: 0,00 ₺
                        </Text>
                      </div>
                    </Card.Section>
                  </Card>
                ))}
            </Stack>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Summary form={form} submitProps={{ text: "Fason Sipariş Güncelle", loading: isUpdating }} />
          </Grid.Col>
        </Grid>
      </form>
    </PageLayout>
  );
};
