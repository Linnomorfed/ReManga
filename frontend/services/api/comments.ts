import { AxiosInstance } from 'axios';
import {
  CreateCommentDto,
  ResponceComment,
  ResponceCommentItem,
  SearchCommentDto,
} from '../../models/IComments';

export const CommentsApi = (instance: AxiosInstance) => ({
  async createComment(dto: CreateCommentDto) {
    const { data } = await instance.post<
      CreateCommentDto,
      { data: ResponceCommentItem }
    >('comments', dto);
    return data;
  },

  async getComments(query: SearchCommentDto) {
    const { data } = await instance.get<ResponceComment>('comments', {
      params: query,
    });
    return data;
  },
});
