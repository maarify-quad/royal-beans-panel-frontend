import { Supplier } from "./supplier";
import { Product } from "./product";

export interface DeliveryState {
  deliveryDetails: DeliveryDetail[];
}

export interface Delivery {
  id: string;
  supplierId: string;
  deliveryDate: string;
  invoiceDate: string;
  subTotal: number;
  taxTotal: number;
  total: number;
  supplier: Supplier;
  deliveryDetails: DeliveryDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryDetail {
  id: number;
  productId: number;
  deliveryId: string;
  quantity: number;
  unit: string;
  unitPriceUSD: number;
  unitPriceTRY: number;
  taxRate: number;
  subTotal: number;
  taxTotal: number;
  total: number;
  product: Product;
  delivery: Delivery;
}

export interface CreateDeliveryDetail {
  product: Product;
  productId: number;
  quantity: number;
  unit: string;
  unitPriceUSD: number;
  unitPriceTRY: number;
  taxRate: number;
  subTotal: number;
  total: number;
}
