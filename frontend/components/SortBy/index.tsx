import React, { FC } from 'react';
import Dropdown from '../UI/Dropdown';
import { BlockViewSvg, ListViewSvg, SwitchSvg } from '../../assets/svgs';
import classNames from 'classnames';
import styles from './SortBy.module.scss';
import { CatalogSortBy } from '../../utils/static/Catalog';

interface SortByProps {
  callbackId: (id: number) => void;
  currentSortById?: number;
  callbackOrder: (order: boolean) => void;
  returnCardVariant: (type: 'list' | 'block') => void;
}

const SortBy: FC<SortByProps> = ({
  callbackId,
  callbackOrder,
  currentSortById,
  returnCardVariant,
}) => {
  const [currentOrder, setCurrentOrder] = React.useState<boolean>(false);

  const toggleOrder = () => {
    setCurrentOrder(!currentOrder);
  };
  React.useEffect(() => {
    callbackOrder(currentOrder);
  }, [currentOrder, callbackOrder]);

  const returnId = (id: number[]) => {
    callbackId(id[0]);
  };

  const setBlockType = () => {
    returnCardVariant('block');
  };

  const setListType = () => {
    returnCardVariant('list');
  };

  return (
    <div className={styles.sortBy}>
      <div className={styles.center}>
        <div>
          <Dropdown
            items={CatalogSortBy}
            type='sortBy'
            selected={currentSortById}
            returnId={returnId}
          />
        </div>
        <button className={styles.switchBtn} onClick={toggleOrder}>
          <SwitchSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
      <div className={styles.center}>
        <button
          className={classNames(styles.switchBtn, styles.rightBtns)}
          onClick={setListType}>
          <ListViewSvg w={24} h={24} fill={'white'} />
        </button>
        <button
          className={classNames(styles.switchBtn, styles.rightBtns)}
          onClick={setBlockType}>
          <BlockViewSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
    </div>
  );
};

export default SortBy;
