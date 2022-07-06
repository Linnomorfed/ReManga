import React from 'react';
import styles from './Filters.module.scss';
import { MultipleDropdown } from '../../UI';
import { FiltersDataResponse } from '../../../models/IFilters';
import {
  resetFilters,
  setCategories,
  setExcludedCategories,
  setExcludedGenres,
  setExcludedTypes,
  setGenres,
  setRestrictions,
  setStatuses,
  setTypes,
} from '../../../redux/Filters/slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectFiltersData } from '../../../redux/Filters/selectors';

interface FiltersProps {
  filters: FiltersDataResponse;
}

export const Filters: React.FC<FiltersProps> = ({ filters }) => {
  const dispatch = useAppDispatch();
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
  const [isShowMore, setIsShowMore] = React.useState(false);

  const toogleShowMoreVisibility = () => {
    setIsShowMore(!isShowMore);
  };

  const resetAllFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div>
      <div className={styles.filters}>
        <div>
          <MultipleDropdown
            defaultTitle='Types'
            items={filters.types}
            action={setTypes}
            state={types}
          />
        </div>
        <div>
          <MultipleDropdown
            defaultTitle='Genres'
            items={filters.genres}
            action={setGenres}
            state={genres}
          />
        </div>
        <div>
          <MultipleDropdown
            defaultTitle='Categories'
            items={filters.categories}
            action={setCategories}
            state={categories}
          />
        </div>
      </div>

      <div
        className={`${isShowMore ? styles.filtersShow : styles.filtersHide}`}>
        <div className={styles.filters}>
          <div>
            <MultipleDropdown
              defaultTitle='Statuses'
              items={filters.statuses}
              action={setStatuses}
              state={statuses}
            />
          </div>
          <div>
            <MultipleDropdown
              defaultTitle='Restrictions'
              items={filters.restrictions}
              action={setRestrictions}
              state={restrictions}
            />
          </div>
        </div>
        <h5 className={styles.subtitle}>Exclude</h5>
        <div className={styles.filters}>
          <div>
            <MultipleDropdown
              defaultTitle='Types'
              items={filters.types}
              action={setExcludedTypes}
              state={excludedTypes}
            />
          </div>
          <div>
            <MultipleDropdown
              defaultTitle='Genres'
              items={filters.genres}
              action={setExcludedGenres}
              state={excludedGenres}
            />
          </div>
          <div>
            <MultipleDropdown
              defaultTitle='Categories'
              items={filters.categories}
              action={setExcludedCategories}
              state={excludedCategories}
            />
          </div>
        </div>
      </div>

      <div>
        <button onClick={toogleShowMoreVisibility} className={styles.btn}>
          {isShowMore ? 'hide' : 'more'} filters
        </button>
        <button className={styles.btn} onClick={resetAllFilters}>
          reset
        </button>
      </div>
    </div>
  );
};
