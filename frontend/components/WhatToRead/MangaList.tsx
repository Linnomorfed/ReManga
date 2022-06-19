import React from 'react';
import { ResponceManga } from '../../models/IManga';
import { WhatToReadItems } from '../../utils/static/WhatToRead';
import { MangaCard } from '../UI';
import Section from './Section';
import styles from './WhatToRead.module.scss';

interface MangaListProps {
  manga: ResponceManga[];
}

const MangaList: React.FC<MangaListProps> = ({ manga }) => {
  const [items, setItems] = React.useState<ResponceManga[]>(manga);

  return (
    <div className='containerSmall'>
      <div className={styles.section}>
        <div className={styles.sectionTop}>
          <h3 className={styles.title}>All</h3>
          <a className={styles.moreBtn}>More</a>
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
          name={obj.name}
          types={obj.types}
          genres={obj.genres}
          categories={obj.categories}
        />
      ))}
    </div>
  );
};

export default MangaList;
