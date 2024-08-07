import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "../reducers/avatarReducer";
import themeReducer from "../reducers/themeReducer";
import cursorReducer from "../reducers/cursorReducer";

const store = configureStore({
  reducer: {
    themeState: themeReducer,
    avatarState: avatarReducer,
    cursorState: cursorReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export default store;
