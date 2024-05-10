import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllRoutes = createAsyncThunk(
  "routes/getAllRoutes",
  async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/routes"); 
      return res.data; // Возвращаем данные с сервера
    } catch (error) {
      throw error; 
    }
  }
);


// Создаем срез состояния для хранения данных о маршрутах
const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [], 
    loading: false, 
    error: null, 
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      
      .addCase(getAllRoutes.pending, (state) => {
        state.loading = true; 
      })
      .addCase(getAllRoutes.fulfilled, (state, action) => {
        state.loading = false; 
        state.routes = action.payload;
      })
      .addCase(getAllRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
  },
});

export default routesSlice.reducer;
