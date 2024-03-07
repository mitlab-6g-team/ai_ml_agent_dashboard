import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeployApplciation = createAsyncThunk(
  "deploy/fetchDeployApplciation",
  async ({ application_Uid, model_Uid }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_REGIST_APPLICATION_URL,
        { application_uid: application_Uid, model_uid: model_Uid }
      );
      return { ...response.data, application_Uid };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deployAppSlice = createSlice({
  name: "deployapp",
  initialState: {
    deploy_result: {},
    deploy_status: "idle",
    process_app: "",
    deploy_error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeployApplciation.pending, (state, action) => {
        state.deploy_status = "loading";
        state.process_app = action.payload.application_Uid;
      })
      .addCase(fetchDeployApplciation.fulfilled, (state, action) => {
        state.deploy_status = "succeeded";
        state.deploy_result = action.payload.result;
        state.process_app = "";
      })
      .addCase(fetchDeployApplciation.rejected, (state, action) => {
        state.deploy_status = "failed";
        state.deploy_error = action.error.message;
      });
  },
});

export default deployAppSlice.reducer;
