import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import storage from 'redux-persist/lib/storage/session';
import {
  persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const persistConfig = { key: "auth", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, counterSlice);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
