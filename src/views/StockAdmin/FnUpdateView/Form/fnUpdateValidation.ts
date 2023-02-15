import { z } from "zod";
import { Product } from "@interfaces/product";

export type FnUpdateValues = {
  ingredientProductId: string;
  ingredientProduct: Product | null;
  ratio: number;
  ingredients: {
    productId: number;
    ingredientProductId: string;
    ratio: number;
    ingredientProduct: Product;
  }[];
};

export const fnUpdateSchema = z.object({
  ingredientProductId: z.string().or(z.number()),
  ingredientProduct: z.any(),
  ratio: z.number().min(0),
});

export const fnUpdateInitialValues: FnUpdateValues = {
  ingredientProductId: "0",
  ingredientProduct: null,
  ratio: 1,
  ingredients: [],
};
