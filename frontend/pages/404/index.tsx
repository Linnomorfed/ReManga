import Head from 'next/head';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { wrapper } from '../../redux/store';
import styles from './404.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 | Page not found</title>
      </Head>
      <MainLayout>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.error}>404</div>
            <div>
              <h1 className={styles.title}>Page not found</h1>
              <p>Sorry, the page you were trying to view does not exist.</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default NotFoundPage;
