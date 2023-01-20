// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Breadcrumbs, Anchor } from "@mantine/core";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const StockAdminView = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/stock-admin">
          Stok Admin
        </Anchor>
      </Breadcrumbs>
      <Group align="center" position="apart">
        <Title order={2} className={classes.rootTitle}>
          Stok Admin
        </Title>
      </Group>
    </div>
  );
};
