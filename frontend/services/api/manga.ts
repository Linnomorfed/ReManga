import { AxiosInstance } from 'axios';
import {
  CreateMangaDto,
  ResponceSingleManga,
  ResponceManga,
  ResponceMangaData,
  SearchMangaDto,
} from '../../models/IManga';

export const MangaApi = (instance: AxiosInstance) => ({
  async createManga(dto: CreateMangaDto) {
    const { data } = await instance.post<
      CreateMangaDto,
      { data: ResponceManga }
    >('manga', dto);
    return data;
  },

  async getOneById(id: number) {
    const { data } = await instance.get<ResponceSingleManga>(`manga/${id}`);
    return data;
  },

  async getMangaByQuery(query: SearchMangaDto) {
    const { data } = await instance.get<ResponceMangaData>('manga', {
      params: query,
    });
    return data;
  },

  async getNewestPopular() {
    const { data } = await instance.get<ResponceManga[]>(
      'manga/popular/newest'
    );
    return data;
  },

  async getTodayPopular(query?: SearchMangaDto) {
    const { data } = await instance.get<ResponceManga[]>(
      'manga/popular/today',
      {
        params: query,
      }
    );
    return data;
  },

  async getWeekPopular() {
    const { data } = await instance.get<ResponceManga[]>('manga/popular/week');
    return data;
  },

  async getMangaTopByQuery(query?: SearchMangaDto) {
    const { data } = await instance.get<ResponceManga[]>('manga/top', {
      params: query,
    });
    return data;
  },

  async getMangaForPanel(id: number) {
    const { data } = await instance.get<ResponceManga>(`manga/panel/${id}`);
    return data;
  },
});
