import React from "react";

// Routing
import { Link, useParams } from "react-router-dom";

// Services
import { useGetProductWithIngredientsQuery } from "@services/productApi";

// UI Components
import { createStyles, Title, Breadcrumbs, Anchor, Loader, LoadingOverlay } from "@mantine/core";

// Components
import { ProductDetails } from "./ProductDetails";
import { Form } from "./Form";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const FnUpdateView = () => {
  const { classes } = useStyles();

  // Routing
  const { stockCode } = useParams();

  // Queries
  const {
    data: product,
    isLoading,
    isFetching,
  } = useGetProductWithIngredientsQuery(stockCode || "", {
    skip: !stockCode,
  });

  if (!stockCode) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/stock-admin">
          Stok Admin
        </Anchor>
        <Anchor component={Link} to={`/dashboard/stock-admin/fn-update/${stockCode}`}>
          FN İçerik Güncelle / {product?.name}
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        Stok Admin
      </Title>
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={isFetching} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {product && <ProductDetails product={product} />}
            {product && <Form productId={product.id} stockCode={stockCode} />}
          </>
        )}
      </div>
    </div>
  );
};
