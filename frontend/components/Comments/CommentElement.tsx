import classNames from 'classnames';
import React from 'react';
import TimeAgo from 'timeago-react';
import {
  ExclamationSvg,
  LikeSvg,
  PushPinSvg,
  ReplySvg,
} from '../../assets/svgs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ResponseUser } from '../../models/IAuth';
import { RatedUserData, ResponseCommentItem } from '../../models/IComments';
import { selectPinnedComment } from '../../redux/Comments/selectors';
import {
  clearPinnedComment,
  setPinnedComment,
} from '../../redux/Comments/slice';
import { selectUserData } from '../../redux/User/selectors';
import { Api } from '../../services/api';
import { ShowMoreButton } from '../../ui-components/ShowMoreButton';
import { UserAvatar } from '../../ui-components/UserAvatar';
import { AddComment } from './AddComment';
import styles from './Comments.module.scss';

interface CommentElementProps {
  body: string;
  isSpoiler: boolean;
  rating: number;
  repliesCount?: number;
  date: string;
  user: ResponseUser;
  mangaId: number;
  commentId: number;
  replyTo: number | null;
  ratedUserIds: RatedUserData[];
  updateCommentsFunc?: (comment: ResponseCommentItem) => void;
}

export const CommentElement: React.FC<CommentElementProps> = ({
  body,
  isSpoiler,
  rating,
  user,
  mangaId,
  commentId,
  date,
  repliesCount,
  ratedUserIds,
  updateCommentsFunc,
  replyTo,
}) => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const pinnedComment = useAppSelector(selectPinnedComment);

  const [commentRating, setCommentRating] = React.useState<number>(rating);
  const [ratedUsersList, setRatedUsersList] =
    React.useState<RatedUserData[]>(ratedUserIds);
  const [repliesNumber, setRepliesNumber] = React.useState(
    repliesCount ? repliesCount : null
  );
  const [repliesOpened, setRepliesOpened] = React.useState(false);
  const [commentBody, setCommentBody] = React.useState(body);
  const [isReplying, setIsReplying] = React.useState<boolean>(false);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [showSpoiler, setShowSpoiler] = React.useState(false);
  const [replies, setReplies] = React.useState<ResponseCommentItem[]>([]);

  const toogleShowMore = React.useCallback(() => {
    setIsShowMore((prev) => !prev);
  }, []);

  const toogleReplying = React.useCallback(() => {
    setIsReplying((prev) => !prev);
  }, []);

  const toogleSpoilerStatus = () => {
    setShowSpoiler(!showSpoiler);
  };

  const updateComments = React.useCallback(
    (comment: ResponseCommentItem) => {
      setReplies((prev) => [...prev, comment]);
      repliesCount && setRepliesNumber(repliesCount + 1);
    },
    [repliesCount]
  );

  const clearComments = () => {
    setReplies([]);
    setRepliesOpened(false);
  };

  const showReplies = async () => {
    try {
      setIsReplying(false);
      const replies = await Api().comments.getComments({ replyTo: commentId });
      setReplies(replies.items);
      setRepliesOpened(true);
    } catch (err) {
      console.warn('Replies loading ', err);
    }
  };

  const rateComment = async (rate: 'like' | 'dislike') => {
    if (userData) {
      try {
        setIsReplying(false);

        const arr = ratedUsersList.filter((obj) => obj.userId !== userData.id);
        setRatedUsersList([...arr, { userId: userData.id, rate }]);

        const result = ratedUsersList.find((obj) => obj.userId === userData.id);
        result
          ? result.rate !== rate
            ? (await Api().comments.updateCommentRate(commentId, { rate }),
              setCommentRating((prev) =>
                rate === 'like' ? prev + 2 : prev - 2
              ))
            : (await Api().comments.removeCommentRate(commentId, { rate }),
              setRatedUsersList(arr),
              setCommentRating((prev) =>
                result.rate === 'like' ? prev - 1 : prev + 1
              ))
          : (await Api().comments.addCommentRate(commentId, { rate }),
            setCommentRating((prev) =>
              rate === 'like' ? prev + 1 : prev - 1
            ));
      } catch (err) {
        console.warn('Rate comment ', err);
      }
    }
  };

  const pinComment = async () => {
    try {
      if (pinnedComment?.id === commentId) {
        await Api().comments.unpinComment(commentId);
        dispatch(clearPinnedComment());
      } else {
        const result = await Api().comments.pinComment({ mangaId, commentId });
        dispatch(clearPinnedComment());
        dispatch(setPinnedComment(result));
      }
    } catch (err) {
      console.warn('Pinning comment ', err);
    }
  };

  return (
    <div className={`${commentRating < -5 ? styles.negativeComment : ''}`}>
      <div
        className={classNames(
          styles.commentElement,
          `${pinnedComment?.id === commentId && styles.commentElementFixed}`
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
            <span
              onClick={pinComment}
              className={classNames(
                styles.pushPin,
                `${
                  pinnedComment?.id === commentId ? styles.pushPinPinned : ''
                }`,
                `${!userData ? styles.pushPinDefault : ''}`
              )}>
              {userData ? (
                user.id === userData.id && replyTo === null ? (
                  pinnedComment?.id === commentId ? (
                    <PushPinSvg w={20} h={20} />
                  ) : (
                    <PushPinSvg w={20} h={20} />
                  )
                ) : (
                  ''
                )
              ) : pinnedComment?.id === commentId ? (
                <ExclamationSvg w={20} h={20} />
              ) : (
                ''
              )}
            </span>
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
            <button
              onClick={() => rateComment('like')}
              className={classNames(
                styles.commentBtn,
                `${
                  ratedUsersList.find(
                    (obj) => obj.userId === userData?.id && obj.rate === 'like'
                  )
                    ? styles.commentBtnUserLiked
                    : ''
                }`
              )}>
              <LikeSvg fill={'#fff'} w={18} h={18} />
            </button>
            <span className={styles.likesCount}>{commentRating}</span>
            <button
              onClick={() => rateComment('dislike')}
              className={classNames(
                styles.commentBtn,
                styles.commentBtnDislike,
                `${
                  ratedUsersList.find(
                    (obj) =>
                      obj.userId === userData?.id && obj.rate === 'dislike'
                  )
                    ? styles.commentBtnUserDisliked
                    : ''
                }`
              )}>
              <LikeSvg w={18} h={18} />
            </button>

            <button className={styles.commentBtn} onClick={toogleReplying}>
              <ReplySvg w={24} h={24} />
            </button>
            {repliesNumber && repliesNumber > 0 && (
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
              updateComments={
                updateCommentsFunc ? updateCommentsFunc : updateComments
              }
              mangaId={mangaId}
              hideReply={toogleReplying}
              commentId={commentId}
              replyToName={'@' + user.nickname + ', '}
            />
          )}

          {replies.length > 0 && (
            <div className={styles.replies}>
              {replies.map((obj) => (
                <CommentElement
                  key={obj.id}
                  updateCommentsFunc={updateComments}
                  body={obj.text}
                  ratedUserIds={obj.rated_userIds}
                  isSpoiler={obj.spoiler}
                  rating={obj.rating}
                  replyTo={obj.replyTo}
                  date={obj.createdAt}
                  user={obj.user}
                  mangaId={mangaId}
                  commentId={obj.replyTo ? obj.replyTo : obj.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
