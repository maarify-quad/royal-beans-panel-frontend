import { Product } from "./product";

export interface ShopifyProduct {
  id: number;
  productId: number;
  productTitle: string;
  variantId: number;
  variantTitle: string;
  ingredients: ShopifyProductToProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyProductToProduct {
  shopifyProductToProductId: number;
  shopifyProductId: number;
  productId: number;
  quantity: number;
  product: Product;
}
