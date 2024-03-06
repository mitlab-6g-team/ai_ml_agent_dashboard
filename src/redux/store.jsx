import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './applicationsSlice';

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },
});