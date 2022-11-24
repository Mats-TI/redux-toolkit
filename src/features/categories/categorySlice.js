import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryApiService from "../../../Service/categoryService";

const initialState = [];

export const getCategories = createAsyncThunk("categories/get", async () => {
  const res = await CategoryApiService.getAll();
  return res.data;
});

export const createCategory = createAsyncThunk(
  "categories/create",
  async ({ title, description }) => {
    const res = await CategoryApiService.create({ title, description });
    return res.data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }) => {
    const res = await CategoryApiService.update(id, data);
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async ({ id }) => {
    await CategoryApiService.remove(id);
    return { id };
  }
);

export const deleteAllCategories = createAsyncThunk(
  "categories/deleteAll",
  async () => {
    const res = await CategoryApiService.removeAll();
    return res.data;
  }
);

export const findCategoriesByTitle = createAsyncThunk(
  "categories/findByTitle",
  async ({ title }) => {
    const res = await CategoryApiService.findByTitle(title);
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [createCategory.fulfilled]: (state, action) => {
      state.push(action.payload);
    },

    [getCategories.fulfilled]: (state, action) => {
      return [...action.payload];
    },

    [updateCategory.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },

    [deleteCategory.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },

    [deleteAllCategories.fulfilled]: (state, action) => {
      return [];
    },

    [findCategoriesByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = categorySlice;
export default reducer;
