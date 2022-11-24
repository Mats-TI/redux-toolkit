import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    removeCategory(state, action) {
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
    },
    toggleCategory(state, action) {
      const toggleCategoryItem = state.categories.find(
        (category) => category.id === action.payload.id
      );
      toggleCategoryItem.published = !toggleCategoryItem.published;
    },
  },
  extraReducers: (builder) => {
    
  },
});

const { reducer, actions } = categorySlice;

export const { removeCategory, toggleCategory } = actions;

export default reducer;
