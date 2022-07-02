import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ResponceManga } from '../../models/IManga';

const initialState: Record<string, ResponceManga[]> = {
  newestManga: [],
  weekPopular: [],
  todayPopular: [],
  newestPopular: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWeekPopular: (state, action: PayloadAction<ResponceManga[]>) => {
      state.weekPopular = action.payload;
    },
    setTodayPopular: (state, action: PayloadAction<ResponceManga[]>) => {
      state.todayPopular = action.payload;
    },
    setNewestPopular: (state, action: PayloadAction<ResponceManga[]>) => {
      state.newestPopular = action.payload;
    },
    setNewestManga: (state, action: PayloadAction<ResponceManga[]>) => {
      state.newestManga = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE_DASHBOARD', state, action.payload);
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
