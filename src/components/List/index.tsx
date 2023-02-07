import React from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import api from 'store/api';
import offerSlice from 'store/offerSlice';

import Card from 'components/Card';

type ListProps = {
  bankName: string,
};

const List = ({ bankName }: ListProps) => {
  const dispatch = useAppDispatch();
  const { bank } = useSelector((state: RootState) => state.form);
  const { isSuccess, data, refetch, isFetching } = api.useGetBinanceRateQuery({ bankName, amount: bank.numValue });
  const offer = useSelector((state: RootState) => state.offer);
  const { setOffer } = offerSlice.actions;

  if (isSuccess) {
    return (
      <>
        <div className="list">
          <div className="list2">
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
        <button onClick={refetch}>refresh</button>
        {isFetching && <span>loading</span>}
      </>
    );
  }

  return <pre>loading</pre>
};

export default List;
