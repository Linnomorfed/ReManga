import React from 'react';
import { CloseSvg } from '../../assets/svgs';
import styles from './ModalBlock.module.scss';
import FocusLock from 'react-focus-lock';
import useOutsideClick from '../../hooks/useOutsideClick';
import classNames from 'classnames';

interface ModalBlockProps {
  children: React.ReactChild | React.ReactNode;
  toggleModalVisibility: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  variant?: 'small' | 'large'
}

const ModalBlock: React.FC<ModalBlockProps> = ({
  children,
  toggleModalVisibility,
  visible,
  setVisible,
  title,
  variant = 'small',
}) => {
  const { componentRef } = useOutsideClick(visible, setVisible);

  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    }
  }, [visible])

  return (
    <div className={styles.modal}>
      <FocusLock>
        <div className={classNames(styles.content, `${variant === 'large' ? styles.contentLarge : ''}`)} ref={componentRef}>
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
