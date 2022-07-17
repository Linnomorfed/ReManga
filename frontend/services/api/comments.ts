import { AxiosInstance } from 'axios';
import {
  CreateCommentDto,
  PinCommentDto,
  ResponseComment,
  ResponseCommentItem,
  SearchCommentDto,
  UpdateCommentDto,
} from '../../models/IComments';

export const CommentsApi = (instance: AxiosInstance) => ({
  async createComment(dto: CreateCommentDto) {
    const { data } = await instance.post<
      CreateCommentDto,
      { data: ResponseCommentItem }
    >('comments', dto);
    return data;
  },

  async getComments(query: SearchCommentDto) {
    const { data } = await instance.get<ResponseComment>('comments', {
      params: query,
    });
    return data;
  },

  async addCommentRate(id: number, dto: UpdateCommentDto) {
    const { data } = await instance.patch<UpdateCommentDto>(
      `comments/rate/add/${id}`,
      dto
    );
    return data;
  },
  async removeCommentRate(id: number, dto: UpdateCommentDto) {
    const { data } = await instance.patch<UpdateCommentDto>(
      `comments/rate/remove/${id}`,
      dto
    );
    return data;
  },
  async updateCommentRate(id: number, dto: UpdateCommentDto) {
    const { data } = await instance.patch<UpdateCommentDto>(
      `comments/rate/update/${id}`,
      dto
    );
    return data;
  },

  async pinComment(dto: PinCommentDto) {
    const { data } = await instance.patch<
      PinCommentDto,
      { data: ResponseCommentItem }
    >('comments/pin', dto);
    return data;
  },

  async unpinComment(id: number) {
    const { data } = await instance.patch(`comments/unpin/${id}`);
    return data;
  },
});
