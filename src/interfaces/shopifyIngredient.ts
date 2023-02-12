import { Product } from "./product";

export interface ShopifyIngredient {
  id: number;
  productId: number;
  shopifyProductId: number;
  shopifyVariantId: number | null;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
