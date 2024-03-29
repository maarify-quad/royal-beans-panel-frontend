import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Services
import { authApi } from "@services/authApi";

// Interfaces & Types
import { AuthState } from "@interfaces/auth";
import type { RootState } from "@app/store";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    });
  },
});

export const { setAuthentication } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRoles = (state: RootState) =>
  state.auth.user?.roles.map((role) => role.name) || [];
export const selectIsAdmin = (state: RootState) =>
  state.auth.user?.roles.some((role) => role.name === "admin") || false;

export default authSlice.reducer;
