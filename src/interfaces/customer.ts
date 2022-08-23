import { PriceList } from "./priceList";

export interface Customer {
  id: string;
  priceListId?: number;
  priceList?: PriceList;
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
