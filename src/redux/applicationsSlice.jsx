import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async () => {
    const response = await axios.post(
      process.env.REACT_APP_LIST_APPLICATION_URL,
      {}
    );
    return response.data;
  }
);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    result: {
      register: [],
      unregister: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result.register = action.payload.result.register;
        state.result.unregister = action.payload.result.unregister;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default applicationsSlice.reducer;
