// Routing
import { Link, useSearchParams } from "react-router-dom";

// UI Components
import { createStyles, Title, Breadcrumbs, Anchor, Tabs } from "@mantine/core";

// Components
import BulkUpdateStock from "./BulkUpdateStock";

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
  const [searchParams, setSearchParams] = useSearchParams();

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
      <Title order={2} className={classes.rootTitle}>
        Stok Admin
      </Title>
      <Tabs
        mt="md"
        keepMounted={false}
        value={searchParams.get("tab") || "bulk-update"}
        onTabChange={(tab: string) => setSearchParams({ tab })}
      >
        <Tabs.List>
          <Tabs.Tab value="bulk-update">Toplu Stok Güncelle</Tabs.Tab>
          <Tabs.Tab value="fn-update">FN İçerik Güncelle</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel mt="md" value="bulk-update">
          <BulkUpdateStock />
        </Tabs.Panel>
        <Tabs.Panel mt="md" value="fn-update">
          FN İçerik Güncelle
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
