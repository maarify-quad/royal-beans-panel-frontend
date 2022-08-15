import { Customer } from "./customer";

export interface Order {
  id: number;
  customerId: number;
  customer: Customer;
  orderNumber: number;
  deliveryDate: string;
  customerBalanceAfterOrder: number;
  total: number;
  specialNote: string | null;
  cargoType: string;
  cargoTrackNo: string | null;
  status: string;
  isParasutVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
