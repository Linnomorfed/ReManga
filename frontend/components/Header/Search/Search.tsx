import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ClearSvg, SearchSvg } from '../../../assets/svgs';
import { ResponceManga } from '../../../models/IManga';
import { Api } from '../../../services/api';
import styles from './Search.module.scss';

const Search = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<ResponceManga[]>([]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onClickClearButton = () => {
    setSearchValue('');
  };

  const search = async () => {
    try {
      const res = await Api().manga.getMangaByQuery({
        keyword: searchValue,
        take: 5,
      });
      setSearchResult(res.items);
    } catch (err) {
      console.log('Search ', err);
    }
  };

  React.useEffect(() => {
    {
      searchValue.length >= 3 && search();
    }
  }, [searchValue]);

  return (
    <div>
      <div className={styles.inputComp}>
        <button className={styles.searchSvg}>
          <SearchSvg fill={'#f2f2f2'} w={24} h={24} />
        </button>
        <input
          className={styles.input}
          onChange={onChangeInputValue}
          type='text'
          value={searchValue}
          placeholder='What are we looking for?'
        />
        {searchValue && (
          <button className={styles.clear} onClick={onClickClearButton}>
            <ClearSvg fill={'#f2f2f2'} w={20} h={20} />
          </button>
        )}
      </div>
      {searchValue.length > 0 && searchResult.length > 0 && (
        <div className={styles.searchResult}>
          {searchResult.map((obj) => (
            <>
              <Link href={`/manga/${obj.id}`}>
                <a onClick={onClickClearButton}>
                  <div className={styles.searchResultElement}>
                    <div className={styles.searchResultImgContainer}>
                      <Image
                        className={styles.searchResultImg}
                        src={obj.image.url}
                        alt={obj.title}
                        layout='fixed'
                        width='30px'
                        height='40px'
                      />
                    </div>
                    <div>
                      <p className={styles.searchResultText}>{obj.title}</p>
                      <p className={styles.searchResultText}>
                        {obj.otherTitles}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
