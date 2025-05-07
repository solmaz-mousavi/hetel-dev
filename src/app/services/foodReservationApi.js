import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseurl";

export const foodReservationApi = createApi({
  reducerPath: "foodReservationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getFoodReservations: builder.query({
      query: () => "foodReservations",
      providesTags: ["FoodReservations"],
    }),

    addFoodReservation: builder.mutation({
      query: (newItem) => ({
        url: "foodReservations",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["FoodReservations"],
    }),

    deleteFoodReservation: builder.mutation({
      query: (item) => ({
        url: `foodReservations/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodReservations"],
    }),
  }),
});

export const {
  useGetFoodReservationsQuery,
  useAddFoodReservationMutation,
  useDeleteFoodReservationMutation,
} = foodReservationApi;
