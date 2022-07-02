import React from 'react';
import { ResponceManga } from '../../models/IManga';
import { WhatToReadTabs } from '../../utils/static/WhatToRead';
import { TabBtn } from '../UI';
import { MangaBlocks } from './MangaBlocks';
import { MangaList } from './MangaList';
import styles from './WhatToRead.module.scss';

interface WhatToReadProps {
  manga: ResponceManga[];
}

export const WhatToRead: React.FC<WhatToReadProps> = ({ manga }) => {
  const [activeTab, setActiveTab] = React.useState<number>(2);
  const [blockViewMode, setBlockViewMode] = React.useState<boolean>(true);

  const toggleActiveTab = (activeTab: number) => {
    setActiveTab(activeTab);
  };

  return (
    <>
      <div className={styles.top}>
        <div className='container'>
          <h1 className={styles.title}>What to read</h1>
          <div className={styles.tabsWrapper}>
            {WhatToReadTabs.map((obj) => (
              <TabBtn
                onClick={toggleActiveTab}
                key={obj.id}
                id={obj.id}
                active={activeTab}>
                {obj.name}
              </TabBtn>
            ))}
          </div>
        </div>
      </div>
      {blockViewMode ? <MangaList manga={manga} /> : <MangaBlocks />}
    </>
  );
};
