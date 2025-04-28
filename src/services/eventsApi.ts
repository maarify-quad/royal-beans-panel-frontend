import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_EVENTS_BASE_URL,
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const eventsApi = createApi({
  baseQuery,
  reducerPath: "eventsApi",
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    filterEvents: builder.query<FilterEventsResponse[], FilterEventsRequest>({
      query: (params) => ({
        url: "/events/filter",
        params,
      }),
      providesTags: [{ type: "Events" as const, id: "LIST" }],
    }),
    createEvent: builder.mutation<CreateEventResponse, CreateEventParams>({
      query: (body) => ({
        method: "POST",
        url: "/events",
        body,
      }),
      invalidatesTags: [{ type: "Events" as const, id: "LIST" }],
    }),
  }),
});

export type FilterEventsRequest = {
  page: number;
  limit: number;
};

type FilterEventsResponse = {
  id: number;
  title?: string;
  description?: string;
  code: string;
  finisherCode: string;
  isFinished: boolean;
  createdAt: string;
};

type CreateEventParams = {
  title?: string;
  description?: string;
  code: string;
  finisherCode: string;
};

type CreateEventResponse = {
  id: number;
  title: string;
  description: string;
  code: string;
  finisherCode: string;
};

export const { useFilterEventsQuery, useCreateEventMutation } = eventsApi;
