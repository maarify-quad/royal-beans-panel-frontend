// Routing
import { Navigate, useParams } from "react-router-dom";

// Services
import { useGetProductWithIngredientsQuery } from "@services/productApi";

// UI Components
import { Loader, LoadingOverlay } from "@mantine/core";

// Components
import { ProductDetails } from "./ProductDetails";
import { Form } from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const FnUpdateView = () => {
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
    return <Navigate to="/dashboard/stock-admin" replace />;
  }

  return (
    <PageLayout
      title="Stok Admin"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Stok Admin",
          href: "/dashboard/stock-admin",
        },
        {
          label: `FN İçerik Güncelle`,
          href: `/dashboard/stock-admin?tab=fn-update`,
        },
        {
          label: product?.name,
          href: `/dashboard/stock-admin/fn-update/${stockCode}`,
        },
      ]}
    >
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
    </PageLayout>
  );
};
