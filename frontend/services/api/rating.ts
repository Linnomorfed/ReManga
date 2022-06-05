import { AxiosInstance } from 'axios';
import { RatingDto } from '../../models/IRating';

export const RatingApi = (instance: AxiosInstance) => ({
  async rateManga(dto: RatingDto) {
    const { data } = await instance.post<RatingDto>('rating', dto);
    return data;
  },

  async updateRating(id: number, dto: RatingDto) {
    const { data } = await instance.patch(`rating/${id}`, dto);
    return data;
  },
});
