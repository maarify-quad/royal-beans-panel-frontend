import { z } from "zod";
import { schema } from "./schema";

export type Inputs = z.infer<typeof schema>;

export const initialValues: Inputs = {
  title: "",
  description: "",
  code: "",
  finisherCode: "",
  winnerCount: 1,
};
