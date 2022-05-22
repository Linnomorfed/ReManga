import React from 'react';
import { CatalogFilters, FiltersDataResponce } from '../../models/IFilters';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { CatalogSortBy } from '../../utils/static/Catalog';
import CatalogMangaList from '../CatalogMangaList';
import Filters from '../Filters';
import Pagination from '../Pagination';
import SortBy from '../SortBy';
import styles from './Catalog.module.scss';

interface CatalogProps {
  filters: FiltersDataResponce;
  manga: ResponceManga[];
  itemsCount: number;
}

const Catalog: React.FC<CatalogProps> = ({ filters, manga, itemsCount }) => {
  const showPerPage = 3;
  const [mangaItems, setMangaItems] = React.useState<ResponceManga[]>(manga);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalCount, setTotalCount] = React.useState<number>(itemsCount);

  const [currentOrder, setCurrentOrder] = React.useState<'DESC' | 'ASC'>(
    'DESC'
  );

  const [currentSortById, setCurrentSortById] = React.useState<number>(5);
  const [currentSortBy, setCurrentSortBy] = React.useState(
    CatalogSortBy[4].filter
  );

  const [selectedFilters, setSelectedFilters] =
    React.useState<CatalogFilters>();

  const updateSelectedFilters = (filters: CatalogFilters) => {
    setSelectedFilters(filters);
  };

  const callbackId = (id: number) => {
    id && setCurrentSortById(id);
    id && setCurrentSortBy(CatalogSortBy[id - 1].filter);
  };

  const callbackOrder = (order: boolean) => {
    setCurrentOrder(order ? 'ASC' : 'DESC');
  };

  const toggleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      (async () => {
        const manga = await Api().manga.getMangaByQuery({
          sortby: currentSortBy,
          page: currentPage,
          take: showPerPage,
          orderby: currentOrder,
          types: selectedFilters?.types,
          genres: selectedFilters?.genres,
          categories: selectedFilters?.categories,
          restrictions: selectedFilters?.restrictions,
          statuses: selectedFilters?.statuses,
          excludedTypes: selectedFilters?.excludedTypes,
          excludedGenres: selectedFilters?.excludedGenres,
          excludedCategories: selectedFilters?.excludedCategories,
        });

        setMangaItems(manga.items);
        setTotalCount(manga.count);
      })();
    }
  }, [
    currentSortById,
    currentPage,
    currentOrder,
    currentSortBy,
    selectedFilters,
  ]);

  return (
    <>
      <div className={styles.header}>
        <div className='container'>
          <h1 className={styles.title}>Manga catalog</h1>
          <Filters filters={filters} returnFilters={updateSelectedFilters} />
        </div>
      </div>
      <div className='containerSmall'>
        <div className={styles.main}>
          <SortBy
            callbackId={callbackId}
            callbackOrder={callbackOrder}
            currentSortById={currentSortById}
          />
          <CatalogMangaList items={mangaItems} />
          <Pagination
            itemsPerPage={showPerPage}
            totalCount={totalCount}
            toggleCurrentPage={toggleCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Catalog;
