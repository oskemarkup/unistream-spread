import React from 'react';

import api from 'store/api';

import logo from './logo-ru.svg';

const UnistreamRates = () => {
  const { isSuccess, data: prices, refetch, isFetching } = api.useGetUnistreamRateQuery();

  if (!isSuccess) {
    return (
      <div>
        Загрузка курса юнистрим
      </div>
    );
  }

  return (
    <div className="uniheader">
      <img className="uniLogo" src={logo} alt="" />
      <button disabled={prices[0] > prices[1]}>{prices[0]}<span>Без промокода</span></button>
      <button disabled={prices[1] > prices[0]}>{prices[1]}<span>Промокод &laquo;мц&raquo;</span></button>
      <button onClick={refetch}>refresh</button>
      {isFetching && <span>loading</span>}
    </div>
  );
};

export default UnistreamRates;
