import React from 'react';
import { CloseSvg } from '../../assets/svgs';
import styles from './ModalBlock.module.scss';
import FocusLock from 'react-focus-lock';
import useOutsideClick from '../../hooks/useOutsideClick';

interface ModalBlockProps {
  children: React.ReactChild | React.ReactNode;
  toggleModalVisibility: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const ModalBlock: React.FC<ModalBlockProps> = ({
  children,
  toggleModalVisibility,
  visible,
  setVisible,
  title,
}) => {
  const { componentRef } = useOutsideClick(visible, setVisible);

  return (
    <div className={styles.modal}>
      <FocusLock>
        <div className={styles.content} ref={componentRef}>
          <div className={styles.header}>
            {title && <h4 className={styles.headerTitle}>{title}</h4>}
            <button className={styles.closeBtn} onClick={toggleModalVisibility}>
              <CloseSvg w={16} h={16} fill={'#f2f2f2'} />
            </button>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </FocusLock>
    </div>
  );
};

export default ModalBlock;
