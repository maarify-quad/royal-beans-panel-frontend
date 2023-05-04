import { emptyApi } from "./emptyApi";

// Interfaces
import { User } from "@interfaces/auth";
import { Product } from "@interfaces/product";
import { Order } from "@interfaces/order";

export const loggingApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllLogs: build.query<Logging[], void>({
      query: () => `/logging`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAllLogsQuery } = loggingApi;

interface Logging {
  id: number;
  userId: number | null;
  productId: number | null;
  orderId: number | null;
  message: string;
  jsonParams: string | null;
  resource: LoggingResource;
  operation: LogginOperation;
  createdAt: string;
  user: User | null;
  product: Product | null;
  order: Order | null;
}

export type LoggingResource =
  | "unknown"
  | "roast"
  | "order"
  | "product"
  | "exit"
  | "production"
  | "stock"
  | "parasut";
export type LogginOperation = "unknown" | "create" | "bulkCreate" | "update" | "delete";
