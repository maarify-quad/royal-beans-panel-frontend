import { emptyApi } from "./emptyApi";

// Interfaces
import { Customer } from "@interfaces/customer";
import { Product } from "@interfaces/product";

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
  action: string;
  productId: number;
  customerId: number | null;
  amount: number;
  storageAmountAfterExit: number;
  type: ExitType;
  createdAt: string;
  updatedAt: string;
  product: Product;
  customer: Customer | null;
};

export type ExitType = "order" | "unknown";

export const { useGetProductExitsQuery } = exitApi;
