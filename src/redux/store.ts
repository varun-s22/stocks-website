import { configureStore } from "@reduxjs/toolkit";
import tabsSlice from "./tabs";

export default configureStore({
  reducer: {
    tabs: tabsSlice,
  },
});
