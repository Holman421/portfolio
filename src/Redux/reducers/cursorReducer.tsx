import { createSlice } from "@reduxjs/toolkit";

export type CursorInitialState = {
  isCursorActive: boolean;
};

const initialState: CursorInitialState = {
  isCursorActive: false,
};

type toggleCursor = {
  payload: boolean;
  type: string;
};

const cursorSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleCursor: (state, action: toggleCursor) => {
      state.isCursorActive = action.payload;
    },
  },
});

export const { toggleCursor } = cursorSlice.actions;
export default cursorSlice.reducer;
