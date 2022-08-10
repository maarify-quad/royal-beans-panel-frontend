export interface Product {
  id: number;
  name: string;
  stockCode: string | null;
  storageType: string;
  amount: number;
  amountUnit: string;
  reservedAmount: number;
  createdAt: string;
  updatedAt: string;
}
