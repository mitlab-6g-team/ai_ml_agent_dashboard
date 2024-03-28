import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "login/userLogin",
  async ({ roleName, password, rememberMe }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (roleName === "test" && password === "test12345") {
      return {
        isLoggedIn: true,
        role: "Application Business Manager",
        rememberMe,
      };
    } else if (roleName === "mitlab" && password === "mitlab12345") {
      return { isLoggedIn: true, role: "Inference Host Manager", rememberMe };
    } else {
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  isLoggedIn: false,
  role: "",
  status: "idle",
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
        if (action.payload.rememberMe) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", action.payload.role);
        }
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
