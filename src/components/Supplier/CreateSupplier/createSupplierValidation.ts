import { z } from "zod";

export type CreateSupplierValues = {
  name: string;
  address: string;
  taxNo: string;
  taxOffice: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
};

export const createSupplierSchema = z.object({
  name: z
    .string({
      required_error: "Tedarikçi adı gereklidir",
      invalid_type_error: "Tedarikçi adı geçersiz",
    })
    .min(1, "Tedarikçi adı gereklidir"),
  address: z
    .string({
      required_error: "Adres gereklidir",
      invalid_type_error: "Adres geçersiz",
    })
    .min(1, "Adres gereklidir"),
  taxNo: z
    .string({
      required_error: "Vergi kimlik no gereklidir",
      invalid_type_error: "Vergi kimlik no geçersiz",
    })
    .min(1, "Vergi kimlik no gereklidir"),
  taxOffice: z
    .string({
      required_error: "Vergi dairesi gereklidir",
      invalid_type_error: "Vergi dairesi geçersiz",
    })
    .min(1, "Vergi dairesi gereklidir"),
  contactName: z
    .string({
      required_error: "Yetkili kişi adı gereklidir",
      invalid_type_error: "Yetkili kişi adı geçersiz",
    })
    .min(1, "Yetkili kişi adı gereklidir")
    .or(z.literal("")),
  contactPosition: z
    .string({
      required_error: "Yetkili kişi pozisyonu gereklidir",
      invalid_type_error: "Yetkili kişi pozisyonu geçersiz",
    })
    .min(1, "Yetkili kişi pozisyonu gereklidir")
    .or(z.literal("")),
  contactPhone: z
    .string({
      required_error: "Yetkili kişi telefonu gereklidir",
      invalid_type_error: "Yetkili kişi telefonu geçersiz",
    })
    .min(1, "Yetkili kişi telefonu gereklidir")
    .or(z.literal("")),
  contactEmail: z
    .string({
      required_error: "Yetkili kişi e-posta gereklidir",
      invalid_type_error: "Yetkili kişi e-posta geçersiz",
    })
    .email("Geçersiz e-posta")
    .or(z.literal("")),
});

export const initialValues: CreateSupplierValues = {
  name: "",
  address: "",
  taxNo: "",
  taxOffice: "",
  contactName: "",
  contactPosition: "",
  contactPhone: "",
  contactEmail: "",
};
