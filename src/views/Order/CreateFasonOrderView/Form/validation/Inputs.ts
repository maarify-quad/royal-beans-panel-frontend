import { Product } from "@interfaces/product";
import { Customer } from "@interfaces/customer";

export type Inputs = {
  customerId: string;
  productId: string;
  product: Product | null;
  grindType: string;
  weight: string;
  quantity: number;
  specialNote: string | null;
  orderProducts: {
    productId: number;
    product: Product;
    grindType: string;
    weight: string;
    quantity: number;
  }[];
};

export const initialValues: Inputs = {
  customerId: "",
  productId: "0",
  product: null,
  grindType: "Çekirdek",
  weight: "250gr",
  quantity: 1,
  specialNote: "",
  orderProducts: [],
};
