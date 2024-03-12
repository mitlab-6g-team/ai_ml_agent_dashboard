import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRemoveApplciation = createAsyncThunk(
  "remove/fetchRemoveApplciation",
  async (application_Uid, { rejectWithValue }) => {
    try {
      console.log(application_Uid);
      const response = await axios.post(
        process.env.REACT_APP_REMOVE_APPLICATION_URL,
        { application_uid: application_Uid.application_Uid }
      );

      return { ...response.data, application_Uid };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || "An unexpected error occurred");
      }
    }
  }
);

export const removeAppSlice = createSlice({
  name: "removeapp",
  initialState: {
    remove_result: {},
    remove_status: "idle",
    remove_app: "",
    remove_error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoveApplciation.pending, (state, action) => {
        state.remove_status = "loading";
        state.remove_app = action.meta.arg.application_Uid;
      })
      .addCase(fetchRemoveApplciation.fulfilled, (state, action) => {
        state.remove_status = "succeeded";
        state.remove_result = action.payload.result;
        state.remove_app = "";
      })
      .addCase(fetchRemoveApplciation.rejected, (state, action) => {
        state.remove_status = "failed";
        state.remove_error = action.error.message;
      });
  },
});

export default removeAppSlice.reducer;
