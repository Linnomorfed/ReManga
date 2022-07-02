import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, number> = {
  catalogSortBy: 5,
  bookmarksSortBy: 3,
  mangaBookmarkId: 0,
  commentsSortBy: 1,
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
    setCommentsSortBy: (state, action: PayloadAction<number>) => {
      state.commentsSortBy = action.payload;
    },
  },
});

export const {
  setCatalogSortBy,
  setBookmarksSortBy,
  setMangaBookmarkId,
  setCommentsSortBy,
} = SortBySlice.actions;

export const SortByReducer = SortBySlice.reducer;
