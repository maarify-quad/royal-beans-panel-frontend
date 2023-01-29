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
  }),
});

export const { useCreateIngredientMutation } = ingredientApi;

export interface CreateIngredientRequest {
  ingredients: Pick<Ingredient, "ingredientProductId" | "productId" | "ratio">[];
  stockCode: string;
}
