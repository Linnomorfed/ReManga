import classNames from 'classnames';
import React from 'react';
import { StarSvg } from '../../assets/svgs';
import { RatingResponse } from '../../models/IRating';
import styles from './MangaContent.module.scss';

interface RateElementProps {
  value: number;
  text: string;
  onClick: (rate: number) => void;
  ratedByUser: RatingResponse | null;
}

const RateElement: React.FC<RateElementProps> = ({
  value,
  text,
  onClick,
  ratedByUser,
}) => {
  const returnRate = () => {
    onClick(value);
  };
  return (
    <div
      className={classNames(
        styles.rateElement,
        `${ratedByUser?.rate === value && styles.rateElementActive}`
      )}
      onClick={returnRate}>
      <span>{value}</span> <StarSvg h={24} /> <span>{text}</span>
    </div>
  );
};

export default RateElement;
