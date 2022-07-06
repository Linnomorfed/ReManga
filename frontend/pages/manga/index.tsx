import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { FiltersDataResponse } from '../../models/IFilters';
import { MangaSortEnum, ResponseManga } from '../../models/IManga';
import { Api } from '../../services/api';

interface MangaCatalogProps {
  filters: FiltersDataResponse;
  manga: ResponseManga[];
  itemsCount: number;
}

const Catalog = dynamic<MangaCatalogProps>(() =>
  import(/* webpackChunkName: "Catalog" */ '../../components').then(
    (mod) => mod.Catalog
  )
);

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
      sortby: MangaSortEnum.views,
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
