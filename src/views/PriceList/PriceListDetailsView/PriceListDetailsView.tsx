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
import {
  AlertCircle as AlertCircleIcon,
  Plus as PlusIcon,
  UserPlus as UserPlusIcon,
} from "tabler-icons-react";

// Components
import { ProductsResult } from "./ProductsResult";
import { CustomersResult } from "./CustomersResult";

// Lazy Components
const CreatePriceListProduct = React.lazy(() =>
  import("../../../components/PriceListProduct/CreatePriceListProduct").then(
    ({ CreatePriceListProduct }) => ({
      default: CreatePriceListProduct,
    })
  )
);
const AssignPriceList = React.lazy(() =>
  import("../../../components/PriceList/AssignPriceList").then(({ AssignPriceList }) => ({
    default: AssignPriceList,
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
      key: "createPriceListProduct",
      title: "Ürün Ekle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreatePriceListProduct
            priceListId={parseInt(id)}
            priceListProducts={data?.priceListProducts}
          />
        </React.Suspense>
      ),
    });
  };

  const onAssignPriceListClick = () => {
    openModal({
      key: "assignPriceList",
      title: "Müşteri Ekle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <AssignPriceList priceListId={parseInt(id)} />
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
        <Group>
          <Button leftIcon={<PlusIcon />} onClick={onAddProductClick}>
            Ürün Ekle
          </Button>
          <Button variant="default" leftIcon={<UserPlusIcon />} onClick={onAssignPriceListClick}>
            Müşteri Ekle
          </Button>
        </Group>
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
