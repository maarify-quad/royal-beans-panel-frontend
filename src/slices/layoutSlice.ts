import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import type { RootState } from "@app/store";

const initialState = {
  isDrawerOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state, action: PayloadAction<boolean | undefined>) => {
      state.isDrawerOpen = action.payload || !state.isDrawerOpen;
    },
  },
});

export const { toggleDrawer } = layoutSlice.actions;

export const selectIsDrawerOpen = (state: RootState) => state.layout.isDrawerOpen;

export default layoutSlice.reducer;
