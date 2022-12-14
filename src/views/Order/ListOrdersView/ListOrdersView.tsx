import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Button, Breadcrumbs, Anchor } from "@mantine/core";

// Icons
import { IconShoppingCartPlus } from "@tabler/icons";

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
        <Button leftIcon={<IconShoppingCartPlus />} component={Link} to="/dashboard/orders/create">
          Yeni Sipariş
        </Button>
      </Group>
      <Results />
    </div>
  );
};
