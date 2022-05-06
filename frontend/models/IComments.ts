import { ResponseUser } from './IAuth';

export interface CreateCommentDto {
  text: string;
  spoiler: boolean;
  mangaId: number | null;
  replyTo: number | null;
}

export interface SearchCommentDto {
  mangaId?: number | null;
  replyTo?: number | null;
}

export interface ResponceCommentItem {
  id: number;
  text: string;
  spoiler: boolean;
  user: ResponseUser;
  mangaId: number;
  votes: number;
  replies_count: number;
  replyTo: number | null;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResponceComment {
  items: ResponceCommentItem[];
  count: number;
  pinned: ResponceCommentItem;
}
