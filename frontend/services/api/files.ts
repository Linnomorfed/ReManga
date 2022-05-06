import { AxiosInstance } from 'axios';

export const FilesApi = (instance: AxiosInstance) => ({
  async addImage(dto: any) {
    const { data } = await instance.post('manga/image', dto);
    return data;
  },

  async addChapter(dto: any) {
    const { data } = await instance.post('files/chapter', dto);
    return data;
  },
});
