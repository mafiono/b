import React, { FC } from 'react';
import { CoinType } from '@betnomi/libs/types';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface Props {
  coin: CoinType;
  spotBalance: number;
  minWithdrawal: number;
  feeMin: number;
  feeMax: number;
  limit: number;
  limitLeft: number;
  precision?: number;
}

const WalletWithdrawOtherThings: FC<Props> = ({
  coin,
  spotBalance,
  feeMax,
  feeMin,
  minWithdrawal,
  precision,
  limitLeft,
  limit,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.list}>
      <div className={styles.row}>
        <div className={styles.label}>
          {t('{{coin}} spot balance', { coin })}
        </div>

        <div className={styles.value}>
          {spotBalance.toFixed(precision)}
          {' '}
          {coin}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          {t('Minimum withdrawal')}
        </div>

        <div className={styles.value}>
          {minWithdrawal.toFixed(precision)}
          {' '}
          {coin}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          {t('Network fee')}
        </div>

        <div className={styles.value}>
          {feeMin.toFixed(precision)}
          {' ~ '}
          {feeMax.toFixed(precision)}
          {' '}
          {coin}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          {t('24h remaining limit')}
        </div>

        <div className={styles.value}>
          {limit.toFixed(precision)}
          {' '}
          {coin}
          {' / '}
          {limitLeft.toFixed(precision)}
          {' '}
          {coin}
        </div>
      </div>
    </div>
  );
};

export { WalletWithdrawOtherThings };
