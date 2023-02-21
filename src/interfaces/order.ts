import { Customer } from "./customer";
import { ManualOrderProduct, OrderProduct, ManualShopifyOrderProduct } from "./orderProduct";

export type OrderType = "BULK" | "MANUAL";
export type OrderSource = "dashboard" | "shopify";

export type CommonOrder = {
  id: number;
  orderNumber: number;
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
  source: OrderSource;
  isParasutVerified: boolean;
  isCancelled: boolean;
  createdAt: string;
  updatedAt: string;
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
  receiverNeighborhood: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
  type: "MANUAL";
  orderProducts: ManualOrderProduct[];
  source: "dashboard";
};

export type ManualShopifyOrder = CommonOrder & {
  customerId: null;
  receiver: string;
  customer: null;
  manualInvoiceStatus: string;
  receiverNeighborhood: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
  type: "MANUAL";
  orderProducts: ManualShopifyOrderProduct[];
  source: "shopify";
};

export type Order = BulkOrder | ManualOrder | ManualShopifyOrder;
