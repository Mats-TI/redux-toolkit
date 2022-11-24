// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://digitalvarsity.com/api/topics/actions',
    baseUrl: 'http://localhost:8080/api/topics/actions',
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set("Content-Type", "application/json");
    //   return headers;
    // }
  }),
  tagTypes: ['Topic'],
  endpoints: (builder) => ({
    getTopics: builder.mutation({
      query: () => ({
        url: '/read.php',
        method: 'GET',
      }),
      providesTags: [ 'Topic' ]
    }),
    topics: builder.query({
      query: () => '/read.php',
      providesTags: ['Topic']
    }),
    getTopicById: builder.query({
      query: (arg) => {
        const { id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/single_read.php',
          params: { id },
          method: 'GET',
        };
      },
      providesTags: [ 'Topic' ]
    }),
    addTopic: builder.mutation({
      query: (topic) => ({
        url: "/create.php",
        method: "POST",
        body: topic
      }),
      invalidatesTags: ["Topic"]
    }),
    updateTopic: builder.mutation({
      query: topic => ({
        url: `/update.php?id=${topic.id}`,
        method: 'POST',
        body: topic
      }),
      invalidatesTags: ["Topic"]
    }),
    updateTopic2: builder.mutation({    // <-- attention here
      query: ({ topic }) => {
        console.log(topic);
        return {
          // url: `/update.php?id=${id}`,
          url: "/update.php",
          method: 'POST',
          body: topic
        }
      },
      invalidatesTags: ["Topic"]
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
          url: '/read.php',
          params: { category_id },
          method: 'GET',
        };
      },
    }),
    putAddTopics: builder.mutation({
      query: (body) => ({
        url: '/todos/1',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useTopicsQuery, useGetTopicsMutation, useGetTopicByIdQuery, useAddTopicMutation, useUpdateTopicMutation, useDeleteTopicMutation, useGetTopicsByCategoryIdQuery, usePutAddTopicsMutation } = topicApi;
