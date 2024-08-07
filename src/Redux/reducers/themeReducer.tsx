import { createSlice } from "@reduxjs/toolkit";
import { CurrentPageIndex } from "../../Types/Types";

export type themeInitialState = {
   isDarkTheme: boolean;
   currentPageIndex: CurrentPageIndex;
   isDefaultLanguage: boolean;
};

const initialState: themeInitialState = {
   isDarkTheme: true,
   currentPageIndex: 0,
   isDefaultLanguage: true,
};

type UpdateCurrentPageIndex = {
   payload: { index: CurrentPageIndex };
   type: string;
};

type ToggleLanguage = {
   payload: boolean;
   type: string;
};

const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         state.isDarkTheme = true;
      },
      updateCurrentPageIndex: (state, action: UpdateCurrentPageIndex) => {
         const { index } = action.payload;
         state.currentPageIndex = index;
      },
      toggleLanguage: (state, action: ToggleLanguage) => {
         state.isDefaultLanguage = action.payload;
      },
   },
});

export const { toggleTheme, updateCurrentPageIndex, toggleLanguage } =
   themeSlice.actions;
export default themeSlice.reducer;
