import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/categories/actions',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    categories: builder.query({
        query: () => '/read.php',
        providesTags: ['Category']
    }),
    getCategoryById: builder.query({
      query: (arg) => {
        const { id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/single_read.php',
          params: { id },
          method: 'GET',
        };
      },
      providesTags: [ 'Category' ]
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/create.php",
        method: "POST",
        body: category
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation({
      query: category => ({
        url: `/update.php?id=${category.id}`,
        method: 'POST',
        body: category
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete.php?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    }),
    getCategoriesByCategoryId: builder.query({
      query: (arg) => {
        const { category_id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/read.php',
          params: { category_id },
          method: 'GET',
        };
      },
    }),
    putAddCategories: builder.mutation({
      query: (body) => ({
        url: '/todos/1',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useCategoriesQuery, useGetCategoryByIdQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesByCategoryIdQuery, usePutAddCategoriesMutation } = categoryApi;
