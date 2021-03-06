import { ResponseBookmark } from './IBookmarks';

export interface RecoveryDto {
	email: string;
}

export interface LoginDto extends RecoveryDto {
	password: string;
}

export interface CreateUserDto extends LoginDto {
	nickname: string;
	passwordConfirm?: string;
}

export interface UpdateUserDto {
	nickname: string;
}

export interface ResponseUser {
	createdAt: string;
	left_comments: number;
	email: string;
	id: number;
	nickname: string;
	updatedAt: string;
	liked_chapters: number;
	isEmailConfirmed: boolean;
	access_token: string;
}

export interface ResponseUserPage {
	data: ResponseUser;
	preloadedData: ResponseBookmark[];
	bookmarksCount: number[];
}

export enum formTypeEnum {
	'login',
	'registration',
	'recovery',
}
