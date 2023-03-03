import { RoastIngredient } from "./roast";

export interface Product {
  id: number;
  name: string;
  stockCode: string;
  storageType: ProductStorageType;
  amount: number;
  amountUnit: string;
  reservedAmount: number;
  tag: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductWithIngredients extends Product {
  ingredients: Ingredient[];
}

export interface ProductWithRoastIngredients extends Product {
  roastIngredients: RoastIngredient[];
}

export interface Ingredient {
  id: number;
  productId: number;
  ingredientProductId: number;
  ratio: number;
  product: Product;
  ingredientProduct: Product;
}

export type ProductRelation = "ingredients" | "roastIngredients";
export type ProductStorageType = "HM" | "YM" | "FN" | "Other";
