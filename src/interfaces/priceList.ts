import { Customer } from "./customer";
import { Product } from "./product";

export interface PriceList {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  customers?: Customer[];
  products?: Product[];
}
