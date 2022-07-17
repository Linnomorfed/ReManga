import { RootState } from '../store';

export const selectCommentsData = (state: RootState) => state.comments;

export const selectPinnedComment = (state: RootState) =>
  state.comments.pinnedComment;
