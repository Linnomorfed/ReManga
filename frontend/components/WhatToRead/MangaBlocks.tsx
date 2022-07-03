import { useRouter } from 'next/router';
import React from 'react';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { WhatToReadItems } from '../../utils/static/WhatToRead';
import { MangaCardBlock } from '../UI';
import styles from './WhatToRead.module.scss';

export const MangaBlocks = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<ResponceManga[]>([]);
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const manga = await Api().manga.getMangaTopByQuery({
          topBy: router.query.section === '2' ? 'new' : null,
          types:
            router.query.type !== '0'
              ? WhatToReadItems[Number(router.query.type) - 1].types
              : null,
          genres:
            router.query.type !== '0'
              ? WhatToReadItems[Number(router.query.type) - 1].genres
              : null,
          categories:
            router.query.type !== '0'
              ? WhatToReadItems[Number(router.query.type) - 1].categories
              : null,
        });
        setItems(manga);
        setIsLoading(false);
      } catch (err) {
        console.warn('Type Manga loading error ', err);
      }
    })();
  }, [router.query]);
  return (
    <div className='container'>
      <div className={styles.blocksWrapper}>
        {isLoading
          ? '1'
          : items.length > 0 &&
            items.map((obj, i) => (
              <MangaCardBlock
                key={obj.id}
                index={i}
                id={obj.id}
                imageUrl={obj.image.url}
                type={obj.type.name}
                title={obj.title}
                genres={obj.genres}
                rating={obj.rating}
                views={obj.views}
                likes={obj.likes_count}
              />
            ))}
      </div>
    </div>
  );
};
