import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BinanceCard } from 'utils/types';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unistream-spread-backend.vercel.app/prices',
  }),
  endpoints: builder => ({
    getUnistreamRate: builder.query<[number, number], void>({
      query: () => 'unistream',
    }),
    getBinanceRate: builder.query<BinanceCard[], { bankName: string, amount: number }>({
      query: params => ({
        url: 'binance',
        params,
      }),
    }),
  }),
});

export default api;
