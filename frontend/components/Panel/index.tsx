import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectMangaFiltersData } from '../../redux/MangaFilters/selectors';
import {
  resetMangaFilters,
  setDefaultCategories,
  setDefaultGenres,
  setMangaCategories,
  setMangaGenres,
  setMangaRestriction,
  setMangaStatus,
  setMangaType,
} from '../../redux/MangaFilters/slice';
import { Api } from '../../services/api';
import { MultipleDropdown, SingleDropdown } from '../UI';
import { MangaPanelProps } from './IPanelProps';
import styles from './Panel.module.scss';

const Editor = dynamic(
  () => import('../UI/Editor').then((m: any) => m.Editor),
  {
    ssr: false,
  }
);

export const Panel: React.FC<MangaPanelProps> = ({ data, filters }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    mangaType,
    mangaGenres,
    mangaCategories,
    mangaRestriction,
    mangaStatus,
  } = useAppSelector(selectMangaFiltersData);

  const defaultGenres = data ? data.genres.map(({ id }) => id) : [];
  const defaultCategories = data ? data.categories.map(({ id }) => id) : [];

  const [isLoading, setLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState<string | Blob>('');
  const [imagePreview, setImagePreview] = React.useState(
    data
      ? data.image.url
      : 'https://api.remanga.org/media/titles/fry-my-life/ece968b2113d49dee6a6ce4bf35be9c5.jpg'
  );
  const [title, setTitle] = useState(data ? data.title : '');
  const [otherTitles, setOtherTitles] = useState(data ? data.otherTitles : '');
  const [blocks, setBlocks] = useState(data ? data.blocks : []);
  const [issueYear, setIssueYear] = useState<number>(
    data ? data.issueYear : 2022
  );

  React.useEffect(() => {
    const loadData = () => {
      dispatch(setDefaultGenres(defaultGenres));
      dispatch(setDefaultCategories(defaultCategories));
      data && dispatch(setMangaType(data.type.id));
      data && dispatch(setMangaRestriction(data.restriction.id));
      data && dispatch(setMangaStatus(data.status.id));
    };
    data && loadData();
  }, []);

  const fileUploadHandler = (e: any) => {
    const img = e.target.files[0];
    setImagePreview(URL.createObjectURL(img));
    setUploadedImg(img);
  };

  const editorHandler = (blocks: OutputData['blocks']) => {
    setBlocks(blocks);
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const otherTitlesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherTitles(e.target.value);
  };
  const issueYearHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueYear(Number(e.target.value));
  };

  const onCreateManga = async () => {
    try {
      setLoading(true);

      if (data) {
        //update
      } else {
        const manga = await Api().manga.createManga({
          title,
          otherTitles,
          blocks,
          issueYear,
          type: mangaType,
          restriction: mangaRestriction,
          status: mangaStatus,
          genreIds: mangaGenres,
          categoryIds: mangaCategories,
        });

        const formData = new FormData();
        formData.append('image', uploadedImg);
        formData.append('id', manga.id.toString());

        await Api().files.addImage(formData);
        dispatch(resetMangaFilters());
        router.push(`/manga/${manga.id}`);
      }
    } catch (err) {
      console.warn('Creating manga', err);
      alert('Failed to create Manga: ' + err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='containerSmall'>
        <div className={styles.panel}>
          <div className={styles.block}>
            <label>Title:</label>
            <input
              value={title}
              onChange={titleHandler}
              className={styles.input}
              type='text'
            />
          </div>
          <div className={styles.block}>
            <label>Other titles:</label>
            <input
              className={styles.input}
              value={otherTitles}
              type='text'
              onChange={otherTitlesHandler}
            />
          </div>
          <div className={styles.block}>
            <label>Type:</label>
            <SingleDropdown
              variant='manga'
              items={filters.types}
              action={setMangaType}
              state={mangaType}
              defaultTitle='Types'
            />
          </div>
          <div className={styles.block}>
            <label>Genres:</label>
            <MultipleDropdown
              items={filters.genres}
              defaultTitle='Genres'
              action={setMangaGenres}
              state={mangaGenres}
            />
          </div>

          <div className={styles.block}>
            <label>Categories:</label>
            <MultipleDropdown
              items={filters.categories}
              defaultTitle='Categories'
              action={setMangaCategories}
              state={mangaCategories}
            />
          </div>

          <div className={styles.block}>
            <label>Status:</label>
            <SingleDropdown
              items={filters.statuses}
              defaultTitle='Statuses'
              action={setMangaStatus}
              state={mangaStatus}
            />
          </div>

          <div className={styles.block}>
            <label>Restriction:</label>
            <SingleDropdown
              items={filters.restrictions}
              defaultTitle='Restrictions'
              action={setMangaRestriction}
              state={mangaRestriction}
            />
          </div>

          <div className={styles.block}>
            <label>Descrsiption:</label>
            <div className={styles.editor}>
              <Editor
                // @ts-ignore
                ininialBlocks={blocks}
                onChange={editorHandler}
                defaultValue={blocks}
              />
            </div>
          </div>

          <div className={styles.block}>
            <label>Year of issue:</label>
            <input
              className={styles.input}
              type='number'
              value={issueYear}
              onChange={issueYearHandler}
            />
          </div>

          <div className={styles.block}>
            <label>Link to original/announcement:</label>
            <input className={styles.input} type='text' />
          </div>

          <div className={styles.block}>
            <label>Picture:</label>
            <input
              className={styles.input}
              type='file'
              onChange={fileUploadHandler}
            />
            <Image src={imagePreview} width={150} height={225} alt='img' />
          </div>

          <button disabled={isLoading} onClick={onCreateManga}>
            Create Manga
          </button>
        </div>
      </div>
    </>
  );
};
