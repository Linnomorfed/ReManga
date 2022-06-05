import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './HotNewsList.module.scss';
import MangaCard from '../UI/Cards/MangaCard';
const ex = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const HotNewsList: FC = () => {
  return (
    <>
      <h5 className={styles.title}> Hot news</h5>
      <Swiper slidesPerView={5}>
        {ex.map((id) => (
          <SwiperSlide key={id}>
            {/* <MangaCard variant='small' /> */}
            asd
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HotNewsList;
