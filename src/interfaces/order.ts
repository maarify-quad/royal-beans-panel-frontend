import { Customer } from "./customer";
import { OrderProduct } from "./orderProduct";

export interface Order {
  id: number;
  customerId: string;
  customer: Customer;
  orderNumber: number;
  deliveryDate: string;
  customerBalanceAfterOrder: number;
  subTotal: number;
  taxTotal: number;
  total: number;
  specialNote: string | null;
  deliveryType: string;
  cargoTrackNo: string | null;
  status: string;
  isParasutVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithCustomer extends Order {
  customer: Customer;
}

export interface OrderWithAll extends Order {
  customer: Customer;
  orderProducts: OrderProduct[];
}
