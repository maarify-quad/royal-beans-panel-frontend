import { z } from "zod";

export const schema = z.object({
  excel: z.instanceof(File, { message: "Geçerli bir dosya seçiniz" }),
});

export const initialValues = {
  excel: null,
};
