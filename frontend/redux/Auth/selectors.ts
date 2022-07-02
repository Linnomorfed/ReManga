import { RootState } from '../store';

export const selectAuthModalData = (state: RootState) =>
  state.authModal.visible;
