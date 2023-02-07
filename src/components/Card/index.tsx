import React from 'react';

import { BinanceCard } from 'utils/types';

type CardProps = BinanceCard & {
  isActive: boolean,
  onClick: () => void,
};

const Card = (props: CardProps) => {
  return (
    <div
      className={[ 'card', props.isActive && 'activeCard' ].filter(Boolean).join(' ')}
      onClick={props.onClick}
    >
      <p>{props.rate} P</p>
      <p>{props.min} - {props.max} ({props.amount} USDT)</p>
      <p>{props.nickname} | {props.deals} | {props.percentage}%</p>
    </div>
  );
};

export default Card;
