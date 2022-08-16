import React from "react";

// Routing
import { Navigate, Link, useParams } from "react-router-dom";

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
} from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Components
import { DetailsTab } from "./DetailsTab";
import { LastOrdersTab } from "./LastOrdersTab";
import { LastProductsTab } from "./LastProductsTab";

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

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  const { data, isLoading, error } = useGetCustomerByIdQuery(parseInt(id));

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
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
      <Title className={classes.rootTitle}>{data?.name}</Title>
      {data && (
        <Tabs defaultValue="details" mt="md">
          <Tabs.List>
            <Tabs.Tab value="details">Detaylar</Tabs.Tab>
            <Tabs.Tab value="lastOrders">Son Siparişler</Tabs.Tab>
            <Tabs.Tab value="lastProducts">Son Ürünler</Tabs.Tab>
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
        </Tabs>
      )}
    </div>
  );
};
