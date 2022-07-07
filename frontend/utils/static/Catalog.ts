import { MangaSortEnum } from '../../models/IManga';

export const CatalogSortBy = [
  { id: 1, name: 'By novelty', filter: MangaSortEnum.createdAt },
  {
    id: 2,
    name: 'According to latest updates',
    filter: MangaSortEnum.updates,
  },
  { id: 3, name: 'Popularity', filter: MangaSortEnum.popularity },
  { id: 4, name: 'According to the likes', filter: MangaSortEnum.likes },
  { id: 5, name: 'By views', filter: MangaSortEnum.views },
  { id: 6, name: 'By number of chapters', filter: MangaSortEnum.chaptersCount },
];
