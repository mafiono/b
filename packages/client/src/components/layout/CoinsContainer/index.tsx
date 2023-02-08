import React from 'react';
import { Coin } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types/ui';
import { values } from 'ramda';
import styles from './styles.module.scss';

const CoinsContainer:React.FC<{isMobile?: boolean}> = ({isMobile}) => (
  <div className={styles.container}>
    {values(CoinType).map((el) => (
      <Coin
        coin={el}
        key={el}
        className={styles.coin}
        size={isMobile ? 24 : 44}
      />
    )).slice(0, -3)}
  </div>
);

export default CoinsContainer;
