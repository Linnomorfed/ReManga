import React from 'react';

import { useAppSelector } from '../../hooks/redux';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { FiltersDataResponse } from '../../models/IFilters';
import { ResponseManga } from '../../models/IManga';
import { selectFiltersData } from '../../redux/Filters/selectors';
import { selectSortByData } from '../../redux/SortBy/selectors';
import { Api } from '../../services/api';
import { MangaCard, MangaCardBlock } from '../../ui-components';
import { Pagination } from '../../ui-components/Pagination';
import { CatalogSortBy } from '../../utils/static/Catalog';

import styles from './Catalog.module.scss';
import { Filters } from './Filters';
import { SortBy } from './SortBy';

interface CatalogProps {
	filters: FiltersDataResponse;
	manga: ResponseManga[];
	itemsCount: number;
}

export const Catalog: React.FC<CatalogProps> = ({
	filters,
	manga,
	itemsCount,
}) => {
	const showPerPage = Number(
		process.env.NEXT_PUBLIC_CATALOG_SHOW_MANGA_PER_PAGE
	);

	const {
		types,
		genres,
		categories,
		restrictions,
		statuses,
		excludedTypes,
		excludedGenres,
		excludedCategories,
	} = useAppSelector(selectFiltersData);

	const { catalogSortBy } = useAppSelector(selectSortByData);

	const cardVariantValue =
		typeof window !== 'undefined'
			? localStorage.getItem('cardVariant') || 'list'
			: 'list';

	const [mangaItems, setMangaItems] = React.useState<ResponseManga[]>(manga);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [totalCount, setTotalCount] = React.useState<number>(itemsCount);
	const [cardVariant, setCardVariant] = React.useState<
		'block' | 'list' | string
	>(cardVariantValue);
	const [currentOrder, setCurrentOrder] = React.useState<'DESC' | 'ASC'>(
		'DESC'
	);

	const callbackOrder = React.useCallback((order: boolean) => {
		setCurrentOrder(order ? 'ASC' : 'DESC');
	}, []);

	const toggleCurrentPage = React.useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const toggleCardType = React.useCallback((type: 'list' | 'block') => {
		setCardVariant(type);
		if (typeof window !== 'undefined') {
			localStorage.setItem('cardVariant', type);
		}
	}, []);

	useDidMountEffect(() => {
		(async () => {
			const manga = await Api().manga.getMangaByQuery({
				sortby: CatalogSortBy[catalogSortBy - 1].filter,
				page: currentPage,
				take: showPerPage,
				orderby: currentOrder,
				types,
				genres,
				categories,
				restrictions,
				statuses,
				excludedTypes,
				excludedGenres,
				excludedCategories,
			});

			setMangaItems(manga.items);
			setTotalCount(manga.count);
		})();
	}, [
		types,
		genres,
		categories,
		restrictions,
		statuses,
		excludedTypes,
		excludedGenres,
		excludedCategories,
		catalogSortBy,
		currentOrder,
		currentPage,
	]);

	return (
		<>
			<Filters filters={filters} />
			<div className="containerSmall">
				<div className={styles.main}>
					<SortBy
						callbackOrder={callbackOrder}
						returnCardVariant={toggleCardType}
					/>
					<div className={styles.mangaList}>
						{mangaItems &&
							mangaItems.map((obj) =>
								cardVariant === 'list' ? (
									<MangaCard
										key={obj.id}
										title={obj.title}
										url={obj.image.url}
										mangaId={obj.id}
										rating={obj.rating}
										type={obj.type.name}
										genres={obj.genres}
									/>
								) : (
									<MangaCardBlock
										key={obj.id}
										id={obj.id}
										imageUrl={obj.image.url}
										type={obj.type.name}
										title={obj.title}
										genres={obj.genres}
										rating={obj.rating}
										views={obj.views}
										likes={obj.likes_count}
									/>
								)
							)}
					</div>
					<Pagination
						itemsPerPage={showPerPage}
						totalCount={totalCount}
						toggleCurrentPage={toggleCurrentPage}
					/>
				</div>
			</div>
		</>
	);
};
