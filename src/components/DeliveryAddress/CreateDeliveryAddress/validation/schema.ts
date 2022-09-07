import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1),
  receiverName: z.string().min(1),
  receiverPhone: z.string().min(1),
  receiverAddress: z.string().min(1),
  receiverProvince: z.string().min(1),
  receiverCity: z.string().min(1),
});
