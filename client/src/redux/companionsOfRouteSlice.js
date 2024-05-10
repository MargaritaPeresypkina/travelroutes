import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanionsOfRoute = createAsyncThunk(
  "companionsOfRoute/getCompanionsOfRoute",
  async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/companionroutes`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const cancelCompanion = createAsyncThunk(
  "companionsOfRoute/cancelCompanion",
  async (companionRouteId) => {
    try {
      await axios.delete(`http://localhost:4000/api/companionroutes/${companionRouteId}`);
      return companionRouteId;
    } catch (error) {
      throw error;
    }
  }
);

export const inviteCompanion = createAsyncThunk(
  "companionsOfRoute/inviteCompanion",
  async ({ routeId, companionId, userId }) => {
    try {
      // Генерация случайного значения для isAgreeToTravel
      const isAgreeToTravel = Math.random() < 0.5; // 50% вероятность 

      if (!isAgreeToTravel) {
        alert("Пользователь отклонил приглашение");
        return {}; // Возвращаем объект, указывающий на отклонение приглашения
      }

      const res = await axios.post(`http://localhost:4000/api/companionroutes`, {
        routeId,
        companionId,
        userId,
        isAgreeToTravel
      });
      return res.data; 
    } catch (error) {
      throw error;
    }
  }
);


const companionsOfRouteSlice = createSlice({
  name: "companionsOfRoute",
  initialState: {
    companionsOfRoute: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCompanionsOfRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanionsOfRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.companionsOfRoute = action.payload;
      })
      .addCase(getCompanionsOfRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelCompanion.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelCompanion.fulfilled, (state, action) => {
        state.loading = false;
        // Удаление companionRoute из состояния по его id
        state.companionsOfRoute = state.companionsOfRoute.filter(
          (compRoute) => compRoute._id !== action.payload
        )
      })
      .addCase(cancelCompanion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(inviteCompanion.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем новую строку companionroutes в состояние
        state.companionsOfRoute.push(action.payload);
      })
  },
});

export default companionsOfRouteSlice.reducer;
