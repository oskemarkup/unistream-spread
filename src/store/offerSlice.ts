import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BinanceCard } from 'utils/types';

type AppState = null | {
  id: string,
  price: number,
};

const slice = createSlice({
  name: 'offer',
  initialState: null as AppState,
  reducers: {
    setOffer: (state, action: PayloadAction<BinanceCard>) => ({
      id: action.payload.id,
      price: action.payload.rate,
    }),
  },
});

export default slice;
