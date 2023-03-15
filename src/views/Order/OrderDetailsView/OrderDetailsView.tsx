// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetOrderByOrderIdQuery } from "@services/orderApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Alert, Tabs, Text } from "@mantine/core";

// Icons
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons";

// Components
import ProductsTab from "./ProductsTab";
import DetailsTab from "./DetailsTab";
import Actions from "./Actions";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const OrderDetailsView = () => {
  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useGetOrderByOrderIdQuery(orderId ?? skipToken);

  if (!orderId) {
    return <Navigate to="/dashboard" replace />;
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
      isLoading={isLoading}
      error={error}
    >
      {data?.order && data.order.isCancelled && (
        <Alert mt="md" color="red" variant="filled" icon={<IconInfoCircle />}>
          <Text weight={700}>Bu sipariş iptal edilmiştir</Text>
        </Alert>
      )}
      {data?.order.specialNote && (
        <Alert mt="md" title="Özel Not" color="orange" icon={<IconAlertCircle />}>
          <Text weight={700}>{data.order.specialNote}</Text>
        </Alert>
      )}
      {data && (
        <Tabs
          keepMounted={false}
          value={searchParams.get("tab") || "products"}
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
