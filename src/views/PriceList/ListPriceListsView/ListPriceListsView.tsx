import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Breadcrumbs, Anchor } from "@mantine/core";

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

export const ListPriceListsView = () => {
  const { classes } = useStyles();

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
      </Group>
      <Results />
    </div>
  );
};
