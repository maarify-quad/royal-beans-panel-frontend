import { z } from "zod";

export type CreateProductValues = {
  name: string;
  storageType: string;
  amount: number;
  amountUnit: string;
};

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Ürün adı gereklidir",
      invalid_type_error: "Ürün adı geçersiz",
    })
    .min(1, "Ürün adı gereklidir"),
  storageType: z
    .string({
      required_error: "Depo tipi gereklidir",
      invalid_type_error: "Depo tipi geçersiz",
    })
    .min(1, "Depo tipi gereklidir"),
  amount: z
    .number({
      required_error: "Stok gereklidir",
      invalid_type_error: "Stok geçersiz",
    })
    .min(0, "Stok en az 0 olmalıdır"),
  amountUnit: z
    .string({
      required_error: "Stok birimi gereklidir",
      invalid_type_error: "Stok birimi geçersiz",
    })
    .min(1, "Stok birimi gereklidir"),
});

export const initialValues: CreateProductValues = {
  name: "",
  storageType: "HM",
  amount: 0,
  amountUnit: "kg",
};
