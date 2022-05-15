import React, { FC } from 'react';
import Dropdown from '../UI/Dropdown';
import { BlockViewSvg, ListViewSvg, SwitchSvg } from '../../assets/svgs';
import classNames from 'classnames';
import styles from './SortBy.module.scss';
import { CatalogFilter } from '../../utils/static/Catalog';

const SortBy: FC = () => {
  return (
    <div className={styles.sortBy}>
      <div className={styles.center}>
        <div>
          <Dropdown items={CatalogFilter} type='sortBy' selected={5} />
        </div>
        <button className={styles.switchBtn}>
          <SwitchSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
      <div className={styles.center}>
        <button className={classNames(styles.switchBtn, styles.rightBtns)}>
          <ListViewSvg w={24} h={24} fill={'white'} />
        </button>
        <button className={classNames(styles.switchBtn, styles.rightBtns)}>
          <BlockViewSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
    </div>
  );
};

export default SortBy;
