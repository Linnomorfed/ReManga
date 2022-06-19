import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiltersDataResponce } from '../../models/IFilters';
import { ResponceManga } from '../../models/IManga';
import { Api } from '../../services/api';
import { Dropdown } from '../UI';
import styles from './Panel.module.scss';

const Editor = dynamic(
  () => import('../UI/Editor').then((m: any) => m.Editor),
  {
    ssr: false,
  }
);

interface MangaPanelProps {
  data?: ResponceManga;
  filters: FiltersDataResponce;
}

const MangaPanel: React.FC<MangaPanelProps> = ({ data, filters }) => {
  const router = useRouter();

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
  const [type, setType] = useState<number | null>(data ? data.type.id : null);
  const [restriction, setRestriction] = useState<number | null>(
    data ? data.restriction.id : null
  );
  const [status, setStatus] = useState<number | null>(
    data ? data.status.id : null
  );
  const [genres, setGenres] = useState<number[]>(defaultGenres);
  const [categories, setCategories] = useState<number[]>(defaultCategories);

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

  const toggleType = (id: number[]) => {
    setType(id[0]);
  };
  const toggleStatus = (id: number[]) => {
    setStatus(id[0]);
  };
  const toggleRestriction = (id: number[]) => {
    setRestriction(id[0]);
  };
  const toggleGenres = (id: number[]) => {
    setGenres(id);
  };
  const toggleCategories = (id: number[]) => {
    setCategories(id);
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
          type: type,
          restriction: restriction,
          status: status,
          genreIds: genres,
          categoryIds: categories,
        });

        const formData = new FormData();
        formData.append('image', uploadedImg);
        formData.append('id', manga.id.toString());

        await Api().files.addImage(formData);
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
            <Dropdown
              type='manga'
              items={filters.types}
              title={'Types'}
              returnId={toggleType}
              selected={type}
            />
          </div>
          <div className={styles.block}>
            <label>Genres:</label>
            <Dropdown
              type='default'
              items={filters.genres}
              title={'Genres'}
              returnId={toggleGenres}
              selectedArr={genres}
            />
          </div>

          <div className={styles.block}>
            <label>Categories:</label>
            <Dropdown
              type='default'
              items={filters.categories}
              title={'Categories'}
              returnId={toggleCategories}
              selectedArr={categories}
            />
          </div>

          <div className={styles.block}>
            <label>Status:</label>
            <Dropdown
              type='manga'
              items={filters.statuses}
              title={'Statuses'}
              returnId={toggleStatus}
              selected={status}
            />
          </div>

          <div className={styles.block}>
            <label>Restriction:</label>
            <Dropdown
              type='manga'
              items={filters.restrictions}
              title={'Restrictions'}
              returnId={toggleRestriction}
              selected={restriction}
            />
          </div>

          <div className={styles.block}>
            <label>Descrsiption:</label>
            <div className={styles.editor}>
              <Editor
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

export default MangaPanel;
