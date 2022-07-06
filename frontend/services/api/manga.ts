import { AxiosInstance } from 'axios';
import {
  CreateMangaDto,
  ResponseSingleManga,
  ResponseManga,
  ResponseMangaData,
  SearchMangaDto,
} from '../../models/IManga';

export const MangaApi = (instance: AxiosInstance) => ({
  async createManga(dto: CreateMangaDto) {
    const { data } = await instance.post<
      CreateMangaDto,
      { data: ResponseManga }
    >('manga', dto);
    return data;
  },

  async getOneById(id: number) {
    const { data } = await instance.get<ResponseSingleManga>(`manga/${id}`);
    return data;
  },

  async getMangaByQuery(query: SearchMangaDto) {
    const { data } = await instance.get<ResponseMangaData>('manga', {
      params: query,
    });
    return data;
  },

  async getNewestPopular() {
    const { data } = await instance.get<ResponseManga[]>(
      'manga/popular/newest'
    );
    return data;
  },

  async getTodayPopular(query?: SearchMangaDto) {
    const { data } = await instance.get<ResponseManga[]>(
      'manga/popular/today',
      {
        params: query,
      }
    );
    return data;
  },

  async getWeekPopular() {
    const { data } = await instance.get<ResponseManga[]>('manga/popular/week');
    return data;
  },

  async getMangaTopByQuery(query?: SearchMangaDto) {
    const { data } = await instance.get<ResponseManga[]>('manga/top', {
      params: query,
    });
    return data;
  },

  async getMangaForPanel(id: number) {
    const { data } = await instance.get<ResponseManga>(`manga/panel/${id}`);
    return data;
  },
});
