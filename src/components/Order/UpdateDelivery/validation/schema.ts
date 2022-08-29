import { z } from "zod";

export const schema = z.object({
  deliveryType: z.string(),
  cargoTrackNo: z.string().optional(),
});
