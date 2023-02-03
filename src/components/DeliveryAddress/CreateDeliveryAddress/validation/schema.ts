import { z } from "zod";

export const schema = z.object({
  title: z
    .string({
      required_error: "Başlık gereklidir",
      invalid_type_error: "Geçersiz başlık değeri",
    })
    .min(1, "Başlık gereklidir"),
  receiverName: z
    .string({
      required_error: "Alıcı adı gereklidir",
      invalid_type_error: "Geçersiz alıcı adı değeri",
    })
    .min(1, "Alıcı adı gereklidir"),
  receiverPhone: z
    .string({
      required_error: "Alıcı telefon gereklidir",
      invalid_type_error: "Geçersiz alıcı telefon değeri",
    })
    .min(1, "Alıcı telefon gereklidir"),
  receiverAddress: z
    .string({
      required_error: "Alıcı adres gereklidir",
      invalid_type_error: "Geçersiz alıcı adres değeri",
    })
    .min(1, "Alıcı adres gereklidir"),
  receiverProvince: z
    .string({
      required_error: "Alıcı ilçe gereklidir",
      invalid_type_error: "Geçersiz alıcı ilçe değeri",
    })
    .min(1, "Alıcı ilçe gereklidir"),
  receiverCity: z
    .string({
      required_error: "Alıcı şehir gereklidir",
      invalid_type_error: "Geçersiz alıcı şehir değeri",
    })
    .min(1, "Alıcı şehir gereklidir"),
});
