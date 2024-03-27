// src/features/login/loginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 模擬 API 請求
export const login = createAsyncThunk(
  "login/userLogin",
  async ({ roleName, password }, { rejectWithValue }) => {
    // 模擬 API 請求的等待
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 這裡模擬 API 響應
    if (roleName === "test" && password === "test12345") {
      return { isLoggedIn: true, role: "Application Business Manager" };
    } else if (roleName === "mitlab" && password === "mitlab12345") {
      return { isLoggedIn: true, role: "Inference Host Manager" };
    } else {
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  isLoggedIn: false,
  role: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.role = action.payload.role;
        state.status = "succeeded";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
