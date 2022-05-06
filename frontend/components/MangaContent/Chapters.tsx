import React from 'react';
import { Api } from '../../services/api';

const Chapters = () => {
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);
  const [uploadedImages, setUploadedImg] = React.useState<any[]>([]);

  const fileSelectedHandler = (e: any) => {
    const imgs = e.target.files;
    setUploadedImg((prev) => [...prev, ...imgs]);
    [...imgs].map((file) => {
      setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };
  console.log(uploadedImages);

  const createChapters = async () => {
    try {
      const formData = new FormData();
      uploadedImages.forEach((file) => {
        formData.append('images', file);
      });

      const files = await Api().files.addChapter(formData);

      return files.data;
    } catch (err) {
      console.warn('Creating chapter ', err);
      alert('Failed to create chapter: ' + err);
    }
  };

  return (
    <div>
      <input
        type='file'
        multiple
        placeholder='ADD CHAPTERS'
        onChange={fileSelectedHandler}
      />
      {previewImages.map((imgs) => (
        <img key={imgs} src={imgs} alt='' />
      ))}
      <button onClick={createChapters}>SEND</button>
    </div>
  );
};

export default Chapters;
