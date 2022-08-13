import React from "react";

// Services
import { useGetPriceListByIdQuery } from "@services/priceListApi";

// Routing
import { Link, Navigate, useParams } from "react-router-dom";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Alert,
  Center,
  Loader,
  Grid,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { AlertCircle as AlertCircleIcon, Plus as PlusIcon } from "tabler-icons-react";

// Components
import { ProductsResult } from "./ProductsResult";
import { CustomersResult } from "./CustomersResult";

// Lazy Components
const AddProductForm = React.lazy(() =>
  import("../../../components/PriceList/AddProductForm").then(({ AddProductForm }) => ({
    default: AddProductForm,
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
  titleLink: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const PriceListDetailsView = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  const { data, isLoading, error } = useGetPriceListByIdQuery(id);

  const onAddProductClick = () => {
    openModal({
      key: "addPriceListProduct",
      title: "Ürün Ekle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <AddProductForm
            priceListId={parseInt(id)}
            priceListProducts={data?.priceListProducts}
          />
        </React.Suspense>
      ),
    });
  };

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Fiyat listesine ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (isLoading) {
    <Center style={{ height: "100%" }}>
      <Loader />
    </Center>;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/price-lists">
          Fiyat Listeleri
        </Anchor>
        <Anchor component={Link} to={`/dashboard/price-lists/${id}`}>
          {data?.name}
        </Anchor>
      </Breadcrumbs>
      <Group position="apart">
        <Title className={classes.rootTitle}>{data?.name}</Title>
        <Button leftIcon={<PlusIcon />} onClick={onAddProductClick}>
          Ürün Ekle
        </Button>
      </Group>
      <Grid mt="md">
        <Grid.Col lg={8}>
          <ProductsResult priceListProducts={data?.priceListProducts} />
        </Grid.Col>
        <Grid.Col lg={4}>
          <CustomersResult customers={data?.customers} />
        </Grid.Col>
      </Grid>
    </div>
  );
};
