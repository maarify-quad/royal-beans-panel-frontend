import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Button, Breadcrumbs, Anchor } from "@mantine/core";

// Icons
import { IconPlus } from "@tabler/icons";

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

export const ListRoastsView = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/roasts">
          Kavrumlar
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title order={2} className={classes.rootTitle}>
          Kavrumlar
        </Title>
        <Button leftIcon={<IconPlus />} component={Link} to="/dashboard/roasts/create">
          Yeni Kavrum
        </Button>
      </Group>
      <Results />
    </div>
  );
};
