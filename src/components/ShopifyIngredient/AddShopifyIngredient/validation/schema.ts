import { z } from "zod";

export const addShopifyIngredientSchema = z.object({
  shopifyProductId: z.string(),
  shopifyVariantId: z.string(),
});
