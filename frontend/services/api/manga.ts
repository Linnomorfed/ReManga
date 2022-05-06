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
});
