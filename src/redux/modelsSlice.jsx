import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchModles = createAsyncThunk(
  "pipelines/fetchmodels",
  async (training_pipeline_Uid, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_LIST_PIPELINE_URL,
        { training_pipeline_uid: training_pipeline_Uid }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const modlesSlice = createSlice({
  name: "models",
  initialState: {
    result: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchModles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload.result;
      })
      .addCase(fetchModles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default modlesSlice.reducer;
