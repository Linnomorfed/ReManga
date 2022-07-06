import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ResponseManga } from '../../models/IManga';

const initialState: Record<string, ResponseManga[]> = {
  newestManga: [],
  weekPopular: [],
  todayPopular: [],
  newestPopular: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWeekPopular: (state, action: PayloadAction<ResponseManga[]>) => {
      state.weekPopular = action.payload;
    },
    setTodayPopular: (state, action: PayloadAction<ResponseManga[]>) => {
      state.todayPopular = action.payload;
    },
    setNewestPopular: (state, action: PayloadAction<ResponseManga[]>) => {
      state.newestPopular = action.payload;
    },
    setNewestManga: (state, action: PayloadAction<ResponseManga[]>) => {
      state.newestManga = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.dashboard,
      };
    },
  },
});

export const {
  setWeekPopular,
  setTodayPopular,
  setNewestPopular,
  setNewestManga,
} = dashboardSlice.actions;

export const DashboardReducer = dashboardSlice.reducer;
