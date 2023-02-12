import { Product } from "@interfaces/product";

export type Inputs = {
  productId: string;
  ingredientId: string;
  rate: number;
  product: Product | null;
  ingredient: Product | null;
  roastIngredients: {
    productId: string;
    ingredientId: string;
    rate: number;
    product: Product;
    ingredient: Product;
  }[];
};

export const initialValues: Inputs = {
  productId: "0",
  ingredientId: "0",
  rate: 1,
  product: null,
  ingredient: null,
  roastIngredients: [],
};
