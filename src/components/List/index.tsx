import React from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import api from 'store/api';
import offerSlice from 'store/offerSlice';

import Card from 'components/Card';

import styles from './style.module.css';

const List = () => {
  const dispatch = useAppDispatch();
  const { bank } = useSelector((state: RootState) => state.form);
  const { isSuccess, data } = api.useGetBinanceRateQuery({
    bankNames: ['sber', 'raif', 'tink'],
    amount: bank.numValue,
  }, {
    pollingInterval: 1000,
  });
  const offer = useSelector((state: RootState) => state.offer);
  const { setOffer } = offerSlice.actions;

  if (isSuccess) {
    return (
      <div className={styles.root}>
        <div className={styles.list}>
          {data.map(card => (
            <Card
              key={card.id}
              {...card}
              isActive={offer ? card.id === offer.id : false}
              onClick={() => dispatch(setOffer(card))}
            />
          ))}
        </div>
      </div>
    );
  }

  return <pre>loading</pre>
};

export default List;
