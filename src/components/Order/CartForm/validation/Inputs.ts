import { PriceListProduct } from "@interfaces/priceListProduct";

export type Inputs = {
  priceListProductId: string;
  grindType: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subTotal: number;
  total: number;
  orderProducts: {
    priceListProduct: PriceListProduct;
    priceListProductId: number;
    grindType: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    subTotal: number;
    total: number;
  }[];
};

export const initialValues: Inputs = {
  priceListProductId: "0",
  grindType: "Çekirdek",
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
  subTotal: 0,
  total: 0,
  orderProducts: [],
};
