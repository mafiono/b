import React, { FC } from 'react';
import { CoinType } from '@betnomi/libs/types';
import styles from './styles.module.scss';

interface IProps {
  total: number
  coin: CoinType
  precision?: number
}

const ChatTotalValue: FC<IProps> = ({ total, coin, precision = 8 }) => {
  const amount = parseFloat((total || 0).toFixed(precision));

  return (
    <div className={styles.total}>
      <span className={styles.total_amount}>{amount}</span>
      <span className={styles.total_coin}>{coin}</span>
    </div>
  );
};

export { ChatTotalValue };
