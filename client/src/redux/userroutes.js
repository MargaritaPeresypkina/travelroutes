import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUserRoutes = createAsyncThunk(
  "userroutes/getAllUserRoutes",
  async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/userroutes`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRouteIsUserroute = createAsyncThunk(
  "userroutes/updateRouteIsUserRoute",
  async ({ userRouteId, isUserRoute }) => {
    console.log("id", userRouteId);
    console.log("isUserRoute", isUserRoute);
    try {
      // Отправляем запрос на обновление isUserRoute на сервер
      await axios.put(`http://localhost:4000/api/userroutes/${userRouteId}`, {
        isUserRoute,
      });
      return { userRouteId, isUserRoute };
    } catch (error) {
      throw error;
    }
  }
);
export const inviteUserRoutes = createAsyncThunk(
  "userroutes/inviteUserRoutes",
  async ({ routeIds, userId }) => {
    try {
      const promises = routeIds.map(async (routeId) => {
        const res = await axios.post(`http://localhost:4000/api/userroutes`, {
          userId,
          isUserRoute: false,
          routeId // Передаем каждый routeId
        });
        return res.data;
      });
      
      // Дожидаемся завершения всех запросов
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw error;
    }
  }
);



const userRouteSlice = createSlice({
  name: "userRoutes",
  initialState: {
    userroutes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateRouteIsUserroute.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRouteIsUserroute.fulfilled, (state, action) => {
        const { id, isUserRoute } = action.payload;
        const updatedRoutes = state.userroutes.map((route) =>
          route._id === id ? { ...route, isUserRoute } : route
        );
        state.userroutes = updatedRoutes;
      })
      .addCase(updateRouteIsUserroute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUserRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.userroutes = action.payload;
      })
      .addCase(inviteUserRoutes.fulfilled, (state, action) => {
        state.loading = false;
        // Добавляем новую строку companionroutes в состояние
        state.userroutes.push(action.payload);
      })
      .addCase(getAllUserRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userRouteSlice.reducer;
