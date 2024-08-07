import { createSlice } from "@reduxjs/toolkit";
import { SelectedMode } from "../../Types/Types";

export type avatarInitialState = {
  selectedMode: SelectedMode;
  areAvatarTransitionsOn: boolean;
  applyFirstAppearTransition: boolean;
  showAboutMeContainers: boolean;
  showSkillsContainers: boolean;
};

const initialState: avatarInitialState = {
  selectedMode: "aboutMe",
  areAvatarTransitionsOn: true,
  applyFirstAppearTransition: true,
  showAboutMeContainers: true,
  showSkillsContainers: false,
};

type SetSelectedMode = {
  payload: SelectedMode;
  type: string;
};

type ToggleBoolean = {
  payload: boolean;
  type: string;
};

const avatarSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAreAboutMeTransitionsOn: (
      state,
      action: ToggleBoolean
    ) => {
      state.areAvatarTransitionsOn = action.payload;
    },
    setSelectedMode: (state, action: SetSelectedMode) => {
      state.selectedMode = action.payload;
    },
    setApplyFirstAppearTransition: (
      state,
      action: ToggleBoolean
    ) => {
      state.applyFirstAppearTransition = action.payload;
    },
    setShowAboutMeContainers: (
      state,
      action: ToggleBoolean
    ) => {
      state.showAboutMeContainers = action.payload;
    },
    setShowSkillsContainers: (
      state,
      action: ToggleBoolean
    ) => {
      state.showSkillsContainers = action.payload;
    },
  },
});

export const {
  setAreAboutMeTransitionsOn,
  setSelectedMode,
  setApplyFirstAppearTransition,
  setShowAboutMeContainers,
  setShowSkillsContainers,
} = avatarSlice.actions;
export default avatarSlice.reducer;
