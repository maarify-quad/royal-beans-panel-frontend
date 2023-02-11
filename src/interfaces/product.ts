import { DeliveryDetail } from "./delivery";

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

export interface ProductWithDeliveryDetails extends Product {
  deliveryDetails: DeliveryDetail[];
}

export interface Ingredient {
  id: number;
  productId: number;
  ingredientProductId: number;
  ratio: number;
  product: Product;
  ingredientProduct: Product;
}
