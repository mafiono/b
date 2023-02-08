import React, { FC } from 'react';
import { Coin } from '@betnomi/libs/components';
import { coinNames, CoinType } from '@betnomi/libs/types';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface Props {
  coin: CoinType;
  amount: number;
  fee: number;
  address: string;
  precision?: number;
}

const WalletWithdrawSecuritySummary: FC<Props> = ({
  coin,
  amount,
  address,
  precision,
  fee,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.summary}>
      <div className={styles.label}>{t('Amount')}</div>
      <div className={styles.value}>
        <Coin coin={coin} size={12} className={styles.coin} />
        <span>
          {t('Receive {{amount}} {{coin}} (Network fee {{fee}} {{coin}})', {
            amount: parseFloat(amount.toFixed(precision)),
            coin,
            fee: parseFloat(fee.toFixed(precision)),
          })}
        </span>
      </div>

      <div className={styles.label}>{t('Address')}</div>
      <div className={styles.value}>
        {address}
      </div>

      <div className={styles.label}>{t('Network')}</div>
      <div className={styles.value}>
        {coinNames[coin]}
      </div>
    </div>
  );
};

export { WalletWithdrawSecuritySummary };
