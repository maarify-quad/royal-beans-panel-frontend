import { z } from "zod";

export const editDeciSchema = z.object({
  price: z.number({
    required_error: "Fiyat boş bırakılamaz",
    invalid_type_error: "Fiyat sayı olmalıdır",
  }),
});

export type EditDeciValues = z.infer<typeof editDeciSchema>;
