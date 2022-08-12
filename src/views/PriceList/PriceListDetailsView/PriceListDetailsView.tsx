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
} from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Components
import { ProductsResult } from "./ProductsResult";
import { CustomersResult } from "./CustomersResult";

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
      <Title className={classes.rootTitle}>{data?.name}</Title>
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
