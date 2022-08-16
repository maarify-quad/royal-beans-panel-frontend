import { PriceList } from "./priceList";
import { Product } from "./product";

export interface PriceListProduct {
  id: number;
  productId: number;
  priceListId: number;
  unitPrice: number;
  taxRate: number;
  product: Product;
  priceList: PriceList;
  createdAt: string;
  updatedAt: string;
}
