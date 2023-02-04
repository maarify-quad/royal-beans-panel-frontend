import React from "react";

// Routing
import { Navigate, Link, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetCustomerByIdQuery } from "@services/customerApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Alert,
  Loader,
  Center,
  Tabs,
  Group,
  Button,
} from "@mantine/core";

// Hooks
import { useCreateDeliveryAddress } from "@hooks/delivery-address/useCreateDeliveryAddress";

// Icons
import { IconPlus, IconInfoCircle } from "@tabler/icons";

// Components
import { DetailsTab } from "./DetailsTab";
import { LastOrdersTab } from "./LastOrdersTab";
import { LastProductsTab } from "./LastProductsTab";
import { PriceListTab } from "./PriceListTab";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const CustomerDetailsView = () => {
  const { id } = useParams();
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openCreateDeliveryAddress } = useCreateDeliveryAddress();

  // Queries
  const { data, isLoading, error } = useGetCustomerByIdQuery(id!, {
    skip: !id,
  });

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
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
    <Center style={{ height: "100%" }}>
      <Loader />
    </Center>;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/customers">
          Müşteriler
        </Anchor>
        <Anchor component={Link} to={`/dashboard/customers/${id}`}>
          {id}
        </Anchor>
      </Breadcrumbs>
      <Group position="apart">
        <Title order={2} className={classes.rootTitle}>
          {data?.name}
        </Title>
        <Button
          leftIcon={<IconPlus />}
          onClick={() => {
            openCreateDeliveryAddress(data!.id);
          }}
        >
          Yeni Teslimat Adresi
        </Button>
      </Group>
      {data && (
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
      )}
    </div>
  );
};
