import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  console.log("fetching users");

  const response = await axios.get("/api/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user, index) => index !== action.payload
      );
    },
    updateUser: (state, action) => {
      const { index, newData } = action.payload;
      state.users[index] = newData;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
