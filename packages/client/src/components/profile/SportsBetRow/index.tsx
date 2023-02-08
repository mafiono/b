import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { CoinType } from '@betnomi/libs/types';
import { SportsBetDescriptionRow } from '../SportsBetDescriptionRow';
import { SportsBetRowMoney } from '../SportsBetRowMoney';
import { SportsBetRowResult } from '../SportsBetRowResult';
import { BetResult } from '../../../constants/BetResult';
import styles from './styles.module.scss';

type SportsBetRowProps = {
  date: string,
  id: string,
  betType: string,
  stake: {
    coin: CoinType,
    value: number,
  }
  potentialWin: {
    coin: CoinType,
    value: number,
  },
  result: {
    type: BetResult,
    label: string,
    price?: string,
  }
  items?: {
    startTime: string;
    gameName: {
      label: string;
      icon: FontIconName;
    }
    bet: string;
    odds: number;
  }[]
};

export const SportsBetRow: React.FC<SportsBetRowProps> = ({
  date, id, betType, items, stake, potentialWin, result,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div className={cx(styles.out, { [styles.open]: isOpen })}>
      <div className={styles.row}>
        <div className={styles.cell}>
          {date}
        </div>
        <div className={styles.cell}>
          {id}
        </div>
        <div className={styles.cell}>
          {betType}
        </div>
        <div className={styles.cell}>
          <SportsBetRowMoney coin={stake.coin} value={stake.value} />
        </div>
        <div className={styles.cell}>
          <SportsBetRowMoney coin={potentialWin.coin} value={potentialWin.value} />
        </div>
        <SportsBetRowResult type={result.type} label={result.label} price={result.price} />
        <div className={styles.social_group}>
          <FontIcon name={FontIconName.Facebook} size={16} />
          <FontIcon name={FontIconName.Telegram} size={16} />
          <FontIcon name={FontIconName.Twitter} size={16} />
        </div>
        <button
          onClick={toggleOpen}
          type="button"
        >
          <div className={styles.arrow}>
            <FontIcon
              name={FontIconName.IconArrowBottom}
              size={14}
            />
          </div>
        </button>
      </div>      
      {isOpen && items && (
      <div className={styles.description}>
        {items.map((el) => (
          <SportsBetDescriptionRow 
            key={el.startTime}
            startTime={el.startTime}
            gameName={el.gameName}
            bet={el.bet}
            odds={el.odds}
          />
        ))}
      </div>
      )}
    </div>
  );
};
