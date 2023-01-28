export interface Product {
  id: number;
  name: string;
  stockCode: string | null;
  storageType: string;
  amount: number;
  amountUnit: string;
  reservedAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithIngredients extends Product {
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  productId: number;
  ingredientProductId: number;
  ratio: number;
  product: Product;
  ingredientProduct: Product;
}
