import { DeliveryDetail } from "./delivery";
import { RoastIngredient } from "./roast";

export interface Product {
  id: number;
  name: string;
  stockCode: string;
  storageType: string;
  amount: number;
  amountUnit: string;
  reservedAmount: number;
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
