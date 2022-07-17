import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseComment, ResponseCommentItem } from '../../models/IComments';
import { fetchComments } from './actions';
import { CommentsState } from './types';

const initialState: CommentsState = {
  isLoading: false,
  error: '',
  pinnedComment: null,
  comments: [],
  commentsCount: 0,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<ResponseCommentItem[]>) => {
      state.comments = action.payload;
    },
    setPinnedComment: (state, action: PayloadAction<ResponseCommentItem>) => {
      state.pinnedComment = action.payload;
      state.comments = state.comments.filter(
        (obj) => obj.id !== action.payload.id
      );
    },

    updateStateComments: (
      state,
      action: PayloadAction<ResponseCommentItem>
    ) => {
      state.comments = [action.payload, ...state.comments];
    },
    setCommentsCount: (state, action: PayloadAction<number>) => {
      state.commentsCount = action.payload;
    },
    clearPinnedComment: (state) => {
      state.comments = state.pinnedComment
        ? [state.pinnedComment, ...state.comments]
        : state.comments;
      state.pinnedComment = null;
    },
  },
  extraReducers: {
    [fetchComments.fulfilled.type]: (
      state,
      action: PayloadAction<ResponseComment>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.comments = action.payload.items;
      state.commentsCount = action.payload.count;
      state.pinnedComment = action.payload.pinned;
    },
    [fetchComments.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setComments,
  updateStateComments,
  setCommentsCount,
  setPinnedComment,
  clearPinnedComment,
} = commentsSlice.actions;

export const CommentsReducer = commentsSlice.reducer;
