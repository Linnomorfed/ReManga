import classNames from 'classnames';
import React from 'react';
import { BookmarkSvg, HeartSvg, ShowPassSvg, StarSvg } from '../../../assets/svgs';
import { RatingResponse } from '../../../models/IRating';
import styles from './MangaInfo.module.scss';
import RatePanel from '../RatePanel';

interface MangaInfoProps {
  otherTitles: string;
  title: string;
  status: string;
  type: string;
  views: number;
  issueYear: number;
  mangaId: number;
  rating: number;
  votesCount: number;
  ratedByUser: RatingResponse | null;
}

const MangaInfo: React.FC<MangaInfoProps> = ({
  otherTitles,
  title,
  mangaId,
  status,
  type,
  views,
  issueYear,
  rating,
  votesCount,
  ratedByUser,
}) => {
  const [rateOpened, setRateOpened] = React.useState<boolean>(false);
  const [mangaRating, setMangaRating] = React.useState<number>(rating);
  const [mangaVotesCount, setMangaVotesCount] =
    React.useState<number>(votesCount);

  const toogleRateVisibility = () => {
    setRateOpened(!rateOpened);
  };
  return (
    <div className={styles.descriptionBlock}>
      {rateOpened && (
        <RatePanel
          toggleModalVisibility={toogleRateVisibility}
          visible={rateOpened}
          setVisible={setRateOpened}
          mangaId={mangaId}
          setMangaRating={setMangaRating}
          setMangaVotesCount={setMangaVotesCount}
          mangaVotesCount={mangaVotesCount}
          ratedByUser={ratedByUser}
        />
      )}
      <h2 className={styles.altNames}>
        {/* {altNames.map((alts) => alts).join(' / ')} */}
        {otherTitles}
      </h2>

      <h1 className={styles.title}>
        {title} <span className={styles.status}> {'[' + status + ']'}</span>
      </h1>

      <div className='d-flex'>
        <div className={styles.stats} onClick={toogleRateVisibility}>
          <StarSvg h={24} />
          <span className={styles.span}>
            {' '}
            {mangaRating} (votes: {mangaVotesCount})
          </span>
        </div>
        <div className={styles.stats} title='Total likes on chapters'>
          <HeartSvg h={24} fill={'white'} />
          <span className={styles.span}> 3.0M</span>
        </div>
        <div className={styles.stats} title='Total views'>
          <ShowPassSvg h={24} fill={'white'} />
          <span className={styles.span}>{views}</span>
        </div>
        <div className={styles.stats} title='Bookmarked by users'>
          <BookmarkSvg h={24} fill={'white'} />
          <span className={styles.span}> 151.4K</span>
        </div>
        <div className={classNames(styles.stats, styles.statsLink)}>{type}</div>
        <div className={styles.stats}>{issueYear}</div>
      </div>
    </div>
  );
};

export default MangaInfo;
