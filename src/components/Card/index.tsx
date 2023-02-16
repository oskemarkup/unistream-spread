import React from 'react';
import classNames from 'classnames';

import { BinanceCard } from 'utils/types';

import styles from './style.module.css';

type CardProps = BinanceCard & {
  isActive: boolean,
  onClick: () => void,
};

const Card = (props: CardProps) => {
  return (
    <div
      className={classNames(styles.card, props.isActive && styles.card_active)}
      onClick={props.onClick}
    >
      <div className={styles.header}>
        <p className={styles.rate}>{props.rate}₽</p>
        <p>{props.banks.join(' | ')}</p>
      </div>
      <p>{props.min} - {props.max} ({props.amount} USDT)</p>
      <p>{props.nickname} | {props.deals} | {Number(props.percentage.toFixed(2))}%</p>
    </div>
  );
};

export default Card;
