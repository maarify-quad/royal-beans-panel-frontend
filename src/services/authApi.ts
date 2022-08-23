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
    logout: builder.query<any, void>({
      query: () => "/auth/logout",
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation, useLazyLogoutQuery } = authApi;

interface ProfileResponse {
  accessToken: string;
  user: User;
}

interface LoginResponse extends ProfileResponse {}

interface LoginParams {
  username: string;
  password: string;
}
