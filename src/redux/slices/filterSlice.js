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
    setFilters(state, action) {
      state.activeCategory = action.payload.activeCategory
      state.activeSortElement = action.payload.sort
    },
  },
})

export const { setActiveCategory, setActiveSortElement, setFilters } = filterSlice.actions;

export default filterSlice.reducer