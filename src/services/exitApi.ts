import { emptyApi } from "./emptyApi";

// Interfaces
import { Customer } from "@interfaces/customer";
import { Product } from "@interfaces/product";
import { Order } from "@interfaces/order";

export const exitApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getProductExits: build.query<GetProductExitsResponse, GetProductExitsRequest>({
      query: (params) => ({
        url: `/exits/${params.productId}`,
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
    }),
  }),
});

interface GetProductExitsResponse {
  exits: Exit[];
  totalPages: number;
  totalCount: number;
}

interface GetProductExitsRequest {
  productId: number;
  query: RequestQuery;
}

export interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: keyof Exit;
  sortOrder?: "ASC" | "DESC";
}

export type Exit = {
  id: number;
  date: string;
  orderId: number | null;
  productId: number;
  amount: number;
  storageAmountAfterExit: number;
  type: ExitType;
  createdAt: string;
  updatedAt: string;
  product: Product;
  order: Order | null;
};

export type ExitType = "order" | "unknown";

export const { useGetProductExitsQuery } = exitApi;
