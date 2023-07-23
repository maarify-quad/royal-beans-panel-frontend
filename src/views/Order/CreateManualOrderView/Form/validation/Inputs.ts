import { Product } from "@interfaces/product";

export type Inputs = {
  productId: string;
  product: Product | null;
  receiverId: string;
  receiver: string;
  receiverNeighborhood: string | null;
  receiverAddress: string | null;
  receiverCity: string | null;
  receiverProvince: string | null;
  receiverPhone: string | null;
  isSaveReceiverChecked: boolean;
  manualInvoiceStatus: string;
  specialNote: string | null;
  grindType: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subTotal: number;
  total: number;
  orderProducts: {
    productId: number;
    product: Product;
    grindType: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    subTotal: number;
    total: number;
  }[];
};

export const initialValues: Inputs = {
  productId: "0",
  receiverId: "",
  product: null,
  receiver: "",
  receiverNeighborhood: "",
  receiverAddress: "",
  receiverCity: "",
  receiverProvince: "",
  receiverPhone: "",
  isSaveReceiverChecked: false,
  manualInvoiceStatus: "Faturalı",
  specialNote: "",
  grindType: "Çekirdek",
  quantity: 1,
  unitPrice: 0,
  taxRate: 0,
  subTotal: 0,
  total: 0,
  orderProducts: [],
};
