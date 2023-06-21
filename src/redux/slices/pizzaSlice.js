/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params, thunkAPI) => {
  const {catgory, sortBy, order, search} = params;
  const { data } = await axios.get(`https://64497c2fb88a78a8f0092e91.mockapi.io/items?${catgory}&sortBy=${sortBy}&order=${order}${search}`,);
  setItems(data)
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading / success / error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    }
    
  }
});


export const selectPizzaData = (state) => (state.pizza)

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;