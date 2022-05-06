import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import { SelectSvg } from '../../../assets/svgs';
import DropDownElement from './DropDownElement';
import styles from './Dropdown.module.scss';
import { ResponceFilter } from '../../../models/IFilters';

interface DropdownProps {
  items: ResponceFilter[];
  title: string;
  selected?: number;
  type: 'default' | 'sortBy' | 'manga';
  returnId?: (ids: number[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  title,
  type,
  selected,
  returnId,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [defaultTitle, setDefaultTitle] = useState<string>();
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const toggleTitle = (returnedTitle: string) => {
    setDefaultTitle(returnedTitle);
  };

  React.useEffect(() => {
    const selectedOne = items.filter((obj) => obj.id === selected);
    selected ? setDefaultTitle(selectedOne[0].name) : setDefaultTitle(title);
  }, []);

  React.useEffect(() => {
    returnId && selectedId.length > 0 && returnId(selectedId);
  }, [returnId, selectedId]);

  const toggleVisibility = () => {
    setIsOpened(!isOpened);
  };

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
    <>
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
    </>
  );
};

export default Dropdown;
