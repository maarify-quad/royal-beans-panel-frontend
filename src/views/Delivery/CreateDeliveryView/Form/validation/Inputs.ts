import { Product } from "@interfaces/product";

export type Inputs = {
  deliveryDate: Date;
  invoiceDate: Date;
  supplierId: string;
  productId: number;
  storageType: string;
  quantity: number;
  unit: string;
  unitPriceUSD: number;
  unitPriceTRY: number;
  taxRate: number;
  subTotal: number;
  total: number;
  deliveryDetails: {
    product: Product;
    productId: number;
    quantity: number;
    unit: string;
    unitPriceUSD: number;
    unitPriceTRY: number;
    taxRate: number;
    subTotal: number;
    total: number;
  }[];
};
