import Image from 'next/image';
import React from 'react';
import { Api } from '../../../../services/api';
import { BlueBtn } from '../../../../ui-components';
import styles from './Steps.module.scss';

interface StepTwoProps {
  volume: number;
  chapter: number;
  mangaId: number;
  close: () => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  mangaId,
  volume,
  chapter,
  close,
}) => {
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);
  const [uploadedImages, setUploadedImg] = React.useState<File[]>([]);

  const fileSelectedHandler = (e: any) => {
    const imgs = e.target.files;
    setUploadedImg((prev) => [...prev, ...imgs]);
    [...imgs].map((file) => {
      setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const reverse = () => {
    const newUploadedImgs = uploadedImages.reverse();
    setPreviewImages([]);
    newUploadedImgs.map((file) => {
      setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const createChapters = async () => {
    try {
      const item = await Api().chapter.createChapter({
        mangaId: mangaId,
        chapter,
        volume,
      });

      // uploadedImages.map(async (page) => {
      //   const fd = new FormData();
      //   fd.append('page', page);
      //   fd.append('id', item.id.toString())

      //   await Api().chapter.addChapterPages(fd)
      // })

      // const createPage = async (page: any) => {
      //
      // }

      for (const page of uploadedImages) {
        const fd = new FormData();
        fd.append('page', page);
        fd.append('id', item.id.toString());
        await Api().chapter.addChapterPages(fd);
      }
    } catch (err) {
      console.warn('Creating chapter ', err);
      alert('Failed to create chapter: ' + err);
    } finally {
      close();
    }
  };

  return (
    <>
      <input type='file' multiple onChange={fileSelectedHandler} />
      <button onClick={reverse}>Reverse</button>
      {previewImages &&
        previewImages.map((imgs) => (
          <div className={styles.imgContainer} key={imgs}>
            <Image
              src={imgs}
              alt=''
              layout='responsive'
              className={styles.img}
              width='295'
              height='100%'
            />
          </div>
        ))}
      <div className={styles.btnWrapper}>
        <BlueBtn disabled={previewImages.length === 0} onClick={createChapters}>
          Create chapter
        </BlueBtn>
      </div>
    </>
  );
};
