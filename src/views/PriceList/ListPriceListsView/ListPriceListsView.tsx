import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import {
  createStyles,
  Title,
  Group,
  Breadcrumbs,
  Anchor,
  Button,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { Plus as PlusIcon } from "tabler-icons-react";

// Components
import { Results } from "./Results";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

// Lazy Imports
const CreatePriceList = React.lazy(() =>
  import("../../../components/PriceList/CreatePriceList").then((module) => ({
    default: module.CreatePriceList,
  }))
);

export const ListPriceListsView = () => {
  const { classes } = useStyles();

  const openCreatePriceList = () => {
    openModal({
      key: "createPriceList",
      title: "Fiyat Listesi Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreatePriceList />
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
        <Anchor component={Link} to="/dashboard/price-lists">
          Fiyat Listeleri
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title className={classes.rootTitle}>Fiyat Listeleri</Title>
        <Button leftIcon={<PlusIcon />} onClick={openCreatePriceList}>
          Yeni Fiyat Listesi
        </Button>
      </Group>
      <Results />
    </div>
  );
};
