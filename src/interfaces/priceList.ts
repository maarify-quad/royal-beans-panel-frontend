import { Customer } from "./customer";
import { PriceListProduct } from "./priceListProduct";

export interface PriceList {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  customers?: Customer[];
  priceListProducts?: PriceListProduct[];
}
