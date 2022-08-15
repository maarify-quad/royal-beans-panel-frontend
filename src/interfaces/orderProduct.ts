import { PriceListProduct } from "./priceListProduct";

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
