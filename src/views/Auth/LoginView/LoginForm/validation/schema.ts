import { z } from "zod";

export const schema = z.object({
  username: z
    .string({
      required_error: "Kullanıcı adı boş bırakılamaz",
      invalid_type_error: "Kullanıcı adı geçerli değil",
    })
    .min(1, "Kullanıcı adı boş bırakılamaz"),
  password: z
    .string({
      required_error: "Şifre boş bırakılamaz",
      invalid_type_error: "Şifre geçerli değil",
    })
    .min(1, "Şifre boş bırakılamaz"),
});
