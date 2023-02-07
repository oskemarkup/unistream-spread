import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormItem = {
  value: string,
  numValue: number,
};

type FormItemWithUnit = FormItem & {
  isFixed: boolean,
}

type AppState = {
  bank: FormItem,
  bankFee: FormItemWithUnit,
  fee: FormItem,
  networkFee: FormItemWithUnit,
};

const initialState: AppState = {
  bank: {
    value: '',
    numValue: 0,
  },
  bankFee: {
    value: '',
    numValue: 0,
    isFixed: true,
  },
  fee: {
    value: '',
    numValue: 0,
  },
  networkFee: {
    value: '',
    numValue: 0,
    isFixed: true,
  },
};

const getInitialState = (): AppState => {
  const localStorageValue = localStorage.getItem('form');

  if (!localStorageValue) {
    return initialState;
  }

  try {
    return JSON.parse(localStorageValue);
  } catch {
    return initialState;
  }
};

export type FieldName = 'bank' | 'bankFee' | 'fee' | 'networkFee';

export type FieldWithUnitName = 'bankFee' | 'networkFee';

const slice = createSlice({
  name: 'form',
  initialState: getInitialState(),
  reducers: {
    updateValue: (state, action: PayloadAction<{ name: FieldName, value: string }>) => {
      state[action.payload.name].value = action.payload.value;
    },
    updateNumValue: (state, action: PayloadAction<{ name: FieldName, value: number }>) => {
      state[action.payload.name].numValue = action.payload.value;
    },
    updateFixed: (state, action: PayloadAction<{ name: FieldWithUnitName, value: boolean }>) => {
      state[action.payload.name].isFixed = action.payload.value;
    },
  },
});

export default slice;
