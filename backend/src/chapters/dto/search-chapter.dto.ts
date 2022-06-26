export class SearchChapterDto {
  mangaId?: string;
  orderBy?: 'DESC' | 'ASC';

  isOnlyMyBookmarks?: 1 | 0;
}
