import React, { FC } from 'react';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import MangaCartVertical from '../UI/Cards/MangaCardVertical';
import ShowMoreButton from '../UI/ShowMoreButton';
import styles from './VerticalMangaList.module.scss';

interface VerticalMangaListProps {
  title?: string;
  minCount: number;
  maxCount: number;
  items: ResponceManga[];
}

const VerticalMangaList: FC<VerticalMangaListProps> = ({
  title = 'title',
  minCount,
  maxCount,
  items,
}) => {
  const [newMangaList, setNewMangaList] = React.useState<ResponceManga[]>();

  const [isShowMore, setIsShowMore] = React.useState(false);

  const toogleShowMore = async () => {
    if (!newMangaList) {
      try {
        const res = await Api().manga.getMangaByQuery({
          skip: minCount,
          take: maxCount,
        });
        const manga = res.items;
        setNewMangaList(manga);

        console.log(manga);
      } catch (err) {
        console.log('Manga loading ', err);
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

export default VerticalMangaList;
