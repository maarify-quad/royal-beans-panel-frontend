// Routing
import { useParams } from "react-router-dom";

// Services
import { useGetShopifyProductWithIngredientsQuery } from "@services/shopifyProductApi";

// UI Components
import { Loader, LoadingOverlay } from "@mantine/core";

// Components
import IngredientDetails from "./IngredientDetails";
import Form from "./Form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ShopifyUpdateView = () => {
  const { shopifyVariantId } = useParams();

  // Queries
  const { shopifyProduct, ingredientTitle, isLoading, isFetching } =
    useGetShopifyProductWithIngredientsQuery(shopifyVariantId ? +shopifyVariantId : 0, {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        shopifyProduct: data?.shopifyProduct,
        ingredientTitle: `${data?.shopifyProduct.productTitle} / ${data?.shopifyProduct.variantTitle}`,
      }),
      skip: !shopifyVariantId,
    });

  return (
    <PageLayout
      title={`Shopify İçerik Güncelle - ${ingredientTitle}`}
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
          label: `Shopify İçerik Güncelle`,
          href: `/dashboard/stock-admin?tab=shopify-update`,
        },
        {
          label: ingredientTitle,
          href: `/dashboard/stock-admin/shopify-update/${shopifyVariantId}`,
        },
      ]}
      isLoading={isLoading}
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={isFetching} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {shopifyProduct && <IngredientDetails shopifyProduct={shopifyProduct} />}
            {shopifyProduct && (
              <Form
                shopifyProductId={shopifyProduct.id}
                shopifyVariantId={shopifyProduct.variantId}
              />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};
