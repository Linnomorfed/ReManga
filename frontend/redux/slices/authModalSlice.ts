import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthModalState {
  visible: boolean;
}

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

export const selectAuthModalData = (state: RootState) =>
  state.authModal.visible;

export const AuthModalReducer = authModalSlice.reducer;
