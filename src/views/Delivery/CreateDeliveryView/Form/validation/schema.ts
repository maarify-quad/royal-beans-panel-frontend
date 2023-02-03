import { z } from "zod";

export const schema = z.object({
  deliveryDate: z.date({
    required_error: "Sevkiyat tarihi gereklidir",
    invalid_type_error: "Geçersiz sevkiyat tarih değeri",
  }),
  invoiceDate: z.date({
    required_error: "Fatura tarihi gereklidir",
    invalid_type_error: "Geçersiz fatura tarih değeri",
  }),
  supplierId: z
    .string({
      required_error: "Tedarikçi gereklidir",
      invalid_type_error: "Geçersiz tedarikçi değeri",
    })
    .min(1, "Tedarikçi gereklidir")
    .or(
      z.number({
        required_error: "Tedarikçi gereklidir",
        invalid_type_error: "Geçersiz tedarikçi değeri",
      })
    ),
  deliveryDetails: z
    .object({
      productId: z.number({
        required_error: "Ürün gereklidir",
        invalid_type_error: "Geçersiz ürün değeri",
      }),
      storageType: z
        .string({
          required_error: "Hammadde sınıfı gereklidir",
          invalid_type_error: "Geçersiz hammadde sınıfı değeri",
        })
        .min(1, "Hammadde sınıfı gereklidir"),
      quantity: z
        .number({
          required_error: "Miktar gereklidir",
          invalid_type_error: "Geçersiz miktar değeri",
        })
        .min(0, "Miktar en az 0 olmalıdır"),
      unit: z
        .string({
          required_error: "Miktar birimi gereklidir",
          invalid_type_error: "Geçersiz miktar birimi değeri",
        })
        .min(1, "Miktar birimi gereklidir"),
      unitPriceTRY: z
        .number({
          required_error: "Birim fiyat gereklidir",
          invalid_type_error: "Geçersiz birim fiyat değeri",
        })
        .min(0, "Birim fiyat en az 0 olmalıdır"),
      taxRate: z
        .number({
          required_error: "Vergi oranı gereklidir",
          invalid_type_error: "Geçersiz vergi oranı değeri",
        })
        .min(0, "Vergi oranı en az 0 olmalıdır"),
      subTotal: z
        .number({
          required_error: "Ara toplam gereklidir",
          invalid_type_error: "Geçersiz ara toplam değeri",
        })
        .min(0, "Ara toplam en az 0 olmalıdır"),
      total: z
        .number({
          required_error: "Toplam gereklidir",
          invalid_type_error: "Geçersiz toplam değeri",
        })
        .min(0, "Toplam en az 0 olmalıdır"),
    })
    .array()
    .min(1, "Sevkiyat için en az 1 ürün gereklidir"),
});

export const initialValues = {
  deliveryDate: new Date(),
  invoiceDate: new Date(),
  supplierId: "",
  deliveryDetails: [],
  productId: "0",
  storageType: "HM",
  quantity: 0,
  unit: "kg",
  unitPriceUSD: 0,
  unitPriceTRY: 0,
  taxRate: "0",
  subTotal: 0,
  total: 0,
};
