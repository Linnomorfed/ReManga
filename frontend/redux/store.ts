import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { UserReducer } from './User/slice';
import { ChapterReducer } from './Chapter/slice';
import { FiltersReducer } from './Filters/slice';
import { SortByReducer } from './SortBy/slice';
import { AuthModalReducer } from './Auth/slice';
import { MangaFiltersReducer } from './MangaFilters/slice';
import { DashboardReducer } from './Dashboard/slice';
import { MangaDataReducer } from './MangaData/slice';

const rootReducer = combineReducers({
  user: UserReducer,
  authModal: AuthModalReducer,
  chapter: ChapterReducer,
  filters: FiltersReducer,
  sortBy: SortByReducer,
  mangaFilters: MangaFiltersReducer,
  dashboard: DashboardReducer,
  mangaData: MangaDataReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });
