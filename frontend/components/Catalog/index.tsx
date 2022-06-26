import React from 'react';
import { FiltersDataResponce } from '../../models/IFilters';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { CatalogSortBy } from '../../utils/static/Catalog';
import Filters from './Filters';
import Pagination from '../UI/Pagination';
import SortBy from './SortBy';
import styles from './Catalog.module.scss';
import { MangaCard } from '../UI';
import { useAppSelector } from '../../hooks/redux';
import { selectFiltersData } from '../../redux/slices/filtersSlice';
import { selectSortByData } from '../../redux/slices/sortBySlice';
import useDidMountEffect from '../../hooks/useDidMountEffect';

interface CatalogProps {
  filters: FiltersDataResponce;
  manga: ResponceManga[];
  itemsCount: number;
}

const Catalog: React.FC<CatalogProps> = ({ filters, manga, itemsCount }) => {
  const showPerPage = 3;

  const {
    types,
    genres,
    categories,
    restrictions,
    statuses,
    excludedTypes,
    excludedGenres,
    excludedCategories,
  } = useAppSelector(selectFiltersData);

  const { catalogSortBy } = useAppSelector(selectSortByData);

  const [mangaItems, setMangaItems] = React.useState<ResponceManga[]>(manga);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalCount, setTotalCount] = React.useState<number>(itemsCount);
  const [cardVariant, setCardVariant] = React.useState<'block' | 'list'>(
    'block'
  );
  const [currentOrder, setCurrentOrder] = React.useState<'DESC' | 'ASC'>(
    'DESC'
  );

  const callbackOrder = (order: boolean) => {
    setCurrentOrder(order ? 'ASC' : 'DESC');
  };

  const toggleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const toggleCardType = (type: 'list' | 'block') => {
    setCardVariant(type);
  };

  useDidMountEffect(() => {
    (async () => {
      const manga = await Api().manga.getMangaByQuery({
        sortby: CatalogSortBy[catalogSortBy - 1].filter,
        page: currentPage,
        take: showPerPage,
        orderby: currentOrder,
        types,
        genres,
        categories,
        restrictions,
        statuses,
        excludedTypes,
        excludedGenres,
        excludedCategories,
      });

      setMangaItems(manga.items);
      setTotalCount(manga.count);
    })();
  }, [
    types,
    genres,
    categories,
    restrictions,
    statuses,
    excludedTypes,
    excludedGenres,
    excludedCategories,
    catalogSortBy,
    currentOrder,
    currentPage,
  ]);

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
          <SortBy
            callbackOrder={callbackOrder}
            returnCardVariant={toggleCardType}
          />
          <div className={styles.mangaList}>
            {mangaItems.map((obj) => (
              <MangaCard
                key={obj.id}
                title={obj.title}
                url={obj.image.url}
                mangaId={obj.id}
                rating={obj.rating}
                type={obj.type.name}
                genres={obj.genres}
              />
            ))}
          </div>
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
