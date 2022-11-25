import { createSlice } from '@reduxjs/toolkit';
import { topicApi } from '../services/topicApi';

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
  },
  reducers: {
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

  },
});

const { reducer, actions } = topicSlice;

export const { removeTopic, toggleTopic } = actions;

export default reducer;
