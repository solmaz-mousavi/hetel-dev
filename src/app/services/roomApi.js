import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseurl";

export const roomApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "rooms",
      providesTags: ["Rooms"],
    }),

    addRoom: builder.mutation({
      query: (newItem) => ({
        url: "rooms",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (item) => ({
        url: `rooms/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),

    editRoom: builder.mutation({
      query: (newItem) => ({
        url: `rooms/${newItem.id}`,
        method: "PUT",
        body: newItem,
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
  useEditRoomMutation,
} = roomApi;
