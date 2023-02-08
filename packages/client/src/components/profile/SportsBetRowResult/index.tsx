import React from 'react';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { BetResult } from '../../../constants/BetResult';
import styles from './styles.module.scss';

const sportResultIcons: Record<BetResult | string, FontIconName> = {
  [BetResult.Win]: FontIconName.Bitcoin,
  [BetResult.Returned]: FontIconName.Returned,
  [BetResult.Lost]: FontIconName.Lost,
  [BetResult.CashOut]: FontIconName.CashOut,
  [BetResult.UnSettled]: FontIconName.Unsettled,
  [BetResult.UnSettledPrice]: FontIconName.Bitcoin,
};

type Props = {
  type: BetResult,
  label: string,
  price?: string,
};

export const SportsBetRowResult:React.FC<Props> = ({ type, label, price }) => (
  <div className={cx(styles.result, styles[type])}>
    <FontIcon name={sportResultIcons[type]} size={16} />
    <div className={styles.label}>
      {price && <span className={styles.price}>{`$ ${price} - `}</span>}
      {label}
    </div>
  </div>
); 
