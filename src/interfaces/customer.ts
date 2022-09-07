import { PriceList } from "./priceList";
import { DeliveryAddress } from "./deliveryAddress";

export interface Customer {
  id: string;
  priceListId?: number;
  priceList?: PriceList;
  deliveryAddresses: DeliveryAddress[];
  name: string;
  companyTitle?: string;
  contactName?: string;
  contactTitle?: string;
  secondContactName?: string;
  secondContactTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  city?: string;
  cargoAddress?: string;
  cargoProvince?: string;
  cargoCity?: string;
  taxOffice?: string;
  taxNo?: string;
  startBalance: number;
  currentBalance: number;
  commercialPrinciple?: string;
  comment?: string;
  specialNote?: string;
  createdAt: string;
  updatedAt: string;
}
