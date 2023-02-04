import { z } from "zod";

export const schema = z.object({
  customerId: z.string({
    required_error: "Müşteri seçimi zorunludur.",
    invalid_type_error: "Müşteri seçimi zorunludur.",
  }),
});
