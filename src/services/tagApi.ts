import { emptyApi } from "./emptyApi";

export const tagApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<GetTagsResponse, void>({
      query: () => "/tags",
      providesTags: ["Tag"],
    }),
    createTag: build.mutation<CreateTagResponse, CreateTagRequest>({
      query: (body) => ({
        url: "/tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagApi;

interface GetTagsResponse {
  tags: Tag[];
}

interface CreateTagRequest {
  name: string;
}

interface CreateTagResponse {
  tag: Tag;
}

export type Tag = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
