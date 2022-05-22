import { MangaSortEnum } from '../../models/IManga';

export const CatalogSortBy = [
  { id: 1, name: 'By novelty', filter: MangaSortEnum.createdAt },
  {
    id: 2,
    name: 'According to latest updates',
    filter: MangaSortEnum.createdAt,
  },
  { id: 3, name: 'Popularity', filter: MangaSortEnum.createdAt },
  { id: 4, name: 'According to the likes', filter: MangaSortEnum.createdAt },
  { id: 5, name: 'By views', filter: MangaSortEnum.views },
  { id: 6, name: 'By number of chapters', filter: MangaSortEnum.createdAt },
  { id: 7, name: "I'm lucky", filter: MangaSortEnum.createdAt },
];
