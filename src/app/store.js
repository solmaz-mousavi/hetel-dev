import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { roomApi } from "./services/roomApi";
import { roomReservationApi } from "./services/roomReservationApi";
import { foodApi } from "./services/foodApi";
import { foodReservationApi } from "./services/foodReservationApi";

const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomReservationApi.reducerPath]: roomReservationApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [foodReservationApi.reducerPath]: foodReservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      userApi.middleware,
      roomReservationApi.middleware,
      foodApi.middleware,
      foodReservationApi.middleware
    ),
});
export default store;
