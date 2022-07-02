import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MangaFiltersState } from './types';

const initialState: MangaFiltersState = {
  mangaType: null,
  mangaGenres: [],
  mangaCategories: [],
  mangaRestriction: null,
  mangaStatus: null,
};

export const MangaFiltersSlice = createSlice({
  name: 'mangaFilters',
  initialState,
  reducers: {
    setMangaType: (state, action: PayloadAction<number>) => {
      state.mangaType = action.payload;
    },
    setMangaGenres: (state, action: PayloadAction<number>) => {
      state.mangaGenres = state.mangaGenres.includes(action.payload)
        ? state.mangaGenres.filter((id) => id !== action.payload)
        : [...state.mangaGenres, action.payload];
    },
    setDefaultGenres: (state, action: PayloadAction<number[]>) => {
      state.mangaGenres = action.payload;
    },
    setMangaCategories: (state, action: PayloadAction<number>) => {
      state.mangaCategories = state.mangaCategories.includes(action.payload)
        ? state.mangaCategories.filter((id) => id !== action.payload)
        : [...state.mangaCategories, action.payload];
    },
    setDefaultCategories: (state, action: PayloadAction<number[]>) => {
      state.mangaCategories = action.payload;
    },
    setMangaRestriction: (state, action: PayloadAction<number>) => {
      state.mangaRestriction = action.payload;
    },
    setMangaStatus: (state, action: PayloadAction<number>) => {
      state.mangaStatus = action.payload;
    },

    resetMangaFilters: (state) => {
      state.mangaType = null;
      state.mangaCategories = [];
      state.mangaGenres = [];
      state.mangaRestriction = null;
      state.mangaStatus = null;
    },
  },
});

export const {
  setMangaType,
  setMangaGenres,
  setDefaultGenres,
  setMangaCategories,
  setDefaultCategories,
  setMangaRestriction,
  setMangaStatus,
  resetMangaFilters,
} = MangaFiltersSlice.actions;

export const MangaFiltersReducer = MangaFiltersSlice.reducer;
