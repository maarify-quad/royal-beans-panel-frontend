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
const CreateCustomerForm = React.lazy(() =>
  import("../../../components/Customer/CreateCustomerForm").then((module) => ({
    default: module.CreateCustomerForm,
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
      title: "Müşteri Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateCustomerForm />
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
