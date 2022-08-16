import { PriceListProduct } from "./priceListProduct";

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
