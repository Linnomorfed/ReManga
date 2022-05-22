import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import { SelectSvg } from '../../../assets/svgs';
import DropDownElement from './DropDownElement';
import styles from './Dropdown.module.scss';
import { ResponceFilter } from '../../../models/IFilters';
import useOutsideClick from '../../../hooks/useOutsideClick';

interface DropdownProps {
  items: ResponceFilter[];
  title?: string;
  selected?: number | null;
  type: 'default' | 'sortBy' | 'manga';
  returnId?: (ids: number[]) => void;
  resetFilters?: boolean;
  toggleResetFilters?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  title,
  type,
  selected,
  returnId,
  resetFilters,
  toggleResetFilters,
}) => {
  const defaultSelected = selected ? [selected] : [];
  const selectedOne = items.filter((obj) => obj.id === selected);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [defaultTitle, setDefaultTitle] = useState<string>();
  const [selectedId, setSelectedId] = useState<number[]>(defaultSelected);

  const toggleTitle = (returnedTitle: string) => {
    setDefaultTitle(returnedTitle);
  };

  // const toggleVisibility = () => {
  //   setIsOpened(!isOpened);
  // };

  const { componentRef, toggleVisibility } = useOutsideClick(
    isOpened,
    setIsOpened
  );

  React.useEffect(() => {
    resetFilters && setSelectedId([]);
    toggleResetFilters && toggleResetFilters();
  }, [resetFilters]);

  React.useEffect(() => {
    if (type === 'default') {
      selectedId.length > 0
        ? setDefaultTitle(`${selectedId.length} selected`)
        : setDefaultTitle(title);
    } else {
      selected ? setDefaultTitle(selectedOne[0].name) : setDefaultTitle(title);
    }
  }, [selectedId, selectedOne]);

  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      returnId && !isOpened && returnId(selectedId);
    }
  }, [returnId, selectedId, isOpened]);

  const updateReturnedId = (id: number) => {
    if (type === 'default') {
      setSelectedId([...selectedId, id]);

      if (selectedId.includes(id)) {
        setSelectedId(selectedId.filter((items) => items !== id));
      }
    } else {
      setSelectedId([id]);
    }
  };

  return (
    <div ref={componentRef}>
      <div
        className={classNames(
          styles.select,
          `${isOpened && styles.rotate}`,
          `${type === 'manga' && styles.selectManga}`,
          `${type === 'sortBy' && styles.selectSortBy}`
        )}
        onClick={toggleVisibility}>
        <span className={styles.indent}>
          {defaultTitle}
          <SelectSvg fill={'white'} w={24} h={24} />
        </span>
      </div>

      {
        <div
          className={classNames(
            styles.dropdown,
            `${!isOpened && styles.dropdownHide}`
          )}>
          {items?.map((items) => (
            <DropDownElement
              key={items.id}
              id={items.id}
              title={items.name}
              selectedId={selectedId}
              type={type}
              close={toggleVisibility}
              changeTitle={toggleTitle}
              returnId={updateReturnedId}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default Dropdown;
