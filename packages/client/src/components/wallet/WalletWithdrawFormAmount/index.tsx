import React, { ChangeEventHandler, FC } from 'react';
import classNames from 'classnames';
import { WithdrawAmountInput } from '@betnomi/libs/components/WithdrawAmountInput';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Button } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types';
import styles from '../WalletWithdrawForm/styles.module.scss';
import { useTranslation } from '../../../i18n';

interface Props {
  balance: number;
  coin: CoinType;
  amount?: number;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  limit: number;
  limitLeft: number;
  total: number;
  fee: number;
  precision?: number;
  isLoading: boolean;
}

const WalletWithdrawFormAmount: FC<Props> = ({
  total,
  balance,
  coin,
  amount,
  errors,
  touched,
  limit,
  limitLeft,
  fee,
  precision = 8,
  isLoading,
  onChangeAmount,
}) => {
  const { t } = useTranslation('profile');

  return (
    <>
      <hr className={styles.mobile_margin}/>

      <div className={classNames(styles.label, styles.mobile_direction)}>
        <p className={styles.mobile_label_margin}>{t('Withdraw amount')}</p>
        <span className={classNames(styles.right)}>
          <span className={styles.white}>{`${balance} ${coin} `}
          </span>
          {t('available')}
          <FontIcon name={FontIconName.Info} size={16} />
        </span>
      </div>

      <WithdrawAmountInput
        amount={amount}
        max={balance}
        onChangeAmount={onChangeAmount}
        coin={coin}
        hasError={!!(errors.amount && touched.amount)}
        disabled={isLoading}
      />

      <div className={styles.label}>
        <span className={classNames(styles.right, styles.mobile_direction)}>
          <span className={styles.white}>
            {`${limitLeft} ${coin} / ${limit} ${coin} `}
          </span>
          <span>
          {t('24h remaining left')}
          </span>
        </span>
      </div>

      <hr className={styles.mobile_margin} />

      <div className={styles.label}>{t('Receive amount')}</div>

      <div className={classNames(styles.footer, styles.mobile_direction)}>
        <div className={styles.total}>
          {`${parseFloat(total.toFixed(precision))} ${coin}`}

          <div className={styles.fee}>
            {t('{{fee}} {{coin}} network fee included', { fee, coin })}

            <FontIcon name={FontIconName.Info} size={16} />
          </div>
        </div>

        <Button type="submit" size={52} isLoading={isLoading} className={styles.mobile_width}>
          {t('Withdraw')}
        </Button>
      </div>
    </>
  );
};

export { WalletWithdrawFormAmount };
