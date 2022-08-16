import { z } from "zod";

export const schema = z.object({
  name: z
    .string({
      required_error: "Müşteri adı gereklidir",
      invalid_type_error: "Müşteri adı geçersiz",
    })
    .min(1, "Müşteri adı gereklidir"),
  companyTitle: z
    .string({
      required_error: "Firma unvanı gereklidir",
      invalid_type_error: "Firma unvanı geçersiz",
    })
    .optional(),
  contactName: z
    .string({
      required_error: "İlgili kişi adı gereklidir",
      invalid_type_error: "İlgili kişi adı geçersiz",
    })
    .optional(),
  contactTitle: z
    .string({
      required_error: "İlgili kişi unvanı gereklidir",
      invalid_type_error: "İlgili kişi unvanı geçersiz",
    })
    .optional(),
  secondContactName: z
    .string({
      required_error: "İkinci ilgili kişi adı gereklidir",
      invalid_type_error: "İkinci ilgili kişi adı geçersiz",
    })
    .optional(),
  secondContactTitle: z
    .string({
      required_error: "İkinci ilgili kişi unvanı gereklidir",
      invalid_type_error: "İkinci ilgili kişi unvanı geçersiz",
    })
    .optional(),
  email: z
    .string({
      required_error: "E-posta adresi gereklidir",
      invalid_type_error: "E-posta adresi geçersiz",
    })
    .optional(),
  phone: z
    .string({
      required_error: "Telefon numarası gereklidir",
      invalid_type_error: "Telefon numarası geçersiz",
    })
    .optional(),
  address: z
    .string({
      required_error: "Adres gereklidir",
      invalid_type_error: "Adres geçersiz",
    })
    .optional(),
  province: z
    .string({
      required_error: "İl gereklidir",
      invalid_type_error: "İl geçersiz",
    })
    .optional(),
  city: z
    .string({
      required_error: "İlçe gereklidir",
      invalid_type_error: "İlçe geçersiz",
    })
    .optional(),
  cargoAddress: z
    .string({
      required_error: "Kargo adresi gereklidir",
      invalid_type_error: "Kargo adresi geçersiz",
    })
    .optional(),
  cargoProvince: z
    .string({
      required_error: "Kargo il gereklidir",
      invalid_type_error: "Kargo il geçersiz",
    })
    .optional(),
  cargoCity: z
    .string({
      required_error: "Kargo ilçe gereklidir",
      invalid_type_error: "Kargo ilçe geçersiz",
    })
    .optional(),
  taxOffice: z
    .string({
      required_error: "Vergi dairesi gereklidir",
      invalid_type_error: "Vergi dairesi geçersiz",
    })
    .optional(),
  taxNo: z
    .string({
      required_error: "Vergi numarası gereklidir",
      invalid_type_error: "Vergi numarası geçersiz",
    })
    .optional(),
  startBalance: z
    .number({
      required_error: "Başlangıç bakiyesi gereklidir",
      invalid_type_error: "Başlangıç bakiyesi geçersiz",
    })
    .optional(),
  commercialPrinciple: z
    .string({
      required_error: "Ticari prensip gereklidir",
      invalid_type_error: "Ticari prensip geçersiz",
    })
    .optional(),
  comment: z
    .string({
      required_error: "Yorum gereklidir",
      invalid_type_error: "Yorum geçersiz",
    })
    .optional(),
  specialNote: z
    .string({
      required_error: "Özel not gereklidir",
      invalid_type_error: "Özel not geçersiz",
    })
    .optional(),
});
