import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchChapterDto } from '../../models/IChapter';
import { Api } from '../../services/api';

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAllByManga',
  async (query: SearchChapterDto, thunkApi) => {
    try {
      const res = await Api().chapter.getMangaChapters(query);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue('Failed to load chapters');
    }
  }
);
