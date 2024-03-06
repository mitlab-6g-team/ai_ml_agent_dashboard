import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPipelines = createAsyncThunk(
  "pipelines/fetchPipelines",
  async (application_Uid, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_LIST_PIPELINE_URL,
        { application_uid: application_Uid }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const pipelinesSlice = createSlice({
  name: "pipelines",
  initialState: {
    result: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPipelines.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPipelines.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload.result;
      })
      .addCase(fetchPipelines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pipelinesSlice.reducer;
