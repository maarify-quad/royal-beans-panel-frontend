import { z } from "zod";

export const createPriceListSchema = z.object({
  name: z
    .string({
      required_error: "Fiyat listesi adı gereklidir",
      invalid_type_error: "Fiyat listesi adı metinsel bir değer olmalıdır",
    })
    .min(1, "Fiyat listesi adı gereklidir")
    .max(255, "Fiyat listesi adı 255 karakterden uzun olamaz"),
  products: z
    .record(
      z.number().or(z.string()),
      z.object({
        unitPrice: z
          .number({
            required_error: "Birim fiyat gereklidir",
            invalid_type_error: "Birim fiyat sayısal bir değer olmalıdır",
          })
          .min(0, "Birim fiyat 0'dan küçük olamaz"),
        taxRate: z
          .number({
            required_error: "KDV oranı gereklidir",
            invalid_type_error: "KDV oranı sayısal bir değer olmalıdır",
          })
          .min(0, "KDV oranı 0'dan küçük olamaz"),
      })
    )
    .refine((products) => {
      const productIds = Object.keys(products);
      return productIds.length > 0;
    }, "En az bir ürün eklemelisiniz"),
});

export type CreatePriceListValues = z.infer<typeof createPriceListSchema>;

export const initialValues: CreatePriceListValues = {
  name: "",
  products: {},
};
