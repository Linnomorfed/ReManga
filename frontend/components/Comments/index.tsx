import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchComments } from '../../redux/Comments/actions';
import { selectCommentsData } from '../../redux/Comments/selectors';
import { CommentLoader } from '../../ui-components';
import { AddComment } from './AddComment';
import styles from './Comments.module.scss';
import { CommentsList } from './CommentsList';

interface CommentsProps {
  mangaId: number;
  chapterId?: number;
}

export const Comments: React.FC<CommentsProps> = ({
  mangaId,
  chapterId = null,
}) => {
  const dispatch = useAppDispatch();
  const { error, isLoading, comments, commentsCount } =
    useAppSelector(selectCommentsData);

  React.useEffect(() => {
    dispatch(fetchComments({ mangaId, chapterId }));
  }, [chapterId, mangaId]);

  return (
    <div className={styles.comments}>
      <h4 className={styles.commentsCount}>
        Comments {commentsCount > 0 && '(' + commentsCount + ')'}
      </h4>
      <AddComment chapterId={chapterId} mangaId={mangaId} />
      {isLoading ? (
        Array.from(Array(3), (_, i) => <CommentLoader key={i} />)
      ) : (
        <CommentsList />
      )}
    </div>
  );
};
