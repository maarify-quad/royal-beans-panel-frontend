import { emptyApi } from "./emptyApi";

// Interfaces
import { RoastIngredient } from "@interfaces/roast";

export const roastIngredientApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createRoastIngredient: build.mutation<any, CreateRoastIngredientRequest>({
      query: (body) => ({
        url: "/roast_ingredients",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product" as const, id: "roast_ingredients" }],
    }),
    deleteRoastIngredient: build.mutation<any, { id: number }>({
      query: (body) => ({
        url: `/roast_ingredients/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" as const, id: "roast_ingredients" }],
    }),
  }),
});

export const { useCreateRoastIngredientMutation, useDeleteRoastIngredientMutation } =
  roastIngredientApi;

interface CreateRoastIngredientRequest {
  roastIngredients: Pick<RoastIngredient, "productId" | "ingredientId" | "rate">[];
}
