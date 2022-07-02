import { ChapterResult } from '../../models/IChapter';

export interface ChaptersState {
  isLoading: boolean;
  error: string;
  mangaChapters: ChapterResult[];
  currentChapter: ChapterResult | null;
  nextPageId: number | null;
  prevPageId: number | null;
  activePanelId: number;
}
