import { RootState } from "@app/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Receiver, receiverApi } from "@services/receiverApi";

type ReceiverState = {
  receiverOptions: { label: string; value: string }[];
};

const initialState: ReceiverState = {
  receiverOptions: [],
};

export const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    pushReceiverOption: (state, action: PayloadAction<{ label: string; value: string }>) => {
      state.receiverOptions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(receiverApi.endpoints.getReceivers.matchFulfilled, (state, action) => {
      state.receiverOptions = action.payload.receivers.map((receiver: Receiver) => ({
        label: receiver.name,
        value: receiver.id.toString(),
      }));
    });
  },
});

export const { pushReceiverOption } = receiverSlice.actions;

export const selectReceiverOptions = (state: RootState) => state.receiver.receiverOptions;

export default receiverSlice.reducer;
