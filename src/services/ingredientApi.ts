import { emptyApi } from "./emptyApi";

// Interfaces
import { Ingredient } from "@interfaces/product";

export const ingredientApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createIngredient: build.mutation<any, CreateIngredientRequest>({
      query: (body) => ({
        url: "/ingredients",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Ingredient" as const, id: arg.stockCode },
      ],
    }),
    deleteById: build.mutation<any, DeleteIngredientRequest>({
      query: (params) => ({
        url: `/ingredients/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, params) =>
        params.stockCode ? [{ type: "Ingredient" as const, id: params.stockCode }] : [],
    }),
  }),
});

export const { useCreateIngredientMutation, useDeleteByIdMutation } = ingredientApi;

interface CreateIngredientRequest {
  ingredients: Pick<Ingredient, "ingredientProductId" | "productId" | "ratio">[];
  stockCode: string;
}

interface DeleteIngredientRequest {
  id: number;
  stockCode?: string;
}
