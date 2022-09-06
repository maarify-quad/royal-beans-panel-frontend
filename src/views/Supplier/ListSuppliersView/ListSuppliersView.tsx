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
const CreateSupplier = React.lazy(() =>
  import("../../../components/Supplier/CreateSupplier").then((module) => ({
    default: module.CreateSupplier,
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

export const ListSuppliersView = () => {
  const { classes } = useStyles();

  const onCreateSupplierClick = () => {
    openModal({
      key: "createSupplier",
      title: "Tedarikçi Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateSupplier />
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
        <Anchor component={Link} to="/dashboard/suppliers">
          Tedarikçiler
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title order={2} className={classes.rootTitle}>
          Tedarikçiler
        </Title>
        <Button leftIcon={<UserPlusIcon />} onClick={onCreateSupplierClick}>
          Yeni Tedarikçi
        </Button>
      </Group>
      <Results />
    </div>
  );
};
