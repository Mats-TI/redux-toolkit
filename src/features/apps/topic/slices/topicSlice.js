import { createSlice } from '@reduxjs/toolkit';
import { topicApi } from '../services/topicApi';

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
    currentPage: 1,
    itemsPerPage: 9,
    totalResults: 0,
  },
  reducers: {
    setNextPage(state, { payload }) {
      state.currentPage = payload;
    },
    getMultiple(state, action) {
      state.topics = action.payload;
    },
    removeTopic(state, action) {
      state.topics = state.topics.filter((topic) => topic.id !== action.payload.id);
    },
    toggleTopic(state, action) {
      const toggleTopicItem = state.topics.find(
        (topic) => topic.id === action.payload.id
      );
      toggleTopicItem.published = !toggleTopicItem.published;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   topicApi.endpoints.getMultiple.matchFulfilled,
    //   (state, action) => {
    //     state.topics = action.payload.data;
    //     state.isFetching = false;
    //     state.totalResults = action.payload.totalResults;
    //   }
    // );
    
  },
});

const { reducer, actions } = topicSlice;

export const { removeTopic, toggleTopic, getMultiple } = actions;

export default reducer;
