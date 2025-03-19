import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token) => {
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  }
);

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || "",
    errorMessage: "",
    user: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.errorMessage = "";
    },
    loginFail(state, action) {
      state.errorMessage = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });
  },
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;