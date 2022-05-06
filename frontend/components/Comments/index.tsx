import React from 'react';
import { ResponceCommentItem } from '../../models/IComments';
import { Api } from '../../services/api';
import AddComment from './AddComment';
import styles from './Comments.module.scss';
import CommentsList from './CommentsList';

interface CommentsProps {
  mangaId: number;
}

const Comments: React.FC<CommentsProps> = ({ mangaId }) => {
  const [comments, setComments] = React.useState<ResponceCommentItem[]>([]);
  const [pinnedComment, setPinnedComment] =
    React.useState<ResponceCommentItem | null>(null);
  const [commentsCount, setCommentsCount] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      try {
        const comments = await Api().comments.getComments({
          mangaId,
        });
        setComments(comments.items);
        setCommentsCount(comments.count);
        setPinnedComment(comments.pinned);
      } catch (err) {
        console.warn('Fetch comments', err);
      }
    })();
  }, []);

  const updateComments = (obj: ResponceCommentItem) => {
    setComments((prev) => [obj, ...prev]);
    setCommentsCount((prev) => prev + 1);
  };

  return (
    <div className={styles.comments}>
      <h4 className={styles.commentsCount}>
        Comments {commentsCount > 0 && '(' + commentsCount + ')'}
      </h4>
      <AddComment mangaId={mangaId} updateComments={updateComments} />
      <CommentsList comments={comments} pinnedComment={pinnedComment} />
    </div>
  );
};

export default Comments;
