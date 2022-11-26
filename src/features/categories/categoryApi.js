// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/categories',
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => '/',
    }),
    addCategory: builder.mutation({
      query: (topic) => ({
        url: "/create",
        method: "POST",
        body: topic
      }),
      invalidatesTags: ["Task"]
    }),
    updateCategory: builder.mutation({    // <-- attention here
      query: ({ id, ...rest }) => {
        console.log(123, id, rest);
        return {
          url: `/update?id=${id}`,
          method: "POST",
          body: rest
        };
      }
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    }),
    getCategoriesByCategoryId: builder.query({
      query: (arg) => {
        const { category_id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/',
          params: { category_id },
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useCategoriesQuery } = categoryApi;
