import { RootState } from '../store';

export const selectMangaData = (state: RootState) => state.mangaData;
export const selectMangaTitleForHeader = (state: RootState) =>
  state.mangaData.manga?.title;
