import { emptyApi } from "./emptyApi";
import { shopparApi } from "./shopparApi";

export type ShopifyVariant = {
  id: string;
  title: string;
  sku: string | null;
  price: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  status: string;
  options: { name: string; values: string[] }[];
  variants: ShopifyVariant[];
};

export type ParasutProduct = {
  id: string;
  name: string;
  code: string | null;
  listPrice: number | null;
  vatRate: number | null;
};

export type ParasutSearchResponse = {
  products: ParasutProduct[];
  meta:
    | { total_pages: number; total_count: number }
    | { mock: true }
    | null;
};

export type ProductMappingRelation = {
  id: number;
  shopifyId: string;
  parasutIds: string;
  updatedAt?: string;
};

export type UpsertRelationParams = {
  shopifyId: string;
  parasutIds: string | string[];
};

export const productMappingApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getShopifyProducts: build.query<ShopifyProduct[], void>({
      query: () => "/product_mapping/shopify-products",
      providesTags: [{ type: "ProductMapping" as const, id: "ShopifyProducts" }],
    }),
    searchParasutProducts: build.query<
      ParasutSearchResponse,
      { q?: string; page?: number; pageSize?: number }
    >({
      query: ({ q, page, pageSize }) => {
        const params = new URLSearchParams();
        if (q && q.length > 0) params.set("q", q);
        if (page != null) params.set("page", String(page));
        if (pageSize != null) params.set("pageSize", String(pageSize));
        const qs = params.toString();
        return `/product_mapping/parasut-products${qs ? `?${qs}` : ""}`;
      },
    }),
    getRelations: build.query<ProductMappingRelation[], void>({
      query: () => "/product_mapping/relations",
      providesTags: [
        { type: "ProductMappingRelation" as const, id: "LIST" },
      ],
    }),
    upsertRelation: build.mutation<
      { id: number; shopifyId: string; parasutIds: string },
      UpsertRelationParams
    >({
      query: (body) => ({
        url: "/product_mapping/relations",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "ProductMappingRelation" as const, id: "LIST" }],
    }),
    deleteRelation: build.mutation<{ deleted: number }, { shopifyId: string }>({
      query: ({ shopifyId }) => ({
        url: `/product_mapping/relations/${shopifyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductMappingRelation" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetShopifyProductsQuery,
  useLazySearchParasutProductsQuery,
  useGetRelationsQuery,
  useUpsertRelationMutation,
  useDeleteRelationMutation,
} = productMappingApi;
