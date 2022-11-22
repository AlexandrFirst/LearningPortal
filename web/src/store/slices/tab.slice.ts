import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

import { ITab } from "api/tab-api/tab.api.types";

interface TabState {
  tabs: ITab[] | null;
  firstTab: ITab | null;
}

const initialState: TabState = {
  tabs: [],
  firstTab: null,
};

export const authSlice = createSlice({
  name: "Tabs",
  initialState,
  reducers: {
    updateTabs(state, action: PayloadAction<ITab[]>) {
      state.tabs = action.payload;
      if (state.tabs.length) state.firstTab = state.tabs[0];
    },
    addNewTab(state, action: PayloadAction<string>) {
      if (!state.tabs) state.tabs = [];
      // state.tabs.push({ id: action.payload, label: "" });
    },
    updateTab(state, action: PayloadAction<ITab>) {
      const candidate = state.tabs?.find((tab) => tab.id === action.payload.id);
      // if (candidate) {
      //   candidate.label = action.payload.label;
      // }
    },
    deleteTab(state, action: PayloadAction<string>) {
      if (state.tabs) {
        // state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      }
    },
  },
});

export const { updateTabs, addNewTab, updateTab, deleteTab } =
  authSlice.actions;
export const tabReducer = authSlice.reducer;
export const selectTabs = (state: RootState) => state.tabs;
