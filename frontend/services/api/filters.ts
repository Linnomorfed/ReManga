import { AxiosInstance } from 'axios';
import { ResponceFilter } from '../../models/IFilters';

export const FiltersApi = (instance: AxiosInstance) => ({
  async getTypes() {
    const { data } = await instance.get<ResponceFilter>('filters/types');
    return data;
  },
  async getGenres() {
    const { data } = await instance.get<ResponceFilter>('filters/genres');
    return data;
  },
  async getCategories() {
    const { data } = await instance.get<ResponceFilter>('filters/categories');
    return data;
  },
  async getStatuses() {
    const { data } = await instance.get<ResponceFilter>('filters/statuses');
    return data;
  },
  async getRestrictions() {
    const { data } = await instance.get<ResponceFilter>('filters/restrictions');
    return data;
  },
});
