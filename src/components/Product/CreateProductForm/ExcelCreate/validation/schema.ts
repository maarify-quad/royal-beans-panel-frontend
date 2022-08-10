import { z } from "zod";

export const schema = z.object({
  excel: z.instanceof(File, "Geçerli bir dosya seçiniz"),
});

export const initialValues = {
  excel: null,
};
