import { AxiosInstance } from 'axios';

import {
  ChapterPageResult,
  ChapterResult,
  CreateChapterDto,
  CreateChapterLikeDto,
  NewestChapteResult,
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

  async addChapterPages(dto: FormData) {
    const { data } = await instance.post('pages', dto);
    return data;
  },

  async likeTheChapter(dto: CreateChapterLikeDto) {
    const { data } = await instance.post<CreateChapterLikeDto>('likes', dto);
    return data;
  },

  async getNewestChapters() {
    const { data } = await instance.get<NewestChapteResult[]>(
      'chapters/newest'
    );
    return data;
  },

  async getCertainChapter(id: number) {
    const { data } = await instance.get<ChapterPageResult>(`chapters/${id}`);
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
