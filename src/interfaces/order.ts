import { User } from "./auth";
import { Customer } from "./customer";
import { ManualOrderProduct, OrderProduct } from "./orderProduct";

export type OrderType = "BULK" | "MANUAL" | "FASON";
export type OrderSource = "dashboard" | "shopify" | "trendyol" | "hepsiburada";

export type CommonOrder = {
  id: number;
  orderNumber: number;
  userId: number | null;
  orderId: string;
  deliveryDate: string;
  customerBalanceAfterOrder: number;
  subTotal: number;
  taxTotal: number;
  total: number;
  deliveryType: string;
  specialNote: string | null;
  cargoTrackNo: string | null;
  status: string;
  type: OrderType;
  isParasutVerified: boolean;
  isCancelled: boolean;
  createdAt: string;
  updatedAt: string;
  user: User | null;
};

export type BulkOrder = CommonOrder & {
  customerId: string;
  receiver: null;
  customer: Customer;
  manualInvoiceStatus: null;
  receiverNeighborhood: null;
  receiverAddress: null;
  receiverCity: null;
  receiverProvince: null;
  type: "BULK";
  orderProducts: OrderProduct[];
  source: "dashboard";
};

export type ManualOrder = CommonOrder & {
  customerId: null;
  receiver: string;
  customer: null;
  manualInvoiceStatus: string;
  receiverNeighborhood: string | null;
  receiverAddress: string | null;
  receiverCity: string | null;
  receiverProvince: string | null;
  receiverPhone: string | null;
  type: "MANUAL";
  orderProducts: ManualOrderProduct[];
  source: Omit<OrderSource, "dashboard">;
};

export type FasonOrder = CommonOrder & {
  customerId: string;
  receiver: null;
  customer: Customer;
  manualInvoiceStatus: null;
  receiverNeighborhood: null;
  receiverAddress: null;
  receiverCity: null;
  receiverProvince: null;
  type: "FASON";
  orderProducts: {
    id: number;
    productId: number;
    grindType: string;
    weight: string;
    quantity: number;
    product: {
      id: number;
      name: string;
      stockCode: string;
      deletedAt?: string | null;
    };
  }[];
  source: "dashboard";
};

export type Order = BulkOrder | ManualOrder | FasonOrder;
