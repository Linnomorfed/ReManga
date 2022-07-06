import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ResponseBookmark } from '../../models/IBookmarks';
import { ResponseManga } from '../../models/IManga';
import { RatingResponse } from '../../models/IRating';
import { MangaDataState } from './types';

const initialState: MangaDataState = {
  mangaBookmarkId: 0,
  bookmark: null,
  ratedByUser: null,
  manga: null,
  chaptersCount: null,
};

export const mangaDataSlice = createSlice({
  name: 'mangaData',
  initialState,
  reducers: {
    setMangaBookmarkId: (state, action: PayloadAction<number>) => {
      state.mangaBookmarkId = action.payload;
    },
    setBookmark: (state, action: PayloadAction<ResponseBookmark>) => {
      state.bookmark = action.payload;
    },
    setRatedByUser: (state, action: PayloadAction<RatingResponse>) => {
      state.ratedByUser = action.payload;
    },
    setMangaData: (state, action: PayloadAction<ResponseManga>) => {
      state.manga = action.payload;
    },
    setChaptersCount: (state, action: PayloadAction<number>) => {
      state.chaptersCount = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.mangaData,
      };
    },
  },
});

export const {
  setMangaBookmarkId,
  setBookmark,
  setRatedByUser,
  setMangaData,
  setChaptersCount,
} = mangaDataSlice.actions;

export const MangaDataReducer = mangaDataSlice.reducer;
