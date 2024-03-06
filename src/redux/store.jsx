import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./applicationsSlice";
import pipelinesReducer from "./pipelinesSlice";
export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    pipelines: pipelinesReducer,
  },
});
