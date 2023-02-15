import { emptyApi } from "./emptyApi";

// Interfaces
import { ShopifyProduct } from "@interfaces/shopifyProduct";

export const shopifyProductApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getShopifyProductsWithIngredients: build.query<GetShopifyProductsWithIngredientsResponse, void>(
      {
        query: () => "/shopify_products/ingredients",
        providesTags: ["ShopifyProductIngredient"],
      }
    ),
    getShopifyProductWithIngredients: build.query<GetShopifyProductWithIngredientsResponse, number>(
      {
        query: (variantId) => `/shopify_products/${variantId}/ingredients`,
        providesTags: (result, _error, id) =>
          result ? [{ type: "ShopifyProductIngredient" as const, id }] : [],
      }
    ),
    createShopifyProductIngredient: build.mutation<any, CreateShopifyProductIngredientRequest>({
      query: (body) => ({
        url: "/shopify_products/ingredient",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, _error, params) =>
        result
          ? [
              { type: "ShopifyProductIngredient" as const, id: params.shopifyVariantId },
              "ShopifyProductIngredient",
            ]
          : [],
    }),
    deleteShopifyProductIngredient: build.mutation<any, DeleteShopifyIngredientProductRequest>({
      query: (params) => ({
        url: `/shopify_products/ingredient/${params.shopifyProductToProductId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _error, params) =>
        result ? [{ type: "ShopifyProductIngredient" as const, id: params.shopifyVariantId }] : [],
    }),
  }),
});

export const {
  useGetShopifyProductsWithIngredientsQuery,
  useGetShopifyProductWithIngredientsQuery,
  useCreateShopifyProductIngredientMutation,
  useDeleteShopifyProductIngredientMutation,
} = shopifyProductApi;

interface GetShopifyProductsWithIngredientsResponse {
  shopifyProducts: ShopifyProduct[];
}

interface GetShopifyProductWithIngredientsResponse {
  shopifyProduct: ShopifyProduct;
}

interface CreateShopifyProductIngredientRequest {
  shopifyProductId: number;
  shopifyVariantId: number;
  ingredients: {
    productId: number;
    quantity: number;
  }[];
}

interface DeleteShopifyIngredientProductRequest {
  shopifyProductToProductId: number;
  shopifyVariantId: number;
}
