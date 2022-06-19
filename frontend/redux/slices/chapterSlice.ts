import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChapterResult } from '../../models/IChapter';
import { fetchChapters } from '../actions/chapterActions';
import { RootState } from '../store';

export interface ChaptersState {
  isLoading: boolean;
  error: string;
  mangaChapters: ChapterResult[];
  currentChapter: ChapterResult | null;
  nextPageId: number | null;
  prevPageId: number | null;
  activePanelId: number;
}

const initialState: ChaptersState = {
  isLoading: false,
  error: '',
  mangaChapters: [],
  currentChapter: null,
  nextPageId: null,
  prevPageId: null,
  activePanelId: 0,
};

export const chapterSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setCurrentChapter: (state, action: PayloadAction<ChapterResult>) => {
      state.currentChapter = action.payload;
    },
    setNextPageId: (state, action: PayloadAction<number | null>) => {
      state.nextPageId = action.payload;
    },
    setPrevPageId: (state, action: PayloadAction<number | null>) => {
      state.prevPageId = action.payload;
    },
    setActivePanelId: (state, action: PayloadAction<number>) => {
      state.activePanelId = action.payload;
    },
  },
  extraReducers: {
    [fetchChapters.fulfilled.type]: (
      state,
      action: PayloadAction<ChapterResult[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.mangaChapters = action.payload;
    },
    [fetchChapters.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchChapters.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentChapter,
  setNextPageId,
  setPrevPageId,
  setActivePanelId,
} = chapterSlice.actions;

export const selectChaptersData = (state: RootState) => state.chapters;

export const ChapterReducer = chapterSlice.reducer;
