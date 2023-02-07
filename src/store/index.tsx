import { Middleware, configureStore, isAnyOf } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import api from 'store/api';
import formSlice from 'store/formSlice';
import offerSlice from 'store/offerSlice';

const settingsMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (isAnyOf(formSlice.actions.updateValue, formSlice.actions.updateNumValue, formSlice.actions.updateFixed)) {
    const formState = store.getState().form;

    localStorage.setItem('form', JSON.stringify(formState));
  }

  return result;
}

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [formSlice.name]: formSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, settingsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
