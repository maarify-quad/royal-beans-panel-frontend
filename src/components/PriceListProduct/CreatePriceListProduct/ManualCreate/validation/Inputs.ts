export type Inputs = {
  productId: number;
  newProductName: string;
  unitPrice: number;
  taxRate: string;
  unit: string;
};

export const initialValues: Inputs = {
  productId: 0,
  newProductName: "",
  unitPrice: 0,
  taxRate: "0",
  unit: "",
};
