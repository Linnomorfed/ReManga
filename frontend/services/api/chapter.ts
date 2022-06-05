import { AxiosInstance } from 'axios';

import {
  ChapterResult,
  CreateChapterDto,
  SearchChapterDto,
} from '../../models/IChapter';

export const ChapterApi = (instance: AxiosInstance) => ({
  async createChapter(dto: CreateChapterDto) {
    const { data } = await instance.post<
      CreateChapterDto,
      { data: ChapterResult }
    >('chapters', dto);
    return data;
  },

  async addChapterPages(dto: any) {
    const { data } = await instance.post('pages', dto);
    return data;
  },

  async getChaptersCount(mangaId: number) {
    const { data } = await instance.get<number>('chapters/count', {
      params: { mangaId },
    });
    return data;
  },

  async getMangaChapters(query: SearchChapterDto) {
    const { data } = await instance.get<ChapterResult[]>('chapters', {
      params: { mangaId: query.mangaId, orderBy: query.orderBy },
    });
    return data;
  },
});
