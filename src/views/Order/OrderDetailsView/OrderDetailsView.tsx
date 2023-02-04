// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetOrderByOrderIdQuery } from "@services/orderApi";

// UI Components
import { Alert, Loader, Tabs, Text } from "@mantine/core";

// Icons
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons";

// Components
import { ProductsTab } from "./ProductsTab";
import { DetailsTab } from "./DetailsTab";
import { Actions } from "./Actions";
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const OrderDetailsView = () => {
  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useGetOrderByOrderIdQuery(orderId || "", {
    skip: !orderId,
  });

  if (!orderId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Siparişe ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout
      title={`#${orderId}  - ${data?.order.customer?.name || data?.order.receiver}`}
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
          label: orderId,
          href: `/dashboard/orders/${orderId}`,
        },
      ]}
      actions={data?.order && <Actions order={data?.order} />}
    >
      {data?.order && data.order.isCancelled && (
        <Alert mt="md" color="red" variant="filled" icon={<IconInfoCircle />}>
          <Text weight={700}>Bu sipariş iptal edilmiştir</Text>
        </Alert>
      )}
      {data && (
        <Tabs
          keepMounted={false}
          defaultValue={searchParams.get("tab") || "products"}
          onTabChange={(tab: string) => setSearchParams({ tab })}
          mt="md"
        >
          <Tabs.List>
            <Tabs.Tab value="products">Ürünler</Tabs.Tab>
            <Tabs.Tab value="details">Detaylar</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="products" mt="md">
            <ProductsTab order={data.order} />
          </Tabs.Panel>
          <Tabs.Panel value="details" mt="md">
            <DetailsTab order={data.order} />
          </Tabs.Panel>
        </Tabs>
      )}
    </PageLayout>
  );
};
