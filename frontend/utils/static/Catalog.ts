import { MangaFilterEnum } from '../../models/IManga';

export const CatalogFilter = [
  { id: 1, name: 'By novelty', filter: MangaFilterEnum.createdAt },
  {
    id: 2,
    name: 'According to latest updates',
    filter: MangaFilterEnum.createdAt,
  },
  { id: 3, name: 'Popularity', filter: MangaFilterEnum.createdAt },
  { id: 4, name: 'According to the likes', filter: MangaFilterEnum.createdAt },
  { id: 5, name: 'By views', filter: MangaFilterEnum.views },
  { id: 6, name: 'By number of chapters', filter: MangaFilterEnum.createdAt },
  { id: 7, name: "I'm lucky", filter: MangaFilterEnum.createdAt },
];
