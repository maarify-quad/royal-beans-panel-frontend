import { Delivery } from "./delivery";

export interface Supplier {
  id: string;
  name: string;
  address: string | null;
  taxNo: string | null;
  taxOffice: string | null;
  contactName: string | null;
  contactPosition: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  totalVolume: number;
  deliveries: Delivery[];
  deliveryAddresses: { id: number; name: string; address: string }[];
  createdAt: string;
  updatedAt: string;
}
