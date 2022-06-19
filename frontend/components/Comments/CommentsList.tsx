import React from 'react';
import { ResponceCommentItem } from '../../models/IComments';
import { BlueBtn, Dropdown } from '../UI';
import CommentElement from './CommentElement';
import styles from './Comments.module.scss';

const sortBy = [
  { id: 1, name: 'Interesting first' },
  { id: 2, name: 'New ones first' },
  { id: 3, name: 'Old ones first' },
];
interface CommentsListProps {
  comments: ResponceCommentItem[];
  pinnedComment: ResponceCommentItem | null;
  commentsCount: number;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  pinnedComment,
  commentsCount,
}) => {
  const [currentSortById, setCurrentSortById] = React.useState<number>(1);

  const toggleId = (id: number[]) => {
    setCurrentSortById(id[0]);
  };

  return (
    <div className={styles.commentsList}>
      {comments.length > 1 && (
        <Dropdown
          type='sortBy'
          title='New one first'
          items={sortBy}
          selected={currentSortById}
          returnId={toggleId}
        />
      )}

      {pinnedComment && (
        <CommentElement
          isSpoiler={false}
          votes={pinnedComment.votes}
          user={pinnedComment.user}
          repliesCount={pinnedComment.replies_count}
          body={pinnedComment.text}
          date={pinnedComment.createdAt}
          commentId={pinnedComment.id}
          mangaId={pinnedComment.mangaId}
          isPinned={true}
        />
      )}

      {comments.map((obj) => (
        <CommentElement
          key={obj.id}
          repliesCount={obj.replies_count}
          isSpoiler={obj.spoiler}
          votes={obj.votes}
          user={obj.user}
          body={obj.text}
          mangaId={obj.mangaId}
          commentId={obj.id}
          date={obj.createdAt}
        />
      ))}

      {commentsCount > 20 && <BlueBtn size='sm'>Show Next Comments</BlueBtn>}
    </div>
  );
};

export default CommentsList;
