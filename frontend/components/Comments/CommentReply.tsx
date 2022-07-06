import classNames from 'classnames';
import React from 'react';
import TimeAgo from 'timeago-react';
import { LikeSvg, ReplySvg } from '../../assets/svgs';
import { RatedUserData, ResponseCommentItem } from '../../models/IComments';
import { ResponseUser } from '../../models/IAuth';
import { ShowMoreButton } from '../UI';
import { UserAvatar } from '../UI/UserAvatar';
import { AddComment } from './AddComment';
import styles from './Comments.module.scss';
import { Api } from '../../services/api';
import { useAppSelector } from '../../hooks/redux';
import { selectUserData } from '../../redux/User/selectors';

interface CommentBodyProps {
  body: string;
  isSpoiler: boolean;
  rating: number;
  date: string;
  user: ResponseUser;
  mangaId?: number | null;
  parentCommentId: number;
  commentId: number;
  ratedUserIds: RatedUserData[];
  updateComments?: (comment: ResponseCommentItem) => void;
}

export const CommentReply: React.FC<CommentBodyProps> = ({
  body,
  isSpoiler,
  updateComments,
  rating,
  ratedUserIds,
  user,
  mangaId = null,
  parentCommentId,
  commentId,
  date,
}) => {
  console.log(commentId, 'commentId');

  console.log(rating, 111);
  console.log(ratedUserIds, 2222);

  const userData = useAppSelector(selectUserData);
  const [ratedUsersList, setRatedUsersList] =
    React.useState<RatedUserData[]>(ratedUserIds);
  const [commentRating, setCommentRating] = React.useState<number>(rating);
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

  return (
    <div className={`${commentRating < -5 ? styles.negativeComment : ''}`}>
      <div className={styles.commentElement}>
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
              commentId={parentCommentId}
              replyToName={'@' + user.nickname + ', '}
            />
          )}
        </div>
      </div>
    </div>
  );
};
