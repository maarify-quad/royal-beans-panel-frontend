import { emptyApi } from "./emptyApi";

export const shopifyIngredientApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createShopifyIngredient: build.mutation<any, CreateShopifyIngredientRequest>({
      query: (body) => ({
        url: "/shopify_ingredients",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product" as const, id: "shopify_ingredients" }],
    }),
    deleteShopifyIngredient: build.mutation<any, number>({
      query: (id) => ({
        url: `/shopify_ingredients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" as const, id: "shopify_ingredients" }],
    }),
  }),
});

export const { useCreateShopifyIngredientMutation, useDeleteShopifyIngredientMutation } =
  shopifyIngredientApi;

export interface CreateShopifyIngredientRequest {
  productId: number;
  shopifyProductId: number;
  shopifyVariantId: number | null;
}
