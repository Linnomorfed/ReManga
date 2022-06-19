import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Panel } from '../../components';
import { Api } from '../../services/api';
import { FiltersDataResponce } from '../../models/IFilters';
import MainLayout from '../../layouts/MainLayout';
import { ResponceManga } from '../../models/IManga';

interface EditMangaPanelProps {
  filters: FiltersDataResponce;
  manga: ResponceManga;
}

const EditMangaPanel: NextPage<EditMangaPanelProps> = ({ filters, manga }) => {
  return (
    <MainLayout showFooter={false}>
      <Panel filters={filters} data={manga} />
    </MainLayout>
  );
};

export default EditMangaPanel;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id as string;
    const manga = await Api(ctx).manga.getMangaForPanel(+id);

    const types = await Api().filters.getTypes();
    const genres = await Api().filters.getGenres();
    const categories = await Api().filters.getCategories();
    const statuses = await Api().filters.getStatuses();
    const restrictions = await Api().filters.getRestrictions();
    const filters = { types, genres, categories, statuses, restrictions };

    return { props: { filters, manga } };
  } catch (err) {
    console.warn('Edit manga page loading error', err);
    return {
      redirect: {
        destination: '/404',
        permament: false,
      },
      props: {},
    };
  }
};
