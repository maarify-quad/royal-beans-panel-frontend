import { emptyApi } from "./emptyApi";

export const receiverApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getReceivers: builder.query<GetReceiversResponse, GetReceiversRequest | void>({
      query: (params) => ({
        url: `/receivers`,
        ...(Object.keys(params?.query || {}).length && {
          params: params?.query,
        }),
      }),
    }),
  }),
});

export const { useGetReceiversQuery } = receiverApi;

interface GetReceiversRequest {
  query?: RequestQuery;
}

interface GetReceiversResponse {
  receivers: Receiver[];
  totalCount: number;
  totalPages: number;
}

type RequestQuery = {
  page?: number;
  limit?: number;
};

export type Receiver = {
  id: number;
  name: string;
  neighborhood: string | null;
  address: string | null;
  province: string | null;
  city: string | null;
  phone: string | null;
};
