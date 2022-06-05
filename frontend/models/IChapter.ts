export interface CreateChapterDto {
  mangaId: number;
  chapter: number;
  volume: number;
}

export interface ChapterResult {
  id: number;
  volume: number;
  chapter_number: number;
  likes: number;
  mangaId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SearchChapterDto {
  mangaId: number;
  orderBy?: 'DESC' | 'ASC';
}
