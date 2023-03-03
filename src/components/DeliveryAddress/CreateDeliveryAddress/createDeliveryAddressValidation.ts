import { z } from "zod";

export const createDeliveryAddressSchema = z.object({
  title: z
    .string({
      required_error: "Başlık gereklidir",
      invalid_type_error: "Geçersiz başlık değeri",
    })
    .min(1, "Başlık gereklidir")
    .max(255, "Başlık 255 karakterden uzun olamaz"),
  receiverName: z
    .string({
      required_error: "Alıcı adı gereklidir",
      invalid_type_error: "Geçersiz alıcı adı değeri",
    })
    .min(1, "Alıcı adı gereklidir")
    .max(255, "Alıcı adı 255 karakterden uzun olamaz"),
  receiverPhone: z
    .string({
      required_error: "Alıcı telefon gereklidir",
      invalid_type_error: "Geçersiz alıcı telefon değeri",
    })
    .min(1, "Alıcı telefon gereklidir")
    .max(255, "Alıcı telefon 255 karakterden uzun olamaz"),
  receiverAddress: z
    .string({
      required_error: "Alıcı adres gereklidir",
      invalid_type_error: "Geçersiz alıcı adres değeri",
    })
    .min(1, "Alıcı adres gereklidir")
    .max(255, "Alıcı adres 255 karakterden uzun olamaz"),
  receiverProvince: z
    .string({
      required_error: "Alıcı ilçe gereklidir",
      invalid_type_error: "Geçersiz alıcı ilçe değeri",
    })
    .min(1, "Alıcı ilçe gereklidir")
    .max(255, "Alıcı ilçe 255 karakterden uzun olamaz"),
  receiverCity: z
    .string({
      required_error: "Alıcı şehir gereklidir",
      invalid_type_error: "Geçersiz alıcı şehir değeri",
    })
    .min(1, "Alıcı şehir gereklidir")
    .max(255, "Alıcı şehir 255 karakterden uzun olamaz"),
  isPrimary: z.boolean({
    required_error: "Birincil adres gereklidir",
    invalid_type_error: "Geçersiz birincil adres değeri",
  }),
});

export type CreateDeliveryAddressValues = z.infer<typeof createDeliveryAddressSchema>;

export const initialValues: CreateDeliveryAddressValues = {
  title: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  receiverProvince: "",
  receiverCity: "",
  isPrimary: false,
};
