import React from "react";

// Routing
import { Link, Navigate, useParams } from "react-router-dom";

// Services
import { useGetOrderByOrderNumberQuery } from "@services/orderApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Alert,
  Center,
  Loader,
  Tabs,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  TruckDelivery as TruckDeliveryIcon,
} from "tabler-icons-react";

// Components
import { ProductsTab } from "./ProductsTab";
import { DetailsTab } from "./DetailsTab";

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

// Lazy Imports
const UpdateDelivery = React.lazy(() =>
  import("../../../components/Order/UpdateDelivery").then((module) => ({
    default: module.UpdateDelivery,
  }))
);

export const OrderDetailsView = () => {
  const { orderNumber } = useParams();
  const { classes } = useStyles();

  if (!orderNumber) {
    return <Navigate to="/dashboard" replace />;
  }

  const { data, isLoading, error } = useGetOrderByOrderNumberQuery(parseInt(orderNumber));

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
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
    <Center style={{ height: "100%" }}>
      <Loader />
    </Center>;
  }

  const openUpdateDelivery = () => {
    if (!data?.order) return;

    openModal({
      key: "updateDelivery",
      title: "Kargola",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <UpdateDelivery order={data.order} />
        </React.Suspense>
      ),
    });
  };

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/orders">
          Siparişler
        </Anchor>
        <Anchor component={Link} to={`/dashboard/orders/${orderNumber}`}>
          {orderNumber}
        </Anchor>
      </Breadcrumbs>
      <Group position="apart">
        <Title order={2} className={classes.rootTitle}>
          #{data?.order.orderNumber} - {data?.order.customer.name}
        </Title>
        <Button leftIcon={<TruckDeliveryIcon />} onClick={openUpdateDelivery}>
          Kargola
        </Button>
      </Group>
      {data && (
        <Tabs defaultValue="products" mt="md">
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
    </div>
  );
};
