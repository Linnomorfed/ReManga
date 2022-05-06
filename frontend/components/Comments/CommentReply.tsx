import classNames from 'classnames';
import React from 'react';
import TimeAgo from 'timeago-react';
import { LikeSvg, ReplySvg } from '../../assets/svgs';
import { ResponceCommentItem } from '../../models/IComments';
import { ResponseUser } from '../../models/IAuth';
import { ShowMoreButton } from '../UI';
import UserAvatar from '../UI/UserAvatar';
import AddComment from './AddComment';
import styles from './Comments.module.scss';

interface CommentBodyProps {
  body: string;
  isSpoiler: boolean;
  votes: number;
  date: string;
  user: ResponseUser;
  mangaId?: number | null;
  commentId: number;
  updateComments?: (comment: ResponceCommentItem) => void;
}

const CommentReply: React.FC<CommentBodyProps> = ({
  body,
  isSpoiler,
  updateComments,
  votes,
  user,
  mangaId = null,
  commentId,
  date,
}) => {
  const [commentBody, setCommentBody] = React.useState(body);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [showSpoiler, setShowSpoiler] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState<boolean>(false);

  const toogleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const toogleReplying = () => {
    setIsReplying(!isReplying);
  };

  const toogleSpoilerStatus = () => {
    setShowSpoiler(!showSpoiler);
  };
  return (
    <div className={classNames(styles.commentElement)}>
      <div className={styles.userAvatarWrapper}>
        <UserAvatar nickname={user.nickname} size='medium' />
      </div>
      <div className={styles.commentRight}>
        <div className={styles.commentTop}>
          <span className={styles.userNickname}>{user.nickname}</span>
          {/* <span className={styles.userRole}>Moderator</span> */}
          <small>
            · <TimeAgo datetime={date} />
          </small>
        </div>

        {isSpoiler ? (
          <>
            {showSpoiler ? (
              <div className={styles.commentBody}>
                <p>{commentBody}</p>
              </div>
            ) : (
              <div className={styles.spoilerWrapper}>
                <p className={styles.spoiler} onClick={toogleSpoilerStatus}>
                  Spoiler
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {commentBody.length >= 200 ? (
              <>
                {isShowMore === false ? (
                  <div className={styles.commentBody}>
                    <p>{commentBody.substring(0, 199)}...</p>
                  </div>
                ) : (
                  <div className={styles.commentBody}>
                    <p>{commentBody}</p>
                  </div>
                )}
                <ShowMoreButton
                  type='comment'
                  isShowMore={isShowMore}
                  onClick={toogleShowMore}
                />
              </>
            ) : (
              <div className={styles.commentBody}>
                <p>{commentBody}</p>
              </div>
            )}
          </>
        )}

        <div className={styles.commentFooter}>
          <button className={styles.commentBtn}>
            <LikeSvg fill={'#fff'} w={18} h={18} />
          </button>
          <span className={styles.likesCount}>{votes}</span>
          <button
            className={classNames(styles.commentBtn, styles.commentBtnDislike)}>
            <LikeSvg fill={'#fff'} w={18} h={18} />
          </button>

          <button className={styles.commentBtn} onClick={toogleReplying}>
            <ReplySvg fill={'#fff'} w={24} h={24} />
          </button>
        </div>
        {isReplying && (
          <AddComment
            updateComments={updateComments}
            mangaId={mangaId}
            hideReply={toogleReplying}
            commentId={commentId}
            replyToName={'@' + user.nickname + ', '}
          />
        )}
      </div>
    </div>
  );
};

export default CommentReply;
