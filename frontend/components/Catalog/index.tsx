import React from 'react';
import { FiltersDataResponce } from '../../models/IFilters';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { CatalogFilter } from '../../utils/static/Catalog';
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
  const [currentFilterId, setCurrentFilterId] = React.useState<number>(5);
  const [currentFilter, setCurrentFilter] = React.useState(
    CatalogFilter[4].filter
  );

  const callbackId = (id: number) => {
    setCurrentFilterId(id);
    setCurrentFilter(CatalogFilter[id - 1].filter);
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
          filter: currentFilter,
          page: currentPage,
          take: showPerPage,
          orderby: currentOrder,
        });

        setMangaItems(manga.items);
        setTotalCount(manga.count);
      })();
    }
  }, [currentFilterId, currentPage, currentOrder, currentFilter]);

  return (
    <>
      <div className={styles.header}>
        <div className='container'>
          <h1 className={styles.title}>Manga catalog</h1>
          <Filters filters={filters} />
        </div>
      </div>
      <div className='containerSmall'>
        <div className={styles.main}>
          <SortBy callbackId={callbackId} callbackOrder={callbackOrder} />
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
