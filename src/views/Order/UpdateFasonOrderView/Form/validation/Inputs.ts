import { Product } from "@interfaces/product";

export type Inputs = {
  productId: string;
  product: Product | null;
  grindType: string;
  weight: string;
  quantity: number;
  orderProducts: {
    productId: number;
    product: Product;
    grindType: string;
    weight: string;
    quantity: number;
  }[];
};

export const initialValues: Inputs = {
  productId: "0",
  product: null,
  grindType: "Çekirdek",
  weight: "250gr",
  quantity: 1,
  orderProducts: [],
};
