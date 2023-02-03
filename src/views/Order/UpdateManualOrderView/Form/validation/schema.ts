import { z } from "zod";

export const schema = z.object({
  orderProducts: z
    .object({
      productId: z.number({
        required_error: "Ürün gereklidir",
        invalid_type_error: "Geçersiz ürün değeri",
      }),
      grindType: z.string({
        required_error: "Öğütüm metodu gereklidir",
        invalid_type_error: "Geçersiz öğütüm metodu türü değeri",
      }),
      quantity: z.number({
        required_error: "Miktar gereklidir",
        invalid_type_error: "Geçersiz miktar değeri",
      }),
      unitPrice: z.number({
        required_error: "Birim fiyat gereklidir",
        invalid_type_error: "Geçersiz birim fiyat değeri",
      }),
      taxRate: z.number({
        required_error: "KDV oranı gereklidir",
        invalid_type_error: "Geçersiz KDV oranı değeri",
      }),
      subTotal: z.number({
        required_error: "Ara toplam gereklidir",
        invalid_type_error: "Geçersiz ara toplam değeri",
      }),
      total: z.number({
        required_error: "Toplam gereklidir",
        invalid_type_error: "Geçersiz toplam değeri",
      }),
    })
    .array()
    .min(1, "En az bir ürün eklemelisiniz"),
});
