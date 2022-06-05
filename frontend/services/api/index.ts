import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { BookmarksApi } from './bookmarks';
import { ChapterApi } from './chapter';
import { CommentsApi } from './comments';
import { FilesApi } from './files';
import { FiltersApi } from './filters';
import { MangaApi } from './manga';
import { RatingApi } from './rating';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  manga: ReturnType<typeof MangaApi>;
  filters: ReturnType<typeof FiltersApi>;
  comments: ReturnType<typeof CommentsApi>;
  bookmarks: ReturnType<typeof BookmarksApi>;
  files: ReturnType<typeof FilesApi>;
  rating: ReturnType<typeof RatingApi>;
  chapter: ReturnType<typeof ChapterApi>;
};
export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.remangaToken;

  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const apis = {
    user: UserApi(instance),
    filters: FiltersApi(instance),
    manga: MangaApi(instance),
    comments: CommentsApi(instance),
    bookmarks: BookmarksApi(instance),
    files: FilesApi(instance),
    rating: RatingApi(instance),
    chapter: ChapterApi(instance),
  };

  return { ...apis };
};
