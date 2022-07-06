import { AxiosInstance } from 'axios';
import {
  CreateCommentDto,
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
});
