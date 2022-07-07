import React, { FC } from 'react';
import { BlockViewSvg, ListViewSvg, SwitchSvg } from '../../../assets/svgs';
import classNames from 'classnames';
import styles from './SortBy.module.scss';
import { CatalogSortBy } from '../../../utils/static/Catalog';
import { SingleDropdown } from '../../UI';
import { useAppSelector } from '../../../hooks/redux';
import { selectSortByData } from '../../../redux/SortBy/selectors';
import { setCatalogSortBy } from '../../../redux/SortBy/slice';

interface SortByProps {
  callbackOrder: (order: boolean) => void;
  returnCardVariant: (type: 'list' | 'block') => void;
}

export const SortBy: FC<SortByProps> = ({
  callbackOrder,
  returnCardVariant,
}) => {
  const cardVariantValue = localStorage.getItem('cardVariant') || 'list';
  const { catalogSortBy } = useAppSelector(selectSortByData);
  const [currentOrder, setCurrentOrder] = React.useState<boolean>(false);

  console.log(cardVariantValue, 11);

  const toggleOrder = () => {
    setCurrentOrder(!currentOrder);
  };
  React.useEffect(() => {
    callbackOrder(currentOrder);
  }, [currentOrder]);

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
          <SingleDropdown
            variant='sortBy'
            items={CatalogSortBy}
            state={catalogSortBy}
            action={setCatalogSortBy}
          />
        </div>
        <button className={styles.switchBtn} onClick={toggleOrder}>
          <SwitchSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
      <div className={styles.center}>
        <button
          className={classNames(
            styles.switchBtn,
            styles.rightBtns,
            `${cardVariantValue === 'block' ? styles.rightBtnsActive : ''}`
          )}
          onClick={setBlockType}>
          <ListViewSvg w={24} h={24} fill={'white'} />
        </button>
        <button
          className={classNames(
            styles.switchBtn,
            styles.rightBtns,
            `${cardVariantValue === 'list' ? styles.rightBtnsActive : ''}`
          )}
          onClick={setListType}>
          <BlockViewSvg w={24} h={24} fill={'white'} />
        </button>
      </div>
    </div>
  );
};
