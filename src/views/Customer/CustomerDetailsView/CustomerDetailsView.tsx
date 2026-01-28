import { Suspense, lazy } from "react";

// Routing
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetCustomerByIdQuery } from "@services/customerApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import {
  Alert,
  Loader,
  Tabs,
  Button,
  Text,
  Group,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Hooks
import { useCreateDeliveryAddress } from "@hooks/delivery-address/useCreateDeliveryAddress";

// Icons
import { IconPlus, IconAlertCircle, IconEdit, IconList } from "@tabler/icons";

// Components
import { DetailsTab } from "./DetailsTab";
import { LastOrdersTab } from "./LastOrdersTab";
import { LastProductsTab } from "./LastProductsTab";
import { PriceListTab } from "./PriceListTab";
import { DeliveryAddressesTab } from "./DeliveryAddressesTab";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Assets
import ParasutLogo from "@assets/parasut-logo.png";

// Interfaces
import { Customer } from "@interfaces/customer";

// Lazy Imports
const EditCustomer = lazy(() => import("@components/Customer/EditCustomer"));

export const CustomerDetailsView = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openCreateDeliveryAddress } = useCreateDeliveryAddress();

  // Queries
  const { data, isLoading, isFetching, isDeactivated, error } = useGetCustomerByIdQuery(
    id ?? skipToken,
    {
      selectFromResult: ({ ...rest }) => ({
        ...rest,
        isDeactivated: !!rest.data?.deletedAt,
      }),
    }
  );

  const handleEditCustomer = (
    title: string,
    fields: {
      label: string;
      key: keyof Customer;
    }[]
  ) => {
    if (!data) return;
    openModal({
      key: "editCustomer",
      title,
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <EditCustomer fields={fields} customer={data} />
        </Suspense>
      ),
    });
  };

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

  return (
    <>
      {isDeactivated && (
        <Alert icon={<IconAlertCircle />} variant="filled" color="red" mb="md">
          <Text weight="bold">Bu müşteri devre dışı bırakılmıştır</Text>
        </Alert>
      )}
      <PageLayout
        title={
          <Group>
            {data?.name}
            <ActionIcon
              size={22}
              onClick={() =>
                handleEditCustomer("Müşteri İsmi Güncelle", [
                  {
                    label: "Müşteri İsim",
                    key: "name",
                  },
                ])
              }
            >
              <IconEdit />
            </ActionIcon>
          </Group>
        }
        tabTitle={data?.name}
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
            label: id,
            href: `/dashboard/customers/${id}`,
          },
        ]}
        actions={
          !isDeactivated && (
            <Group>
              {!data?.priceListId && (
                <Button
                  component={Link}
                  to={`/dashboard/price-lists/create?customerId=${data?.id}`}
                  leftIcon={<IconList />}
                  color="teal"
                >
                  Fiyat Listesi Oluştur
                </Button>
              )}
              <Button
                leftIcon={<IconPlus />}
                onClick={() => {
                  openCreateDeliveryAddress(data!.id);
                }}
              >
                Yeni Teslimat Adresi
              </Button>
              <Button
                onClick={() =>
                  handleEditCustomer("Müşteri Güncelle", [
                    {
                      label: "Paraşüt ID",
                      key: "parasutId",
                    },
                  ])
                }
                // loading={isCreatingPrasutInvoice}
                // disabled={isCreatingPrasutInvoice}
                leftIcon={<img src={ParasutLogo} style={{ height: 25 }} />}
                color="orange"
                variant="outline"
              >
                Paraşüt
              </Button>
            </Group>
          )
        }
        isLoading={isLoading || isFetching}
      >
        {data && (
          <>
            <Tabs
              value={searchParams.get("tab") || "details"}
              onTabChange={(tab: string) => setSearchParams({ tab })}
              mt="md"
            >
              <Tabs.List>
                <Tabs.Tab value="details">Detaylar</Tabs.Tab>
                <Tabs.Tab value="lastOrders">Son Siparişler</Tabs.Tab>
                <Tabs.Tab value="lastProducts">Son Ürünler</Tabs.Tab>
                <Tabs.Tab value="priceList">Fiyat Listesi</Tabs.Tab>
                <Tabs.Tab value="deliveryAddresses">Teslimat Adresleri</Tabs.Tab>
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
              <Tabs.Panel value="deliveryAddresses" mt="md">
                <DeliveryAddressesTab customer={data} />
              </Tabs.Panel>
            </Tabs>
          </>
        )}
      </PageLayout>
    </>
  );
};
