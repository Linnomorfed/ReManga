import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Panel } from '../../components';
import { Api } from '../../services/api';
import { FiltersDataResponce } from '../../models/IFilters';
import MainLayout from '../../layouts/MainLayout';

interface PanelProps {
  filters: FiltersDataResponce;
}

const PanelPage: NextPage<PanelProps> = ({ filters }) => {
  return (
    <MainLayout showFooter={false}>
      <Panel filters={filters} />
    </MainLayout>
  );
};

export default PanelPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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
