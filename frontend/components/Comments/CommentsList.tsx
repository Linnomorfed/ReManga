import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import {
  selectCommentsData,
  selectPinnedComment,
} from '../../redux/Comments/selectors';
import { selectSortByData } from '../../redux/SortBy/selectors';
import { setCommentsSortBy } from '../../redux/SortBy/slice';
import { CommentsSortBy } from '../../utils/static/CommentsSortBy';
import { BlueBtn, SingleDropdown } from '../../ui-components';
import { CommentElement } from './CommentElement';
import styles from './Comments.module.scss';

export const CommentsList: React.FC = () => {
  const { commentsSortBy } = useAppSelector(selectSortByData);
  const pinnedComment = useAppSelector(selectPinnedComment);

  const { comments, commentsCount } = useAppSelector(selectCommentsData);

  return (
    <div className={styles.commentsList}>
      {comments.length > 1 && (
        <SingleDropdown
          variant='sortBy'
          items={CommentsSortBy}
          state={commentsSortBy}
          action={setCommentsSortBy}
        />
      )}
      {pinnedComment && (
        <CommentElement
          isSpoiler={false}
          rating={pinnedComment.rating}
          user={pinnedComment.user}
          repliesCount={pinnedComment.replies_count}
          body={pinnedComment.text}
          replyTo={pinnedComment.replyTo}
          date={pinnedComment.createdAt}
          commentId={pinnedComment.id}
          ratedUserIds={pinnedComment.rated_userIds}
          mangaId={pinnedComment.mangaId}
        />
      )}
      {comments &&
        comments.map((obj) => (
          <CommentElement
            key={obj.id}
            repliesCount={obj.replies_count}
            isSpoiler={obj.spoiler}
            rating={obj.rating}
            replyTo={obj.replyTo}
            user={obj.user}
            body={obj.text}
            mangaId={obj.mangaId}
            ratedUserIds={obj.rated_userIds}
            commentId={obj.id}
            date={obj.createdAt}
          />
        ))}
      {commentsCount > 20 && <BlueBtn size='sm'>Show Next Comments</BlueBtn>}
    </div>
  );
};
