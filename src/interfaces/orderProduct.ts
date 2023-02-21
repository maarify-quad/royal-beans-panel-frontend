import { PriceListProduct } from "./priceListProduct";
import { Product } from "./product";
import { ShopifyProduct } from "./shopifyProduct";

export interface OrderProduct {
  id: number;
  orderId: number;
  priceListProductId: number;
  priceListProduct: PriceListProduct;
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

export interface ManualShopifyOrderProduct {
  id: number;
  orderId: number;
  shopifyProductId: number;
  shopifyProduct: ShopifyProduct;
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
