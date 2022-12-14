import React from "react";

// Routing
import { Link, Navigate, useParams } from "react-router-dom";

// Services
import { useGetSupplierByIdQuery } from "@services/supplierApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Box,
  Alert,
  Loader,
  Center,
  Tabs,
} from "@mantine/core";

// Icons
import { IconInfoCircle, IconTruckDelivery, IconListDetails } from "@tabler/icons";

// Components
import { DetailsTab } from "./DetailsTab";
import { DeliveriesTab } from "./DeliveriesTab";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const SupplierDetailsView = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  const { data, isLoading, error } = useGetSupplierByIdQuery(id!, {
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
        <Anchor component={Link} to="/dashboard/suppliers">
          Tedarikçiler
        </Anchor>
        <Anchor component={Link} to={`/dashboard/suppliers/${id}`}>
          {id}
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        {data?.name}
      </Title>
      <Tabs defaultValue="details" mt="md">
        <Tabs.List>
          <Tabs.Tab value="details" icon={<IconListDetails />}>
            Detaylar
          </Tabs.Tab>
          <Tabs.Tab value="deliveries" icon={<IconTruckDelivery />}>
            Sevkiyatlar
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details" mt="md">
          <DetailsTab supplier={data} />
        </Tabs.Panel>
        <Tabs.Panel value="deliveries" mt="md">
          <DeliveriesTab deliveries={data?.deliveries || []} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
