import { z } from "zod";

export const schema = z.object({
  customerId: z
    .string({
      required_error: "Müşteri seçimi zorunludur",
      invalid_type_error: "Geçersiz müşteri değeri",
    })
    .min(1, "Müşteri seçimi zorunludur"),
  deliveryDate: z.date({
    required_error: "Teslimat tarihi zorunludur",
    invalid_type_error: "Geçersiz teslimat tarih değeri",
  }),
  specialNote: z.string().optional(),
  deliveryAddressId: z
    .string({
      required_error: "Teslimat adresi zorunludur",
      invalid_type_error: "Geçersiz teslimat adresi değeri",
    })
    .min(1, "Teslimat adresi zorunludur"),
  deliveryType: z
    .string({
      required_error: "Teslimat tipi zorunludur",
      invalid_type_error: "Geçersiz teslimat tipi değeri",
    })
    .min(1, "Teslimat tipi zorunludur"),
  orderProducts: z
    .object({
      priceListProductId: z.number({
        required_error: "Fiyat listesi ürünü zorunludur",
        invalid_type_error: "Geçersiz fiyat listesi ürünü değeri",
      }),
      grindType: z.string({
        required_error: "Öğütüm metodu zorunludur",
        invalid_type_error: "Geçersiz öğütüm metodu türü değeri",
      }),
      quantity: z.number({
        required_error: "Adet zorunludur",
        invalid_type_error: "Geçersiz adet değeri",
      }),
      unitPrice: z.number({
        required_error: "Birim fiyat zorunludur",
        invalid_type_error: "Geçersiz birim fiyat değeri",
      }),
      taxRate: z.number({
        required_error: "KDV oranı zorunludur",
        invalid_type_error: "Geçersiz KDV oranı değeri",
      }),
      subTotal: z.number({
        required_error: "Ara toplam zorunludur",
        invalid_type_error: "Geçersiz ara toplam değeri",
      }),
      total: z.number({
        required_error: "Toplam zorunludur",
        invalid_type_error: "Geçersiz toplam değeri",
      }),
    })
    .array()
    .min(1, "En az bir ürün eklenmelidir"),
});
