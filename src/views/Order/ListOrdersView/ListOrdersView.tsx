import React from "react";

// Routing
import { Link, useSearchParams } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Button, Breadcrumbs, Anchor, Tabs } from "@mantine/core";

// Icons
import { IconPaperBag, IconShoppingCartPlus } from "@tabler/icons";

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

export const ListOrdersView = () => {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/orders">
          Siparişler
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title order={2} className={classes.rootTitle}>
          Siparişler
        </Title>
        <Group>
          <Button
            leftIcon={<IconShoppingCartPlus />}
            component={Link}
            to="/dashboard/orders/create"
          >
            Yeni Sipariş
          </Button>
          <Button leftIcon={<IconPaperBag />} component={Link} to="/dashboard/orders/manual/create">
            Yeni Gönderi
          </Button>
        </Group>
      </Group>
      <Tabs
        mt="md"
        keepMounted={false}
        value={searchParams.get("tab") || "all"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
      >
        <Tabs.List>
          <Tabs.Tab value="all">Tüm Siparişler</Tabs.Tab>
          <Tabs.Tab value="bulk">Toplu Siparişler</Tabs.Tab>
          <Tabs.Tab value="manual">Manuel Gönderiler</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel mt="md" value="all">
          <Results />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="bulk">
          <Results type="BULK" />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="manual">
          <Results type="MANUAL" />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
