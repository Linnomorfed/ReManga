import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { UserReducer } from './slices/userSlice';
import { AuthModalReducer } from './slices/authModalSlice';
import { ChapterReducer } from './slices/chapterSlice';
import { FiltersReducer } from './slices/filtersSlice';
import { SortByReducer } from './slices/sortBySlice';

const rootReducer = combineReducers({
  user: UserReducer,
  authModal: AuthModalReducer,
  chapters: ChapterReducer,
  filters: FiltersReducer,
  sortBy: SortByReducer,
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
