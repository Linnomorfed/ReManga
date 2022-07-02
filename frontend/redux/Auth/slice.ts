import { createSlice } from '@reduxjs/toolkit';
import { AuthModalState } from './types';

const initialState: AuthModalState = { visible: false };

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    showAuthModal: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { showAuthModal } = authModalSlice.actions;

export const AuthModalReducer = authModalSlice.reducer;
