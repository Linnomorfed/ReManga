import { AxiosInstance } from 'axios';
import {
  CreateUserDto,
  LoginDto,
  ResponseUser,
  ResponseUserPage,
} from '../../models/IAuth';

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      'auth/registration',
      dto
    );
    return data;
  },

  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      'auth/login',
      dto
    );
    return data;
  },

  async getCurrentUser() {
    const { data } = await instance.get<ResponseUser>('users/current');
    return data;
  },

  async getUserById(id: number) {
    const { data } = await instance.get<ResponseUserPage>(`users/${id}`);
    return data;
  },
});
