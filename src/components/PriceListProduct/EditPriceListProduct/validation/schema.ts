import { z } from "zod";

export const schema = z.object({
  name: z
    .string({
      required_error: "Ürün adı gereklidir",
      invalid_type_error: "Geçersiz ürün adı değeri",
    })
    .min(1, "Ürün adı gereklidir"),
  unitPrice: z
    .number({
      required_error: "Birim fiyat gereklidir",
      invalid_type_error: "Geçersiz birim fiyat değeri",
    })
    .min(0, "Birim fiyat 0'dan küçük olamaz"),
  taxRate: z
    .number({
      required_error: "KDV oranı gereklidir",
      invalid_type_error: "Geçersiz KDV oranı değeri",
    })
    .min(0, "KDV oranı 0'dan küçük olamaz")
    .or(z.union([z.literal("0"), z.literal("1"), z.literal("8"), z.literal("18")])),
});
