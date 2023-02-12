import { z } from "zod";

export const schema = z.object({
  // productId: z.string({
  //   required_error: "Ürün gereklidir",
  //   invalid_type_error: "Geçersiz ürün değeri",
  // }),
  // ingredientId: z.string({
  //   required_error: "İçerik ürünü gereklidir",
  //   invalid_type_error: "Geçersiz içerik ürünü değeri",
  // }),
  // rate: z
  //   .number({
  //     required_error: "Oran gereklidir",
  //     invalid_type_error: "Geçersiz oran değeri",
  //   })
  //   .min(1, "Oran 1'den küçük olamaz")
  //   .max(100, "Oran 100'den büyük olamaz"),
  roastIngredients: z
    .array(
      z.object({
        productId: z.string({
          required_error: "Ürün gereklidir",
          invalid_type_error: "Geçersiz ürün değeri",
        }),
        ingredientId: z.string({
          required_error: "İçerik ürünü gereklidir",
          invalid_type_error: "Geçersiz içerik ürünü değeri",
        }),
        rate: z
          .number({
            required_error: "Oran gereklidir",
            invalid_type_error: "Geçersiz oran değeri",
          })
          .min(1, "Oran 1'den küçük olamaz")
          .max(100, "Oran 100'den büyük olamaz"),
      })
    )
    .min(1, "En az bir içerik ürünü eklemelisiniz"),
});
