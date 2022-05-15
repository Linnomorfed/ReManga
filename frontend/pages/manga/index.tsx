import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import CatalogMangaList from '../../components/CatalogMangaList';
import Filters from '../../components/Filters';
import SortBy from '../../components/SortBy';
import MainLayout from '../../layouts/MainLayout';
import { FiltersDataResponce } from '../../models/IFilters';
import { Api } from '../../services/api';
import styles from './MangaCatalog.module.scss';

interface MangaCatalogProps {
  filters: FiltersDataResponce;
}

const MangaCatalog: NextPage<MangaCatalogProps> = ({ filters }) => {
  return (
    <MainLayout showFooter={false}>
      <div className={styles.header}>
        <div className='container'>
          <h1 className={styles.title}>Manga catalog</h1>
          <Filters filters={filters} />
        </div>
      </div>
      <div className='containerSmall'>
        <div className={styles.main}>
          <SortBy />
          {/* <CatalogMangaList /> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default MangaCatalog;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    //const manga = await Api().manga

    const types = await Api().filters.getTypes();
    const genres = await Api().filters.getGenres();
    const categories = await Api().filters.getCategories();
    const statuses = await Api().filters.getStatuses();
    const restrictions = await Api().filters.getRestrictions();
    const filters = { types, genres, categories, statuses, restrictions };

    return { props: { filters } };
  } catch (err) {
    console.warn('Filters loading error', err);
  }
  return { props: { filters: null } };
};
