import { emptyApi } from "./emptyApi";

// Interfaces
import { Product } from "@interfaces/product";
import { Order } from "@interfaces/order";

export const productionApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getProductions: build.query<GetProductionsResponse, GetProductionsRequest>({
      query: (params) => ({
        url: `/productions/product/${params.productId}`,
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
    }),
  }),
});

interface GetProductionsResponse {
  productions: Production[];
  totalPages: number;
  totalCount: number;
}

interface GetProductionsRequest {
  productId: number;
  query: RequestQuery;
}

export interface RequestQuery {
  page?: number;
  limit?: number;
  sortBy?: keyof Production;
  sortOrder?: "ASC" | "DESC";
}

export type Production = {
  id: number;
  orderId: number;
  productId: number;
  producedProductId: number;
  usageAmount: number;
  createdAt: string;
  updatedAt: string;
  order: Order;
  product: Product;
  producedProduct: Product;
};

export const { useGetProductionsQuery } = productionApi;
