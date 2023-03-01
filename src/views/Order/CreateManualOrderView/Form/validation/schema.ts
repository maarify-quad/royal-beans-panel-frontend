import { z } from "zod";

export const schema = z.object({
  receiver: z
    .string({
      required_error: "Alıcı gereklidir",
      invalid_type_error: "Geçersiz alıcı değeri",
    })
    .min(1, "Alıcı gereklidir")
    .max(255, "Alıcı 255 karakterden uzun olamaz"),
  receiverNeighborhood: z
    .string({
      invalid_type_error: "Geçersiz alıcı mahalle değeri",
    })
    .max(255, "Alıcı mahalle 255 karakterden uzun olamaz")
    .nullable(),
  receiverAddress: z
    .string({
      invalid_type_error: "Geçersiz alıcı adres değeri",
    })
    .nullable(),
  receiverCity: z
    .string({
      invalid_type_error: "Geçersiz alıcı şehir değeri",
    })
    .max(255, "Alıcı şehir 255 karakterden uzun olamaz")
    .nullable(),
  receiverProvince: z
    .string({
      invalid_type_error: "Geçersiz alıcı ilçe değeri",
    })
    .max(255, "Alıcı ilçe 255 karakterden uzun olamaz")
    .nullable(),
  receiverPhone: z
    .string({
      invalid_type_error: "Geçersiz alıcı telefon değeri",
    })
    .max(255, "Alıcı telefon 255 karakterden uzun olamaz")
    .nullable(),
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
