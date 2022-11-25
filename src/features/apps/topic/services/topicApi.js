// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/topics',
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    topics: builder.query({
      query: () => ""
    }),
    getTopicById: builder.query({
      query: (arg) => {
        const { id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/',
          params: { id },
          method: 'GET',
        };
      },
    }),
    addTopic: builder.mutation({
      query: (topic) => ({
        url: "/create.php",
        method: "POST",
        body: topic
      }),
      invalidatesTags: ["Task"]
    }),
    updateTopic: builder.mutation({    // <-- attention here
      query: ({ id, ...rest }) => {
        console.log(123, id, rest);
        return {
          url: `/update.php?id=${id}`,
          method: "POST",
          body: rest
        };
      }
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/delete.php?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Topic"]
    }),
    getTopicsByCategoryId: builder.query({
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

export const { useTopicsQuery, useGetTopicByIdQuery, useAddTopicMutation, useUpdateTopicMutation, useDeleteTopicMutation, useGetTopicsByCategoryIdQuery } = topicApi;
