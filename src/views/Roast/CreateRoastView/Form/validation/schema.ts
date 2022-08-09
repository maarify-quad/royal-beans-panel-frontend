import { z } from "zod";
import { Inputs } from "./Inputs";

export const schema = z.object({
  roastDetails: z
    .array(
      z.object({
        productId: z.number({
          required_error: "Ürün gereklidir",
          invalid_type_error: "Geçersiz ürün değeri",
        }),
        inputAmount: z
          .number({
            required_error: "Atılan kg gereklidir",
            invalid_type_error: "Geçersiz atılan kg değeri",
          })
          .min(0, "Atılan kg en az 0 olmalıdır"),
        outputAmount: z
          .number({
            required_error: "Alınan kg gereklidir",
            invalid_type_error: "Geçersiz alınan kg değeri",
          })
          .min(0, "Alınan kg en az 0 olmalıdır"),
      }),
      {
        required_error: "Kavrum ürünleri gereklidir",
        invalid_type_error: "Geçersiz kavrum ürünleri değeri",
      }
    )
    .array()
    .min(1, "Kavrum için en az 1 ürün gereklidir"),
});

export const initialValues: Inputs = {
  roundId: 1,
  productId: 0,
  inputAmount: 0,
  outputAmount: 0,
  roastDetails: [[]],
};
