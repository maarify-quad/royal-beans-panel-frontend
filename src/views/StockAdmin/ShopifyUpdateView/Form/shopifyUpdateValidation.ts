import { z } from "zod";
import { Product } from "@interfaces/product";

export type ShopifyUpdateValues = {
  productId: string;
  product: Product | null;
  quantity: number;
  ingredients: {
    productId: string;
    product: Product;
    quantity: number;
  }[];
};

export const shopifyUpdateSchema = z.object({
  productId: z.string().or(z.number()),
  product: z.any(),
  quantity: z.number().min(0),
});

export const shopifyUpdateInitialValues: ShopifyUpdateValues = {
  productId: "0",
  product: null,
  quantity: 1,
  ingredients: [],
};
