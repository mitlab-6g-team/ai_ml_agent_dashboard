import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// require("dotenv").config();
// 創建異步 thunk 函數
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async () => {
    const response = await axios.post(
      process.env.REACT_APP_LIST_APPLICATION_URL,
      {}
    );
    console.log(response);
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
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        // 假設 response 直接是所需的格式
        state.result.register = action.payload.result.register;
        state.result.unregister = action.payload.result.unregister;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 默認導出 reducer
export default applicationsSlice.reducer;
