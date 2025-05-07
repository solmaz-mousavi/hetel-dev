import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseurl";

export const foodApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "foods",
      providesTags: ["Foods"],
    }),

    addFood: builder.mutation({
      query: (newItem) => ({
        url: "foods",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Foods"],
    }),

    deleteFood: builder.mutation({
      query: (item) => ({
        url: `foods/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),

    editFood: builder.mutation({
      query: (newItem) => ({
        url: `foods/${newItem.id}`,
        method: "PUT",
        body: newItem,
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useAddFoodMutation,
  useDeleteFoodMutation,
  useEditFoodMutation,
} = foodApi;
