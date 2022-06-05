import React from 'react'
import styles from './Chapters.module.scss';
import { EmptyHeartSvg, HeartSvg, LockSvg } from '../../../assets/svgs';
import classNames from 'classnames';


interface ChapterItemProps {
  chapter: number;
  volume: number;
  likes: number
  createdAt: string;
}

const liked = false;
const locked = false

const ChapterItem: React.FC<ChapterItemProps> = ({ chapter, volume, createdAt, likes }) => {
  return (
    <div className={styles.chapterItem}>
      <span className={styles.volume}>{volume}</span>
      <a className={styles.link}>
        <h6 className={styles.chapter}>Chapter {chapter}</h6>
        <div className={styles.team}>
          Assley Team {createdAt}
        </div>
      </a>
      <div className={styles.rightPart}>
        <span className={styles.lock}>
          {locked && <LockSvg fill='rgba(255,255,255,.5)' />}
        </span>
        <button className={classNames(styles.likeBtn, `${liked ? styles.likeBtnLiked : ''}`)}>
          {liked ? <HeartSvg fill='#ffb400' w={16} /> :
            <EmptyHeartSvg fill='#ffb400' w={16} />
          }
          {likes}


        </button>
      </div>
    </div>
  )
}

export default ChapterItem