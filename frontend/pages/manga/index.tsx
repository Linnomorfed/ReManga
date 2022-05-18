import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Catalog } from '../../components';
import MainLayout from '../../layouts/MainLayout';
import { FiltersDataResponce } from '../../models/IFilters';
import { MangaFilterEnum, ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';

interface MangaCatalogProps {
  filters: FiltersDataResponce;
  manga: ResponceManga[];
  itemsCount: number;
}

const MangaCatalog: NextPage<MangaCatalogProps> = ({
  filters,
  manga,
  itemsCount,
}) => {
  return (
    <MainLayout showFooter={false}>
      <Catalog filters={filters} manga={manga} itemsCount={itemsCount} />
    </MainLayout>
  );
};

export default MangaCatalog;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const manga = await Api().manga.getMangaByQuery({
      filter: MangaFilterEnum.views,
      page: 1,
      take: 3,
      orderby: 'DESC',
    });

    const types = await Api().filters.getTypes();
    const genres = await Api().filters.getGenres();
    const categories = await Api().filters.getCategories();
    const statuses = await Api().filters.getStatuses();
    const restrictions = await Api().filters.getRestrictions();
    const filters = { types, genres, categories, statuses, restrictions };

    return { props: { filters, manga: manga.items, itemsCount: manga.count } };
  } catch (err) {
    console.warn('Filters loading error', err);
  }
  return { props: { filters: null } };
};
