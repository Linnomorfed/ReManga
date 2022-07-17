import { useRouter } from 'next/router';
import React from 'react';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { ResponseManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { WhatToReadItems } from '../../utils/static/WhatToRead';
import { MangaCard } from '../../ui-components';
import { Section } from './Section';
import styles from './WhatToRead.module.scss';

interface MangaListProps {
  manga: ResponseManga[];
}

export const MangaList: React.FC<MangaListProps> = ({ manga }) => {
  const router = useRouter();
  const [items, setItems] = React.useState<ResponseManga[]>(manga);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const activeTab = router.query.section ? router.query.section : 1;

  const readMore = () => {
    router.push('/manga/top' + `?type=${0}&section=${activeTab}`, undefined, {
      shallow: true,
    });
  };

  useDidMountEffect(() => {
    (async () => {
      setIsLoading(true);
      const manga = await Api().manga.getMangaTopByQuery({
        topBy: router.query.section === '2' ? 'new' : null,
      });
      setItems(manga);
      setIsLoading(false);
    })();
  }, [router.asPath]);

  return (
    <div className='containerSmall'>
      <div className={styles.section}>
        <div className={styles.sectionTop}>
          <h3 className={styles.title}>All</h3>
          <button className={styles.moreBtn} onClick={readMore}>
            More
          </button>
        </div>
        <div className={styles.bodyAll}>
          {items.length > 0 &&
            items.map((obj) => (
              <MangaCard
                key={obj.id}
                title={obj.title}
                url={obj.image.url}
                mangaId={obj.id}
                genres={obj.genres}
                type={obj.type.name}
              />
            ))}
        </div>
      </div>
      {WhatToReadItems.map((obj) => (
        <Section
          key={obj.id}
          id={obj.id}
          name={obj.name}
          types={obj.types}
          genres={obj.genres}
          categories={obj.categories}
        />
      ))}
    </div>
  );
};
