import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: Record<string, number> = {
  catalogSortBy: 5,
  bookmarksSortBy: 3,
  mangaBookmarkId: 0,
};

export const SortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setCatalogSortBy: (state, action: PayloadAction<number>) => {
      state.catalogSortBy = action.payload;
    },
    setBookmarksSortBy: (state, action: PayloadAction<number>) => {
      state.bookmarksSortBy = action.payload;
    },
    setMangaBookmarkId: (state, action: PayloadAction<number>) => {
      state.mangaBookmarkId = action.payload;
    },
  },
});

export const { setCatalogSortBy, setBookmarksSortBy, setMangaBookmarkId } =
  SortBySlice.actions;

export const selectSortByData = (state: RootState) => state.sortBy;

export const SortByReducer = SortBySlice.reducer;
