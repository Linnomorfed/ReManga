import { useRouter } from 'next/router';
import React from 'react';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { CircularLoader, MangaCard } from '../UI';
import styles from './WhatToRead.module.scss';

interface SectionProps {
  name: string;
  types: number[] | null;
  genres: number[] | null;
  categories: number[] | null;
  id: number;
}

export const Section: React.FC<SectionProps> = ({
  name,
  types,
  genres,
  categories,
  id,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<ResponceManga[]>([]);

  const activeTab = router.query.section ? router.query.section : 1;

  const readMore = () => {
    router.push('/manga/top' + `?type=${id}&section=${activeTab}`, undefined, {
      shallow: true,
    });
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const manga = await Api().manga.getMangaTopByQuery({
          topBy: router.query.section === '2' ? 'new' : null,
          types,
          genres,
          categories,
        });
        setItems(manga);
        setIsLoading(false);
      } catch (err) {
        console.warn('Section loading ', err);
      }
    })();
  }, [router.asPath]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <CircularLoader />
        </div>
      ) : (
        items.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTop}>
              <h3 className={styles.title}>{name}</h3>
              <button className={styles.moreBtn} onClick={readMore}>
                More
              </button>
            </div>
            <div className={styles.body}>
              <div className={styles.bodyLeft}>
                <MangaCard
                  size='large'
                  title={items[0].title}
                  url={items[0].image.url}
                  mangaId={items[0].id}
                  genres={items[0].genres}
                  type={items[0].type.name}
                />
              </div>
              <div className={styles.bodyRight}>
                {items.slice(1).map((obj) => (
                  <MangaCard
                    key={obj.id}
                    size='medium'
                    title={obj.title}
                    url={obj.image.url}
                    mangaId={obj.id}
                    genres={obj.genres}
                    type={obj.type.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
