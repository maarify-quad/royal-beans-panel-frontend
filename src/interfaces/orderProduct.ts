import { PriceListProduct } from "./priceListProduct";
import { Product } from "./product";
import { ShopifyProduct } from "./shopifyProduct";

export interface OrderProduct {
  id: number;
  orderId: number;
  priceListProductId: number;
  productId: number;
  priceListProduct: PriceListProduct;
  product: Product;
  grindType: string;
  unitPrice: number;
  quantity: number;
  taxRate: number;
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface ManualOrderProduct {
  id: number;
  orderId: number;
  productId: number;
  priceListProductId: null;
  shopifyProductId: number | null;
  product: Product;
  priceListProduct: null;
  shopifyProduct: ShopifyProduct | null;
  grindType: string;
  unitPrice: number;
  quantity: number;
  taxRate: number;
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderProductParams {
  priceListProduct: PriceListProduct;
  priceListProductId: number;
  grindType: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subTotal: number;
  total: number;
}

export interface CreateManualOrderProductParams {
  product: Product;
  productId: number;
  grindType: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subTotal: number;
  total: number;
}

export interface CreateFasonOrderProductParams {
  product: Product;
  productId: number;
  grindType: string;
  weight: string;
  quantity: number;
}