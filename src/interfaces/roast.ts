import { Product } from "./product";

export interface Roast {
  id: string;
  date: string;
  totalInputAmount: number;
  totalOutputAmount: number;
  totalDifferenceAmount: number;
  roastDetails: RoastDetail[];
}

export interface RoastDetail {
  roastId: string;
  roundId: string;
  productId: number;
  product: Product;
  inputAmount: number;
  outputAmount: number;
  differenceAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoastIngredient {
  id: number;
  productId: number;
  ingredientId: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  ingredient: Product;
}
