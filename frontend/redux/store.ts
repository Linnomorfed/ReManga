import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { UserReducer } from './slices/userSlice';

const combinedReducer = combineReducers({
  user: UserReducer,
});

export function makeStore() {
  return configureStore({
    reducer: {
      user: UserReducer,
    },
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
