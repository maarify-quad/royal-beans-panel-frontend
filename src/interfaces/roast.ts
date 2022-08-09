import { Product } from "./product";

export interface Roast {
  id: string;
  date: string;
  totalInputAmount: number;
  totalOutpıtAmount: number;
  totalDifferenceAmount: number;
  roastDetails: RoastDetail[];
}

export interface RoastDetail {
  roastId: string;
  roundId: string;
  productId: number;
  product: Product;
  inputAmount: number;
  outputAmount: number;
  differenceAmount: number;
  createdAt: string;
  updatedAt: string;
}
