import React, { FC } from 'react';
import { ResponseManga } from '../../../models/IManga';
import { Api } from '../../../services/api';
import { MangaCartVertical } from '../../UI/Cards/MangaCardVertical';
import { ShowMoreButton } from '../../UI/ShowMoreButton';
import styles from './VerticalMangaList.module.scss';

interface VerticalMangaListProps {
  title?: string;
  minCount: number;
  maxCount: number;
  items: ResponseManga[];
  variant: 'newest' | 'popularToday';
}

export const VerticalMangaList: FC<VerticalMangaListProps> = ({
  title = 'title',
  minCount,
  maxCount,
  items,
  variant,
}) => {
  const [newMangaList, setNewMangaList] = React.useState<ResponseManga[]>();

  const [isShowMore, setIsShowMore] = React.useState(false);

  const toogleShowMore = async () => {
    if (!newMangaList) {
      try {
        if (variant === 'newest') {
          const res = await Api().manga.getMangaByQuery({
            skip: minCount,
            take: maxCount,
          });
          const manga = res.items;
          setNewMangaList(manga);
        } else if (variant === 'popularToday') {
          const manga = await Api().manga.getTodayPopular({
            skip: minCount,
            take: maxCount,
          });

          setNewMangaList(manga);
        }
      } catch (err) {
        console.warn('Manga loading ', err);
      }
    }
    setIsShowMore(!isShowMore);
  };

  return (
    <>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.wrapper}>
        {items.map((obj) => (
          <MangaCartVertical key={obj.id} data={obj} />
        ))}
        {newMangaList &&
          isShowMore &&
          newMangaList.map((obj) => (
            <MangaCartVertical key={obj.id} data={obj} />
          ))}

        <ShowMoreButton onClick={toogleShowMore} isShowMore={isShowMore} />
      </div>
    </>
  );
};
