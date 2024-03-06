import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeployApplciation = createAsyncThunk(
  "deploy/fetchDeployApplciation",
  async (application_Uid, model_Uid, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_LIST_PIPELINE_URL,
        { application_uid: application_Uid, model_uid: model_Uid }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deployAppSlice = createSlice({
  name: "deployapp",
  initialState: {
    result: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeployApplciation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeployApplciation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload.result;
      })
      .addCase(fetchDeployApplciation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deployAppSlice.reducer;
