import classNames from 'classnames';
import React from 'react';
import {
  ChaptersSvg,
  CommentSvg,
  SettingsSvg,
  WarnSvg,
} from '../../../assets/svgs';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectChaptersData } from '../../../redux/Chapter/selectors';
import { setActivePanelId } from '../../../redux/Chapter/slice';
import { ChaptersList } from '../../UI';
import styles from './Panel.module.scss';
import { Section } from './Section';

export const ChapterPanel = () => {
  const dispatch = useAppDispatch();
  const titles = ['Content', 'Comments', 'Settings'];
  const [activeId, setActiveId] = React.useState<number>(0);

  const { activePanelId } = useAppSelector(selectChaptersData);

  const toggleActiveId = (id: number) => {
    activeId === id ? setActiveId(0) : setActiveId(id);
  };

  React.useEffect(() => {
    dispatch(setActivePanelId(activeId));
  }, [activeId]);

  return (
    <>
      <div className={styles.panel}>
        <div className={styles.btnWrapper}>
          <button
            className={classNames(styles.btn, styles.btnText)}
            title='Page 1/11'>
            1/11
          </button>
          <button
            className={classNames(
              styles.btn,
              `${activeId === 1 ? styles.btnActive : ''}`
            )}
            title='Chapters'
            onClick={() => toggleActiveId(1)}>
            <ChaptersSvg w={24} />
          </button>
          <button
            className={classNames(
              styles.btn,
              `${activeId === 2 ? styles.btnActive : ''}`
            )}
            title='Comments'
            onClick={() => toggleActiveId(2)}>
            <div className='relative'>
              <CommentSvg w={24} />
              <span className={styles.notificationSpan}>13</span>
            </div>
          </button>
          <button
            className={classNames(
              styles.btn,
              `${activeId === 3 ? styles.btnActive : ''}`
            )}
            title='Settings'
            onClick={() => toggleActiveId(3)}>
            <SettingsSvg w={24} />
          </button>
          <button className={styles.btn} title='Complain'>
            <WarnSvg w={24} />
          </button>
        </div>
      </div>

      {activeId !== 0 && (
        <Section title={titles[activeId - 1]} setActiveId={setActiveId}>
          {(() => {
            switch (activeId) {
              case 1:
                return <ChaptersList variant='chapter' />;
              case 2:
                return null;
              default:
                return null;
            }
          })()}
        </Section>
      )}
    </>
  );
};
