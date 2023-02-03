import { z } from "zod";

export const schema = z.object({
  receiver: z
    .string({
      required_error: "Alıcı gereklidir",
      invalid_type_error: "Geçersiz alıcı değeri",
    })
    .min(1, "Alıcı gereklidir"),
  receiverNeighborhood: z
    .string({
      required_error: "Alıcı mahalle gereklidir",
      invalid_type_error: "Geçersiz alıcı mahalle değeri",
    })
    .min(1, "Alıcı mahalle gereklidir"),
  receiverAddress: z
    .string({
      required_error: "Alıcı adres gereklidir",
      invalid_type_error: "Geçersiz alıcı adres değeri",
    })
    .min(1, "Alıcı adres gereklidir"),
  receiverCity: z
    .string({
      required_error: "Alıcı şehir gereklidir",
      invalid_type_error: "Geçersiz alıcı şehir değeri",
    })
    .min(1, "Alıcı şehir gereklidir"),
  receiverProvince: z
    .string({
      required_error: "Alıcı ilçe gereklidir",
      invalid_type_error: "Geçersiz alıcı ilçe değeri",
    })
    .min(1, "Alıcı ilçe gereklidir"),
  receiverPhone: z
    .string({
      required_error: "Alıcı telefon gereklidir",
      invalid_type_error: "Geçersiz alıcı telefon değeri",
    })
    .min(1, "Alıcı telefon gereklidir"),
  specialNote: z.string({}).optional(),
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
