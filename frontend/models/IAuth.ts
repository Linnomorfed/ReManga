import { ResponseBookmark } from './IBookmarks';

export interface RecoveryDto {
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface ResponseUser {
  createdAt: string;
  left_comments: number;
  email: string;
  id: number;
  nickname: string;
  updatedAt: string;
  access_token: string;
}

export interface ResponseUserPage {
  data: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}
