import { Customer } from "./customer";
import { ManualOrderProduct, OrderProduct } from "./orderProduct";

export type BulkOrder = {
  id: number;
  customerId: string;
  receiver: null;
  customer: Customer;
  orderNumber: number;
  orderId: string;
  deliveryDate: string;
  customerBalanceAfterOrder: number;
  subTotal: number;
  taxTotal: number;
  total: number;
  manualInvoiceStatus: null;
  specialNote: string | null;
  deliveryType: string;
  receiverNeighborhood: null;
  receiverAddress: null;
  receiverCity: null;
  receiverProvince: null;
  cargoTrackNo: string | null;
  status: string;
  type: "BULK";
  isParasutVerified: boolean;
  isCancelled: boolean;
  orderProducts: OrderProduct[];
  createdAt: string;
  updatedAt: string;
};

export type ManualOrder = {
  id: number;
  customerId: null;
  receiver: string;
  customer: null;
  orderNumber: number;
  orderId: string;
  deliveryDate: string;
  customerBalanceAfterOrder: number;
  subTotal: number;
  taxTotal: number;
  total: number;
  specialNote: string | null;
  manualInvoiceStatus: string;
  deliveryType: string;
  receiverNeighborhood: string;
  receiverAddress: string;
  receiverCity: string;
  receiverProvince: string;
  cargoTrackNo: string | null;
  status: string;
  type: "MANUAL";
  isParasutVerified: boolean;
  isCancelled: boolean;
  orderProducts: ManualOrderProduct[];
  createdAt: string;
  updatedAt: string;
};

export type Order = BulkOrder | ManualOrder;

export type OrderType = "BULK" | "MANUAL";
