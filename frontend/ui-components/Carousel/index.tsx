import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React, { FC } from 'react';

import { MangaCard } from '../Cards/MangaCard';
import { ResponseManga } from '@/models/IManga';
import 'pure-react-carousel/dist/react-carousel.es.css';

import styles from './Carousel.module.scss';

interface SliderProps {
	items: ResponseManga[];
	title?: string;
	variant: 'popular' | 'new';
}

export const Carousel: FC<SliderProps> = ({ items, title, variant }) => {
	return (
		<div className={`${variant === 'popular' ? styles.bg : ''}`}>
			{title && <h5 className={styles.title}>{title}</h5>}

			<CarouselProvider
				naturalSlideWidth={variant === 'popular' ? 170 : 138}
				naturalSlideHeight={variant === 'popular' ? 350 : 300}
				totalSlides={20}
				visibleSlides={variant === 'popular' ? 12 : 6}
			>
				<Slider
					classNameTray={`${
						variant === 'popular' ? styles.tray : styles.traySm
					}`}
				>
					{items.map((obj, index) => (
						<Slide key={obj.id} index={index}>
							<MangaCard
								title={obj.title}
								url={obj.image.url}
								mangaId={obj.id}
								genres={obj.genres}
								type={obj.type.name}
								size={variant === 'popular' ? 'preview' : 'small'}
							/>
						</Slide>
					))}
				</Slider>
			</CarouselProvider>
		</div>
	);
};
