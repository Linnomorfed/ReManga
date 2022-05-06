import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './ShowMoreButton.module.scss';

interface ShowMoreButtonProps {
  isShowMore: boolean;
  onClick: () => void;
  type?: 'default' | 'comment';
}

const ShowMoreButton: FC<ShowMoreButtonProps> = ({
  isShowMore,
  onClick,
  type = 'default',
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.btn,
        `${type === 'comment' && styles.btnComment}`
      )}>
      {isShowMore ? 'show fewer' : 'show more'}
    </button>
  );
};

export default ShowMoreButton;
