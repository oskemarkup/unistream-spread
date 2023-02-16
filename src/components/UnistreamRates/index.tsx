import React from 'react';

import api from 'store/api';

import logo from './logo.svg';
import refreshIcon from './refresh.svg';
import styles from './style.module.css';

const UnistreamRates = () => {
  const { isLoading, isError, isSuccess, data: prices, refetch, isFetching } = api.useGetUnistreamRateQuery(undefined, {
    pollingInterval: 10 * 1000,
  });

  if (isLoading) {
    return (
      <div>
        Загрузка курса юнистрим
      </div>
    );
  } else if (isError) {
    return (
      <div>
        Ошибка при загрузке курса юнистрим
        <button onClick={refetch}>Загрузить заново</button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt="" />
      {isSuccess && (
        <>
          <div className={[styles.rate, prices[0] > prices[1] && styles.rate_disabled].filter(Boolean).join(' ')}>
            <span className={styles.rateValue}>{prices[0]}₽</span>
            <span className={styles.rateDescription}>Без промокода</span>
          </div>
          <div className={[styles.rate, prices[1] > prices[0] && styles.rate_disabled].filter(Boolean).join(' ')}>
            <span className={styles.rateValue}>{prices[1]}₽</span>
            <span className={styles.rateDescription}>Промокод &laquo;мц&raquo;</span>
          </div>
        </>
      )}
      {!isFetching && (
        <button className={styles.refresh} onClick={refetch}>
          <img className={styles.refreshIcon} src={refreshIcon} alt="" />
        </button>
      )}
    </div>
  );
};

export default UnistreamRates;
