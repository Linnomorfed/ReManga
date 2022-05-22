import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { CheckboxCheckedSvg, CheckboxSvg } from '../../../../assets/svgs';
import styles from './DropDownElement.module.scss';

interface DropDownElementProps {
  title: string;
  id: number;
  selectedId?: number[];
  close: () => void;
  type: 'default' | 'sortBy' | 'manga';
  changeTitle: (title: string) => void;
  returnId: (id: number) => void;
}

const DropDownElement: FC<DropDownElementProps> = ({
  title,
  id,
  type,
  returnId,
  selectedId,
  changeTitle,
  close,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  React.useEffect(() => {
    selectedId && selectedId.includes(id)
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [selectedId]);

  const onClickElement = () => {
    returnId(id);

    type !== 'default' && (close(), changeTitle(title));
  };

  return (
    <div
      className={classNames(
        styles.dropDownElement,
        `${isChecked && styles.dropDownElementChecked}`
      )}
      onClick={onClickElement}>
      {type === 'default' && (
        <>
          {isChecked ? (
            <CheckboxCheckedSvg fill={'#f50057'} w={20} h={20} />
          ) : (
            <CheckboxSvg fill={'white'} w={20} h={20} />
          )}
        </>
      )}
      <span>{title}</span>
    </div>
  );
};

export default DropDownElement;
