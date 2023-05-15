import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      activeCategory: 0,
      activeSortElement: {name: 'популярности', sort: 'rating'},
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    },
    setActiveSortElement(state, action) {
      state.activeSortElement = action.payload
    },
  },
})

export const { setActiveCategory, setActiveSortElement } = filterSlice.actions;

export default filterSlice.reducer