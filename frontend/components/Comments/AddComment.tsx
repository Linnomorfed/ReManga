import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useAutoFocus from '../../hooks/useAutoFocus';
import { useEvent } from '../../hooks/useEvent';
import { ResponseCommentItem } from '../../models/IComments';
import { selectCommentsData } from '../../redux/Comments/selectors';
import {
  updateStateComments,
  setCommentsCount,
} from '../../redux/Comments/slice';
import { Api } from '../../services/api';
import { BlueBtn, Switch } from '../../ui-components';
import styles from './Comments.module.scss';

interface AddCommentProps {
  mangaId?: number | null;
  chapterId?: number | null;
  commentId?: number | null;
  hideReply?: () => void;
  updateComments?: (comment: ResponseCommentItem) => void;
  replyToName?: string;
}

export const AddComment: React.FC<AddCommentProps> = ({
  mangaId = null,
  commentId = null,
  chapterId = null,
  hideReply,
  updateComments,
  replyToName = '',
}) => {
  const replyInput = useAutoFocus();
  const dispatch = useAppDispatch();
  const { commentsCount } = useAppSelector(selectCommentsData);

  const [text, setText] = React.useState<string>('');
  const [isSpoiler, setIsSpoiler] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const limitHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const setStateComments = (comment: ResponseCommentItem) => {
    dispatch(updateStateComments(comment));
    dispatch(setCommentsCount(commentsCount + 1));
  };

  const toogleSwitch = React.useCallback(() => {
    setIsSpoiler(!isSpoiler);
  }, [isSpoiler]);

  const cancelAction = React.useCallback(() => {
    commentId ? hideReply && hideReply() : setText('');
  }, [commentId, hideReply]);

  const onAddComment = useEvent(async () => {
    try {
      setIsLoading(true);
      const comment = await Api().comments.createComment({
        text: replyToName + text,
        spoiler: isSpoiler,
        mangaId,
        replyTo: commentId,
        chapterId,
      });

      updateComments ? updateComments(comment) : setStateComments(comment);
    } catch (err) {
      console.warn('Creating comment ', err);
    } finally {
      setIsLoading(false);
      setText('');
      setIsSpoiler(false);
      hideReply && hideReply();
    }
  });

  return (
    <div
      className={classNames(
        styles.commentsTop,
        `${commentId && styles.commentsTopReply}`
      )}>
      <div className={styles.textareaContainer}>
        <div className={styles.textareaWrapper}>
          {replyToName && (
            <label
              className={classNames(
                styles.replyLabel,
                `${text.length > 0 ? styles.replyLabelLenghtCheck : ''}`
              )}>
              {replyToName}
            </label>
          )}
          <textarea
            className={classNames(
              styles.textarea,
              `${text.length > 75 ? styles.textareaXs : ''}`,
              `${text.length > 220 ? styles.textareaSm : ''}`
            )}
            onChange={limitHandler}
            placeholder={replyToName ? '' : 'Leave comment'}
            spellCheck='false'
            value={text}
            ref={hideReply && replyInput}
          />
        </div>

        <p className={styles.limit}>
          <span
            className={classNames(
              `${text.length > 500 ? styles.limitRed : ''}`
            )}>
            {text.length}
          </span>
          /500 characters
        </p>
      </div>
      <div className={styles.btnsPanel}>
        <div className={styles.switchContainer}>
          <Switch checked={isSpoiler} toogleSwitch={toogleSwitch} />
          <p>Spoiler</p>
        </div>
        <div>
          {(commentId || text.length > 0) && (
            <BlueBtn color='white' onClick={cancelAction}>
              Cencel
            </BlueBtn>
          )}
          <BlueBtn
            disabled={text.length === 0 || text.length > 500 || isLoading}
            onClick={onAddComment}>
            Send
          </BlueBtn>
        </div>
      </div>
    </div>
  );
};
