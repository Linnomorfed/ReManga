import classNames from 'classnames';
import React from 'react';
import { BookmarkSvg, HeartSvg, ShowPassSvg, StarSvg } from '../../assets/svgs';
import styles from './MangaContent.module.scss';

interface MangaInfoProps {
  otherTitles: string;
  title: string;
  status: string;
  type: string;
  views: number;
  issueYear: number;
}

const MangaInfo: React.FC<MangaInfoProps> = ({
  otherTitles,
  title,
  status,
  type,
  views,
  issueYear,
}) => {
  return (
    <div className={styles.descriptionBlock}>
      <h2 className={styles.altNames}>
        {/* {altNames.map((alts) => alts).join(' / ')} */}
        {otherTitles}
      </h2>

      <h1 className={styles.title}>
        {title} <span className={styles.status}> {'[' + status + ']'}</span>
      </h1>

      <div className='d-flex'>
        <div className={styles.stats}>
          <StarSvg h={24} />
          <span className={styles.span}> 9.7 (votes: 34012)</span>
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
