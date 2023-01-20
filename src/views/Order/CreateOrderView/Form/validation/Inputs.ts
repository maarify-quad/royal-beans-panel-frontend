import { PriceListProduct } from "@interfaces/priceListProduct";

export type Inputs = {
  customerId: string;
  priceListProductId: string;
  deliveryDate: Date;
  specialNote: string;
  deliveryAddressId: number;
  deliveryType: string;
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
  customerId: "",
  priceListProductId: "0",
  deliveryDate: new Date(),
  specialNote: "",
  deliveryAddressId: 0,
  deliveryType: "Kargo",
  grindType: "Çekirdek",
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
  subTotal: 0,
  total: 0,
  orderProducts: [],
};
