import { FC } from 'react';
import { Socials } from '../Socials';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.firstSection}>
            <h3 className={styles.title}>ReManga</h3>
            <h1 className={styles.description}>Read manga online</h1>
            <p className={styles.text}>
              We are always ready to answer your questions!
            </p>
            <p className={styles.qustionBtn}>Ask a Question</p>
          </div>
          <div className={styles.secondSection}>
            <h3 className={styles.title}>Sections</h3>
            <ul className={styles.list}>
              <li className={styles.listElement}>Site rules</li>
              <li className={styles.listElement}>DMCA</li>
              <li className={styles.listElement}>COPYRIGHT</li>
              <li className={styles.listElement}>Safe deal</li>
            </ul>
          </div>
          <div className={styles.thirdSection}>
            <h3 className={styles.title}>Info</h3>
            <ul className={styles.list}>
              <li className={styles.listElement}>TERMS OF USE</li>
              <li className={styles.listElement}>AGENCY CONTRACT</li>
              <li className={styles.listElement}>PRIVACY AGREEMENT</li>
            </ul>
          </div>
          <div className={styles.fourthSection}>
            <h3 className={styles.title}>Contacts</h3>
            <div className={styles.socials}>
              <Socials />
            </div>
            <h6 className={styles.copyrightings}>remanga.org © 2022</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
