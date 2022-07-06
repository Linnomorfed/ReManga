import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import classNames from 'classnames';
import React from 'react';
import { SelectSvg } from '../../../assets/svgs';
import { useAppDispatch } from '../../../hooks/redux';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { ResponseFilter } from '../../../models/IFilters';
import styles from './Dropdowns.module.scss';

interface SingleDropdownProps {
  variant?: 'default' | 'sortBy' | 'manga' | 'header';
  items: ResponseFilter[];
  action: ActionCreatorWithPayload<number, string>;
  state: number | null;
  defaultTitle?: string;
}

export const SingleDropdown: React.FC<SingleDropdownProps> = ({
  variant = 'default',
  items,
  action,
  state,
  defaultTitle,
}) => {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(
    defaultTitle ? defaultTitle : state ? items[state - 1].name : ''
  );

  const { componentRef, toggleVisibility } = useOutsideClick(
    isOpened,
    setIsOpened
  );

  const onClickElement = (id: number) => {
    dispatch(action(id));
    toggleVisibility();
  };

  React.useEffect(() => {
    state && setTitle(items[state - 1].name);
  }, [state]);

  return (
    <div ref={componentRef}>
      <div
        className={classNames(
          styles.select,
          `${isOpened ? styles.rotate : ''}`,
          `${variant === 'manga' ? styles.selectManga : ''}`,
          `${variant === 'sortBy' ? styles.selectSortBy : ''}`,
          `${variant === 'header' ? styles.selectHeader : ''}`
        )}
        onClick={toggleVisibility}>
        <span className={styles.indent}>
          {title}
          {variant !== 'header' && <SelectSvg fill={'white'} w={24} h={24} />}
        </span>
      </div>

      {isOpened && (
        <div
          className={classNames(
            styles.dropdown,
            `${!isOpened ? styles.dropdownHide : ''}`,
            `${variant === 'manga' ? styles.dropdownManga : ''}`
          )}>
          {items?.map((items) => (
            <div
              key={items.id}
              className={classNames(
                styles.dropDownElement,
                `${
                  state === items.id ? styles.dropDownElementCheckedSingle : ''
                }`
              )}
              onClick={() => onClickElement(items.id)}>
              <span>{items.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
