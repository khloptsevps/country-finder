import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import * as api from './config';
import { themeReducer } from './features/theme/theme-slice';
import { controlsReducer } from './features/controls/controls-slice';
import { countryReducer } from './features/countries/countries-slice';
import { detailsReducer } from './features/details/details-slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countryReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});

// Выводим типы RootState и AppDispatch из store
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
// используем вместо useDispatch во всем приложении. офф докс.
export const useAppDispatch: () => AppDispatch = useDispatch;
