import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import classNames from 'classnames';
import React from 'react';
import { CheckboxCheckedSvg, CheckboxSvg, SelectSvg } from '../../assets/svgs';
import { useAppDispatch } from '../../hooks/redux';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ResponseFilter } from '../../models/IFilters';
import styles from './Dropdowns.module.scss';

interface MultipleDropdownProps {
  defaultTitle: string;
  items: ResponseFilter[];
  action: ActionCreatorWithPayload<number, string>;
  state: number[];
}

export const MultipleDropdown: React.FC<MultipleDropdownProps> = React.memo(
  ({ defaultTitle, items, action, state }) => {
    const dispatch = useAppDispatch();
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>(
      state.length > 0 ? `${state.length} selected` : defaultTitle
    );

    const { componentRef, toggleVisibility } = useOutsideClick(
      isOpened,
      setIsOpened
    );

    const onClickElement = (id: number) => {
      dispatch(action(id));
    };

    React.useEffect(() => {
      setTitle(state.length > 0 ? ` ${state.length} selected` : defaultTitle);
    }, [state]);
    return (
      <div ref={componentRef}>
        <div
          className={classNames(styles.select, `${isOpened && styles.rotate}`)}
          onClick={toggleVisibility}>
          <span className={styles.indent}>
            {title}
            <SelectSvg fill={'white'} w={24} h={24} />
          </span>
        </div>

        {isOpened && (
          <div className={styles.dropdown}>
            {items?.map((items) => (
              <div
                key={items.id}
                className={classNames(
                  styles.dropDownElement,
                  `${
                    state.includes(items.id)
                      ? styles.dropDownElementChecked
                      : ''
                  }`
                )}
                onClick={() => onClickElement(items.id)}>
                {state.includes(items.id) ? (
                  <CheckboxCheckedSvg fill={'#f50057'} w={20} h={20} />
                ) : (
                  <CheckboxSvg fill={'white'} w={20} h={20} />
                )}
                <span>{items.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultipleDropdown.displayName = 'MultipleDropdown';
