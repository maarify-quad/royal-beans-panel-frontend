import { z } from "zod";

export const schema = z
  .object({
    productId: z.number().or(z.string()),
    newProductName: z.string(),
    unitPrice: z.number(),
    unit: z.string(),
    taxRate: z.number().or(z.string()),
  })
  .refine(
    (args) => {
      // If product id is negative it means new product is created
      // so check if new product's unit is not empty
      if (args.productId < 0) return args.unit !== "";
      return true;
    },
    {
      message: "Yeni ürünün miktar birimi boş bırakılamaz",
      path: ["unit"],
    }
  )
  .refine(
    (args) => {
      // If product id is negative it means new product is created
      // so check if new product's name is not empty
      if (args.productId < 0) return args.newProductName !== "";
      return true;
    },
    {
      message: "Yeni ürün adı boş bırakılamaz",
      path: ["productId"],
    }
  );
