import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import {
  createStyles,
  Title,
  Group,
  Button,
  Breadcrumbs,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { UserPlus as UserPlusIcon } from "tabler-icons-react";

// Components
import { Results } from "./Results";

// Lazy Components
const CreateCustomer = React.lazy(() =>
  import("../../../components/Customer/CreateCustomer").then((module) => ({
    default: module.CreateCustomer,
  }))
);

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const ListCustomersView = () => {
  const { classes } = useStyles();

  const onCreateCustomerClick = () => {
    openModal({
      key: "createCustomerModal",
      title: "Müşteri Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateCustomer />
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
        <Anchor component={Link} to="/dashboard/customers">
          Müşteriler
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title className={classes.rootTitle}>Müşteriler</Title>
        <Button leftIcon={<UserPlusIcon />} onClick={onCreateCustomerClick}>
          Yeni Müşteri
        </Button>
      </Group>
      <Results />
    </div>
  );
};
