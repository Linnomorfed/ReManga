import { ResponseCommentItem } from '../../models/IComments';

export interface CommentsState {
  error: string;
  isLoading: boolean;
  pinnedComment: ResponseCommentItem | null;
  comments: ResponseCommentItem[];
  commentsCount: number;
}
