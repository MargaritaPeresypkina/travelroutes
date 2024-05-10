import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/users");
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  try {
    const res = await axios.post("http://localhost:4000/api/users", userData);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const updateUserDesc = createAsyncThunk(
  "routes/updateUserDesc",

  async ({ id, description }) => {
    console.log("id", id);
    console.log("description", description);

    try {
      await axios.put(`http://localhost:4000/api/users/${id}`, {
        description,
      });
      return { id, description };
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserName = createAsyncThunk(
  "routes/updateUserName",
  async ({ id, name }) => {
    try {
      await axios.put(`http://localhost:4000/api/users/${id}`, {
        name,
      });
      return { id, name };
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserDesc.fulfilled, (state, action) => {
        const { id, description } = action.payload;

        const userToUpdate = state.users.find((user) => user._id === id);

        if (userToUpdate) {
          userToUpdate.description = description;
        }
      })

      .addCase(updateUserName.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const updatedUsers = state.users.map((user) =>
          user._id === id ? { ...user, name } : user
        );
        state.users = updatedUsers;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
