import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ResponseUser } from '../../models/IAuth';
import { UserState } from './types';

const initialState: UserState = { data: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseUser>) => {
      state.data = action.payload;
    },
    clearUserData: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const UserReducer = userSlice.reducer;
