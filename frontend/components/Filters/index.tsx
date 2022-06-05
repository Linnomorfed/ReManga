import React from 'react';
import styles from './Filters.module.scss';
import { Dropdown } from '../UI';
import { CatalogFilters, FiltersDataResponce } from '../../models/IFilters';

interface FiltersProps {
  filters: FiltersDataResponce;
  returnFilters: (filters: CatalogFilters) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, returnFilters }) => {
  const [isShowMore, setIsShowMore] = React.useState(false);

  const [selectedTypes, setSelectedTypes] = React.useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );
  const [selectedStatuses, setSelectedStatuses] = React.useState<number[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = React.useState<
    number[]
  >([]);
  const [excludedTypes, setExcludedTypes] = React.useState<number[]>([]);
  const [excludedGenres, setExcludedGenres] = React.useState<number[]>([]);
  const [excludedCategories, setExcludedCategories] = React.useState<number[]>(
    []
  );
  const [resetFilters, setResetFilters] = React.useState<boolean>(false);

  const selectedFilters = React.useMemo(
    () => ({
      types: selectedTypes,
      genres: selectedGenres,
      categories: selectedCategories,
      statuses: selectedStatuses,
      restrictions: selectedRestrictions,
      excludedTypes: excludedTypes,
      excludedGenres: excludedGenres,
      excludedCategories: excludedCategories,
    }),
    [
      selectedTypes,
      selectedGenres,
      selectedCategories,
      selectedStatuses,
      selectedRestrictions,
      excludedTypes,
      excludedGenres,
      excludedCategories,
    ]
  );

  React.useEffect(() => {}, [selectedFilters]);

  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      return () => returnFilters(selectedFilters);
    }
  }, [selectedFilters]);

  const setTypeFilters = (ids: number[]) => {
    setSelectedTypes(ids);
  };
  const setGenreFilters = (ids: number[]) => {
    setSelectedGenres(ids);
  };
  const setCategoryFilters = (ids: number[]) => {
    setSelectedCategories(ids);
  };
  const setStatusFilters = (ids: number[]) => {
    setSelectedStatuses(ids);
  };
  const setRestrictionFilters = (ids: number[]) => {
    setSelectedRestrictions(ids);
  };

  const excludeTypeFilters = (ids: number[]) => {
    setExcludedTypes(ids);
  };
  const excludeGenreFilters = (ids: number[]) => {
    setExcludedGenres(ids);
  };
  const excludeCategoryFilters = (ids: number[]) => {
    setExcludedCategories(ids);
  };

  const toogleShowMoreVisibility = () => {
    setIsShowMore(!isShowMore);
  };

  const toggleResetFilters = () => {
    setResetFilters(true);
  };

  const toggleResetBackFilters = () => {
    setResetFilters(false);
  };

  return (
    <div>
      <div className={styles.filters}>
        <div>
          <Dropdown
            type='default'
            title='Types'
            items={filters.types}
            returnId={setTypeFilters}
            resetFilters={resetFilters}
            toggleResetFilters={toggleResetBackFilters}
          />
        </div>
        <div>
          <Dropdown
            type='default'
            title='Genres'
            items={filters.genres}
            returnId={setGenreFilters}
            resetFilters={resetFilters}
            toggleResetFilters={toggleResetBackFilters}
          />
        </div>
        <div>
          <Dropdown
            type='default'
            title='Categories'
            items={filters.categories}
            returnId={setCategoryFilters}
            resetFilters={resetFilters}
            toggleResetFilters={toggleResetBackFilters}
          />
        </div>
      </div>

      <div
        className={`${isShowMore ? styles.filtersShow : styles.filtersHide}`}>
        <div className={styles.filters}>
          <div>
            <Dropdown
              type='default'
              title='Status'
              items={filters.statuses}
              returnId={setStatusFilters}
              resetFilters={resetFilters}
              toggleResetFilters={toggleResetBackFilters}
            />
          </div>
          <div>
            <Dropdown
              type='default'
              title='Restrictions'
              items={filters.restrictions}
              returnId={setRestrictionFilters}
              resetFilters={resetFilters}
              toggleResetFilters={toggleResetBackFilters}
            />
          </div>
        </div>
        <h5 className={styles.subtitle}>Exclude</h5>
        <div className={styles.filters}>
          <div>
            <Dropdown
              type='default'
              title='Types'
              items={filters.types}
              returnId={excludeTypeFilters}
              resetFilters={resetFilters}
              toggleResetFilters={toggleResetBackFilters}
            />
          </div>
          <div>
            <Dropdown
              type='default'
              title='Genres'
              items={filters.genres}
              returnId={excludeGenreFilters}
              resetFilters={resetFilters}
              toggleResetFilters={toggleResetBackFilters}
            />
          </div>
          <div>
            <Dropdown
              type='default'
              title='Categories'
              items={filters.categories}
              returnId={excludeCategoryFilters}
              resetFilters={resetFilters}
              toggleResetFilters={toggleResetBackFilters}
            />
          </div>
        </div>
      </div>

      <div>
        <button onClick={toogleShowMoreVisibility} className={styles.btn}>
          {isShowMore ? 'hide' : 'more'} filters
        </button>
        <button className={styles.btn} onClick={toggleResetFilters}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
