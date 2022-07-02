import React from 'react';
import { CloseSvg } from '../../../../assets/svgs';
import styles from './Section.module.scss';

interface SectionProps {
  title: string;
  children: React.ReactChild | React.ReactNode;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  setActiveId,
}) => {
  const closePanel = () => {
    setActiveId(0);
  };
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <button className={styles.btn} onClick={closePanel}>
        <CloseSvg w={24} />
      </button>
      <div className={styles.sectionContainer}>{children}</div>
    </div>
  );
};
