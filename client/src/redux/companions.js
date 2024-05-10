import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCompanions = createAsyncThunk(
  "companions/getAllCompanions",
  async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/companions`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);


const companionsSlice = createSlice({
  name: "companions",
  initialState: {
    companions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCompanions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanions.fulfilled, (state, action) => {
        state.loading = false;
        state.companions = action.payload; // Изменяем поле companions, а не routes
      })
      .addCase(getAllCompanions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default companionsSlice.reducer;
