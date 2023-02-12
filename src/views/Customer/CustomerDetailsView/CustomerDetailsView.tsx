// Routing
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetCustomerByIdQuery } from "@services/customerApi";

// UI Components
import { Alert, Loader, Tabs, Button, Text } from "@mantine/core";

// Hooks
import { useCreateDeliveryAddress } from "@hooks/delivery-address/useCreateDeliveryAddress";

// Icons
import { IconPlus, IconAlertCircle } from "@tabler/icons";

// Components
import { DetailsTab } from "./DetailsTab";
import { LastOrdersTab } from "./LastOrdersTab";
import { LastProductsTab } from "./LastProductsTab";
import { PriceListTab } from "./PriceListTab";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const CustomerDetailsView = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openCreateDeliveryAddress } = useCreateDeliveryAddress();

  // Queries
  const { data, isLoading, isDeactivated, error } = useGetCustomerByIdQuery(id!, {
    skip: !id,
    selectFromResult: ({ ...rest }) => ({
      ...rest,
      isDeactivated: !!rest.data?.deletedAt,
    }),
  });

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Tedarikçiye ulaşılamadı"
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
    <>
      {isDeactivated && (
        <Alert icon={<IconAlertCircle />} variant="filled" color="red" mb="md">
          <Text weight="bold">Bu müşteri devre dışı bırakılmıştır</Text>
        </Alert>
      )}
      <PageLayout
        title={data?.name}
        breadcrumbs={[
          {
            label: "Panel",
            href: "/dashboard",
          },
          {
            label: "Müşteriler",
            href: "/dashboard/customers",
          },
          {
            label: data?.name,
            href: `/dashboard/customers/${id}`,
          },
        ]}
        actions={
          !isDeactivated && (
            <Button
              leftIcon={<IconPlus />}
              onClick={() => {
                openCreateDeliveryAddress(data!.id);
              }}
            >
              Yeni Teslimat Adresi
            </Button>
          )
        }
      >
        {data && (
          <>
            <Tabs
              defaultValue={searchParams.get("tab") || "details"}
              onTabChange={(tab: string) => setSearchParams({ tab })}
              mt="md"
            >
              <Tabs.List>
                <Tabs.Tab value="details">Detaylar</Tabs.Tab>
                <Tabs.Tab value="lastOrders">Son Siparişler</Tabs.Tab>
                <Tabs.Tab value="lastProducts">Son Ürünler</Tabs.Tab>
                <Tabs.Tab value="priceList">Fiyat Listesi</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="details" mt="md">
                <DetailsTab customer={data} />
              </Tabs.Panel>
              <Tabs.Panel value="lastOrders" mt="md">
                <LastOrdersTab customer={data.name} />
              </Tabs.Panel>
              <Tabs.Panel value="lastProducts" mt="md">
                <LastProductsTab customer={data.name} />
              </Tabs.Panel>
              <Tabs.Panel value="priceList" mt="md">
                <PriceListTab customer={data} />
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </PageLayout>
    </>
  );
};
