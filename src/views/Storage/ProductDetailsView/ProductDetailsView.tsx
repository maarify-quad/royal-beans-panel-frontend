// Routing
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

// Services
import { useGetProductByStockCodeQuery } from "@services/productApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Tabs,
  Anchor,
  Group,
  Loader,
  Alert,
} from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { SummaryTab } from "./SummaryTab";
import { DeliveriesTab } from "./DeliveriesTab";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const ProductDetailsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { stockCode } = useParams();
  const { classes } = useStyles();

  // Queries
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByStockCodeQuery(stockCode || "", {
    skip: !stockCode,
  });

  if (!stockCode) {
    return <Navigate to="/dashboard/storage" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb="md">
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/storage">
          Depo
        </Anchor>
        <Anchor component={Link} to={`/dashboard/storage/${stockCode}`}>
          {product?.name}
        </Anchor>
      </Breadcrumbs>
      <Group position="apart">
        <Title order={2} className={classes.rootTitle}>
          {product?.name}
        </Title>
      </Group>
      {error && (
        <Alert
          icon={<IconInfoCircle />}
          color="red"
          title="Ürüne ulaşılamadı"
          variant="filled"
          mt="md"
        >
          {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
        </Alert>
      )}
      {product && (
        <Tabs
          keepMounted={false}
          defaultValue={searchParams.get("tab") || "summary"}
          onTabChange={(value) => setSearchParams({ tab: value as string })}
          mt="md"
        >
          <Tabs.List>
            <Tabs.Tab value="summary">Özet</Tabs.Tab>
            <Tabs.Tab value="delivery">Sevkiyat</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="summary" mt="md">
            <SummaryTab product={product} />
          </Tabs.Panel>
          <Tabs.Panel value="delivery" mt="md">
            <DeliveriesTab stockCode={stockCode} />
          </Tabs.Panel>
        </Tabs>
      )}
    </div>
  );
};
