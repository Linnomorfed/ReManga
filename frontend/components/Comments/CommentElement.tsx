import classNames from 'classnames';
import React from 'react';
import TimeAgo from 'timeago-react';
import { ExclamationSvg, LikeSvg, ReplySvg } from '../../assets/svgs';
import { ResponseUser } from '../../models/IAuth';
import { ResponceCommentItem } from '../../models/IComments';
import { Api } from '../../services/api';
import { ShowMoreButton } from '../UI';
import { UserAvatar } from '../UI/UserAvatar';
import { AddComment } from './AddComment';
import { CommentReply } from './CommentReply';
import styles from './Comments.module.scss';

interface CommentElementProps {
  body: string;
  isSpoiler: boolean;
  isPinned?: boolean;
  votes: number;
  repliesCount: number;
  date: string;
  user: ResponseUser;
  mangaId?: number | null;
  commentId: number;
}

export const CommentElement: React.FC<CommentElementProps> = ({
  body,
  isSpoiler,
  isPinned = false,
  votes,
  user,
  mangaId = null,
  commentId,
  date,
  repliesCount,
}) => {
  const [repliesNumber, setRepliesNumber] = React.useState(repliesCount);
  const [repliesOpened, setRepliesOpened] = React.useState(false);
  const [commentBody, setCommentBody] = React.useState(body);
  const [isReplying, setIsReplying] = React.useState<boolean>(false);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [showSpoiler, setShowSpoiler] = React.useState(false);
  const [replies, setReplies] = React.useState<ResponceCommentItem[]>([]);

  const toogleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const toogleReplying = () => {
    setIsReplying(!isReplying);
  };

  const toogleSpoilerStatus = () => {
    setShowSpoiler(!showSpoiler);
  };

  const updateComments = (comment: ResponceCommentItem) => {
    setReplies((prev) => [...prev, comment]);
    setRepliesNumber((prev) => prev + 1);
  };

  const clearComments = () => {
    setReplies([]);
    setRepliesOpened(false);
  };

  const showReplies = async () => {
    try {
      const replies = await Api().comments.getComments({ replyTo: commentId });
      setReplies(replies.items);
      setRepliesOpened(true);
    } catch (err) {
      console.warn('Replies loading ', err);
    }
  };

  return (
    <div className={`${votes < -5 ? styles.negativeComment : ''}`}>
      <div
        className={classNames(
          styles.commentElement,
          `${isPinned && styles.commentElementFixed}`
        )}>
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
            {isPinned && <ExclamationSvg fill={'white'} w={20} h={20} />}
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
              className={classNames(
                styles.commentBtn,
                styles.commentBtnDislike
              )}>
              <LikeSvg fill={'#fff'} w={18} h={18} />
            </button>

            <button className={styles.commentBtn} onClick={toogleReplying}>
              <ReplySvg fill={'#fff'} w={24} h={24} />
            </button>
            {repliesNumber > 0 && (
              <span
                className={styles.replies}
                onClick={repliesOpened ? clearComments : showReplies}>
                {repliesOpened
                  ? 'hide replies'
                  : `show ${repliesNumber} replies`}
              </span>
            )}
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

          {replies.length > 0 && (
            <div className={styles.replies}>
              {replies.map((obj) => (
                <CommentReply
                  key={obj.id}
                  updateComments={updateComments}
                  body={obj.text}
                  isSpoiler={obj.spoiler}
                  votes={obj.votes}
                  date={obj.createdAt}
                  user={obj.user}
                  mangaId={mangaId}
                  commentId={commentId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
