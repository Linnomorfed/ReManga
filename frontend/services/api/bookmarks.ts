import { AxiosInstance } from 'axios';
import {
  CreateBookmarkDto,
  ResponseBookmark,
  SearchBookmarkDto,
  UpdateBookmarkDto,
} from '../../models/IBookmarks';

export const BookmarksApi = (instance: AxiosInstance) => ({
  async createBookmark(dto: CreateBookmarkDto) {
    const { data } = await instance.post('bookmarks', dto);
    return data;
  },

  async getBookmarksByQuery(query: SearchBookmarkDto) {
    const { data } = await instance.get<ResponseBookmark[]>('bookmarks', {
      params: query,
    });
    return data;
  },
  async updateBookmark(id: number, dto: UpdateBookmarkDto) {
    const { data } = await instance.patch<UpdateBookmarkDto>(
      `bookmarks/${id}`,
      dto
    );
    return data;
  },
});
