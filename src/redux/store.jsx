import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./applicationsSlice";
import pipelinesReducer from "./pipelinesSlice";
import modelsReducer from "./modelsSlice";
export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    pipelines: pipelinesReducer,
    models: modelsReducer,
  },
});
