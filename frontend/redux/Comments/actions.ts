import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchCommentDto } from '../../models/IComments';
import { Api } from '../../services/api';

export const fetchComments = createAsyncThunk(
  'comments/fetchMangaComments',
  async (dto: SearchCommentDto, thunkApi) => {
    try {
      const res = await Api().comments.getComments(dto);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue('Failed to load comments');
    }
  }
);
