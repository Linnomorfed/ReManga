import React, { FC } from 'react';
import MangaCard from '../UI/Cards/MangaCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './MostPopularList.module.scss';
import 'swiper/css';

const MostPopularList: FC = () => {
  const ex = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className={styles.carousel}>
      <Swiper slidesPerView={10}>
        {ex.map((id) => (
          <SwiperSlide key={id}>
            {/* <MangaCard /> */}
            asd
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MostPopularList;
