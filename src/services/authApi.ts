import { emptyApi } from "./emptyApi";

// Interfaces
import { User } from "@interfaces/auth";

export const authApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/auth/profile",
    }),
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (body) => ({
        method: "POST",
        url: "/auth/login",
        body,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation } = authApi;

interface ProfileResponse {
  user: User;
}

interface LoginResponse extends ProfileResponse {
  accessToken: string;
}

interface LoginParams {
  username: string;
  password: string;
}
