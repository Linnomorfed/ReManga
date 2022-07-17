import { ResponseUser } from './IAuth';

export interface CreateCommentDto {
  text: string;
  spoiler: boolean;
  mangaId: number | null;
  replyTo: number | null;
  chapterId: number | null;
}

export interface UpdateCommentDto {
  rate?: 'like' | 'dislike';
}

export interface SearchCommentDto {
  mangaId?: number | null;
  replyTo?: number | null;
  chapterId?: number | null;
}

export interface PinCommentDto {
  mangaId: number;
  commentId: number;
}

export interface RatedUserData {
  userId: number;
  rate: 'like' | 'dislike';
}

export interface ResponseCommentItem {
  id: number;
  text: string;
  spoiler: boolean;
  user: ResponseUser;
  mangaId: number;
  rating: number;
  pinned: number | null;
  replies_count: number;
  replyTo: number | null;
  createdAt: string;
  updatedAt: string;
  rated_userIds: RatedUserData[];
}

export interface ResponseComment {
  items: ResponseCommentItem[];
  count: number;
  pinned: ResponseCommentItem;
}
