import { Product } from "@interfaces/product";

export type Inputs = {
  roundId: number;
  productId: string;
  inputAmount: number;
  outputAmount: number;
  roastDetails: {
    product: Product;
    productId: number;
    inputAmount: number;
    outputAmount: number;
  }[];
};
