import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: Record<string, number[]> = {
  types: [],
  genres: [],
  categories: [],
  restrictions: [],
  statuses: [],
  excludedTypes: [],
  excludedGenres: [],
  excludedCategories: [],
};

export const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<number>) => {
      state.types = state.types.includes(action.payload)
        ? state.types.filter((id) => id !== action.payload)
        : [...state.types, action.payload];
    },
    setGenres: (state, action: PayloadAction<number>) => {
      state.genres = state.genres.includes(action.payload)
        ? state.genres.filter((id) => id !== action.payload)
        : [...state.genres, action.payload];
    },
    setCategories: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.includes(action.payload)
        ? state.categories.filter((id) => id !== action.payload)
        : [...state.categories, action.payload];
    },
    setRestrictions: (state, action: PayloadAction<number>) => {
      state.restrictions = state.restrictions.includes(action.payload)
        ? state.restrictions.filter((id) => id !== action.payload)
        : [...state.restrictions, action.payload];
    },
    setStatuses: (state, action: PayloadAction<number>) => {
      state.statuses = state.statuses.includes(action.payload)
        ? state.statuses.filter((id) => id !== action.payload)
        : [...state.statuses, action.payload];
    },
    setExcludedTypes: (state, action: PayloadAction<number>) => {
      state.excludedTypes = state.excludedTypes.includes(action.payload)
        ? state.excludedTypes.filter((id) => id !== action.payload)
        : [...state.excludedTypes, action.payload];
    },
    setExcludedGenres: (state, action: PayloadAction<number>) => {
      state.excludedGenres = state.excludedGenres.includes(action.payload)
        ? state.excludedGenres.filter((id) => id !== action.payload)
        : [...state.excludedGenres, action.payload];
    },
    setExcludedCategories: (state, action: PayloadAction<number>) => {
      state.excludedCategories = state.excludedCategories.includes(
        action.payload
      )
        ? state.excludedCategories.filter((id) => id !== action.payload)
        : [...state.excludedCategories, action.payload];
    },
    resetFilters: (state) => {
      state.types = [];
      state.categories = [];
      state.genres = [];
      state.restrictions = [];
      state.statuses = [];
      state.excludedCategories = [];
      state.excludedGenres = [];
      state.excludedTypes = [];
    },
  },
});

export const {
  setTypes,
  setGenres,
  setCategories,
  setRestrictions,
  setStatuses,
  setExcludedTypes,
  setExcludedGenres,
  setExcludedCategories,
  resetFilters,
} = FiltersSlice.actions;

export const selectFiltersData = (state: RootState) => state.filters;

export const FiltersReducer = FiltersSlice.reducer;
