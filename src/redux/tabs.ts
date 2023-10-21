import { createSlice } from "@reduxjs/toolkit";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    tabs: "",
  },
  reducers: {
    clear: (state) => {
      state.tabs = "";
    },
    update: (state, action) => {
      state.tabs = action.payload;
    },
  },
});

export const { clear, update } = tabsSlice.actions;

export default tabsSlice.reducer;
