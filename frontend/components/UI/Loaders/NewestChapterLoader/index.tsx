import React from 'react';
import ContentLoader from 'react-content-loader';

export const NewestChapterLoader = () => (
  <ContentLoader
    speed={2}
    width={640}
    height={105}
    uniqueKey='newestChapter'
    viewBox='0 0 640 105'
    backgroundColor='#7878780d'
    foregroundColor='#78787824'>
    <rect x='80' y='12' rx='3' ry='3' width='165' height='6' />
    <rect x='80' y='36' rx='3' ry='3' width='110' height='6' />
    <rect x='200' y='36' rx='3' ry='3' width='90' height='6' />
    <rect x='80' y='62' rx='3' ry='3' width='80' height='6' />
    <rect x='6' y='2' rx='6' ry='6' width='63' height='96' />
  </ContentLoader>
);
