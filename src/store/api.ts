import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BinanceCard } from 'utils/types';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unistream-spread-backend.vercel.app/prices',
    paramsSerializer: data => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([ key, value ]) => {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(`${key}[]`, item.toString()));
        } else {
          params.append(key, value.toString());
        }
      });

      return params.toString();
    },
  }),
  endpoints: builder => ({
    getUnistreamRate: builder.query<[number, number], void>({
      query: () => 'unistream',
    }),
    getBinanceRate: builder.query<BinanceCard[], { bankNames: string[], amount: number }>({
      query: params => ({
        url: 'binance',
        params,
      }),
    }),
  }),
});

export default api;
