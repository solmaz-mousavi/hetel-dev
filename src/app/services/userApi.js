import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseurl";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (newItem) => ({
        url: "users",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (item) => ({
        url: `users/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: (newItem) => ({
        url: `users/${newItem.id}`,
        method: "PUT",
        body: newItem,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApi;
