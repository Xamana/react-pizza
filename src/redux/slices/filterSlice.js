import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setActiveSortElement(state, action) {
      state.activeSortElement = action.payload
    },
    setFilters(state, action) {
      state.activeCategory = action.payload.activeCategory
      state.activeSortElement = action.payload.sort
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setActiveCategory, setActiveSortElement, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer