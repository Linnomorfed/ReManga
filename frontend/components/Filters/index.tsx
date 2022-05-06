import React from 'react';
import styles from './Filters.module.scss';
import { Dropdown } from '../UI';
import { FiltersDataResponce, ResponceFilter } from '../../models/IFilters';

interface FiltersProps {
  filters: FiltersDataResponce;
}

const Filters: React.FC<FiltersProps> = ({ filters }) => {
  const [isShowMore, setIsShowMore] = React.useState(false);
  console.log(filters);

  return (
    <div>
      <div className={styles.filters}>
        <div>
          <Dropdown type='default' title='Types' items={filters.types} />
        </div>
        <div>
          <Dropdown type='default' title='Genres' items={filters.genres} />
        </div>
        <div>
          <Dropdown
            type='default'
            title='Categories'
            items={filters.categories}
          />
        </div>
      </div>
      {isShowMore && (
        <div>
          <div className={styles.filters}>
            <div>
              <Dropdown
                type='default'
                title='Status'
                items={filters.statuses}
              />
            </div>
            <div>
              <Dropdown
                type='default'
                title='Restrictions'
                items={filters.restrictions}
              />
            </div>
          </div>
          <h5 className={styles.subtitle}>Exclude</h5>
          <div className={styles.filters}>
            <div>
              <Dropdown type='default' title='Types' items={filters.types} />
            </div>
            <div>
              <Dropdown type='default' title='Genres' items={filters.genres} />
            </div>
            <div>
              <Dropdown
                type='default'
                title='Categories'
                items={filters.categories}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <button
          onClick={() => setIsShowMore(!isShowMore)}
          className={styles.btn}>
          {isShowMore ? 'hide' : 'more'} filters
        </button>
        <button className={styles.btn}>reset</button>
      </div>
    </div>
  );
};

export default Filters;
