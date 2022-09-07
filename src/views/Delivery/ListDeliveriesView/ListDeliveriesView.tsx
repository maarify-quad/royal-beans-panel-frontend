import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Button, Breadcrumbs, Anchor } from "@mantine/core";

// Icons
import { IconTruckLoading } from "@tabler/icons";

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

export const ListDeliveriesView = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/deliveries">
          Sevkiyatlar
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title order={2} className={classes.rootTitle}>
          Sevkiyatlar
        </Title>
        <Button leftIcon={<IconTruckLoading />} component={Link} to="/dashboard/deliveries/create">
          Yeni Sevkiyat
        </Button>
      </Group>
      <Results />
    </div>
  );
};
