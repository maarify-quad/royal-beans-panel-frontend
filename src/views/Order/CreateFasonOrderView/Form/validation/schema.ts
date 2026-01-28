import { z } from "zod";

export const schema = z.object({
  customerId: z
    .string({
      required_error: "Müşteri seçimi zorunludur",
      invalid_type_error: "Geçersiz müşteri değeri",
    })
    .min(1, "Müşteri seçimi zorunludur"),
  specialNote: z.string({}).nullable(),
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
      weight: z.string({
        required_error: "Gramaj gereklidir",
        invalid_type_error: "Geçersiz gramaj değeri",
      }),
      quantity: z.number({
        required_error: "Miktar gereklidir",
        invalid_type_error: "Geçersiz miktar değeri",
      }),
    })
    .array()
    .min(1, "En az bir ürün eklemelisiniz"),
});
