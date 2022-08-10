import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Tabs,
  Anchor,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { Plus as PlusIcon } from "tabler-icons-react";

// Components
import { StorageProducts } from "./StorageProducts";

// Lazy Components
const CreateProductForm = React.lazy(() =>
  import("../../../components/Product/CreateProductForm").then((module) => ({
    default: module.CreateProductForm,
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

export const ListStorageView = () => {
  const { classes } = useStyles();

  const onCreateProductClick = () => {
    openModal({
      title: "Ürün Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateProductForm />
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
        <Anchor component={Link} to="/dashboard/storage">
          Depo
        </Anchor>
      </Breadcrumbs>
      <Group position="apart">
        <Title className={classes.rootTitle}>Depo</Title>
        <Button leftIcon={<PlusIcon />} onClick={onCreateProductClick}>
          Yeni Ürün
        </Button>
      </Group>
      <Tabs defaultValue="HM" mt="md">
        <Tabs.List>
          <Tabs.Tab value="HM">Hammadde</Tabs.Tab>
          <Tabs.Tab value="YM">Yarı Mamül</Tabs.Tab>
          <Tabs.Tab value="FN">Bitmiş Ürün</Tabs.Tab>
          <Tabs.Tab value="Other">Diğer</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="HM" mt="md">
          <StorageProducts storageType="HM" />
        </Tabs.Panel>
        <Tabs.Panel value="YM" mt="md">
          <StorageProducts storageType="YM" />
        </Tabs.Panel>
        <Tabs.Panel value="FN" mt="md">
          <StorageProducts storageType="FN" />
        </Tabs.Panel>
        <Tabs.Panel value="Other" mt="md">
          <StorageProducts storageType="Other" />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
