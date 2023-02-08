import React from 'react';
import Coin from '@betnomi/libs/components/Coin';
import { CoinType } from '@betnomi/libs/types';
import styles from './styles.module.scss';

type MoneyProp = {
  coin: CoinType,
  value: number,
};

export const SportsBetRowMoney: React.FC<MoneyProp> = ({ coin, value }) => (
  <div className={styles.money}>
    <span>{`$ ${value}`}</span>
    <Coin coin={coin} size={16} className={styles.coin} />
  </div>
);
