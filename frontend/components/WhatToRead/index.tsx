import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { SelectSvg } from '../../assets/svgs';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { ResponseManga } from '../../models/IManga';
import { WhatToReadItems, WhatToReadTabs } from '../../utils/static/WhatToRead';
import { TabBtn } from '../UI';
import { MangaBlocks } from './MangaBlocks';
import { MangaList } from './MangaList';
import styles from './WhatToRead.module.scss';

interface WhatToReadProps {
  manga: ResponseManga[];
}

export const WhatToRead: React.FC<WhatToReadProps> = ({ manga }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<number>(1);

  const toggleActiveTab = (activeTab: number) => {
    setActiveTab(activeTab);
    router.push(
      '/manga/top' +
        `${router.query.type ? `?type=${router.query.type}` : ''}` +
        `${router.query.type ? '&' : '?'}` +
        `section=${activeTab}`,
      undefined,
      { shallow: true }
    );
  };

  const pushBack = () => {
    router.query.type &&
      router.push('/manga/top', undefined, { shallow: true });
  };

  useDidMountEffect(() => {
    router.asPath === '/manga/top' || router.query.section === '1'
      ? setActiveTab(1)
      : setActiveTab(2);
  }, [router.asPath]);

  return (
    <>
      <div className={styles.top}>
        <div className='container'>
          <h1
            onClick={pushBack}
            className={classNames(
              styles.title,
              `${router.query.type ? styles.titleType : ''}`
            )}>
            {router.query.type && <SelectSvg fill={'white'} w={24} h={24} />}
            {router.query.type
              ? router.query.type === '0'
                ? 'All'
                : WhatToReadItems[Number(router.query.type) - 1].name
              : 'What to read'}
          </h1>
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
      {router.query.type ? <MangaBlocks /> : <MangaList manga={manga} />}
    </>
  );
};
