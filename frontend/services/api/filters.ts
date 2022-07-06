import { AxiosInstance } from 'axios';
import { ResponseFilter } from '../../models/IFilters';

export const FiltersApi = (instance: AxiosInstance) => ({
  async getTypes() {
    const { data } = await instance.get<ResponseFilter>('filters/types');
    return data;
  },
  async getGenres() {
    const { data } = await instance.get<ResponseFilter>('filters/genres');
    return data;
  },
  async getCategories() {
    const { data } = await instance.get<ResponseFilter>('filters/categories');
    return data;
  },
  async getStatuses() {
    const { data } = await instance.get<ResponseFilter>('filters/statuses');
    return data;
  },
  async getRestrictions() {
    const { data } = await instance.get<ResponseFilter>('filters/restrictions');
    return data;
  },
});
