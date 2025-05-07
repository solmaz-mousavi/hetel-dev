import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseurl";

export const roomReservationApi = createApi({
  reducerPath: "roomReservationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getRoomReservations: builder.query({
      query: () => "roomReservations",
      providesTags: ["RoomReservations"],
    }),

    addRoomReservation: builder.mutation({
      query: (newItem) => ({
        url: "roomReservations",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["RoomReservations"],
    }),

    deleteRoomReservation: builder.mutation({
      query: (item) => ({
        url: `roomReservations/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomReservations"],
    }),
  }),
});

export const {
  useGetRoomReservationsQuery,
  useAddRoomReservationMutation,
  useDeleteRoomReservationMutation,
} = roomReservationApi;
