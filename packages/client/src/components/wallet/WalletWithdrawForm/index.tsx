/* eslint-disable max-len */
import React, { ChangeEventHandler, FC, FormEventHandler, useMemo } from 'react';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { CoinType } from '@betnomi/libs/types';
import { TextInput } from '@betnomi/libs/components/TextInput';
import cx from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { withdrawPairs } from '../../../constants/withdraw';
import { WalletWithdrawFormAmount } from '../WalletWithdrawFormAmount';
import { WalletSelectNetwork } from '../WalletSelectNetwork';
import { WalletWithdrawOtherThings } from '../WalletWithdrawOtherThings';

interface Props {
  coin: CoinType;
  targetCoin?: CoinType;
  balance: number;
  limit: number;
  limitLeft: number;
  total: number;
  fee: number;
  errors: Record<any, any>;
  touched: Record<any, any>;
  address: string;
  amount?: number;
  isLoading: boolean;

  onChangeCoin: (val: CoinType) => void;
  onChangeNetwork: (val: CoinType) => void;
  onChangeAddress: ChangeEventHandler<HTMLInputElement>;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  onTouchAddress: (e: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>
}

const WalletWithdrawForm: FC<Props> = ({ coin,
  targetCoin,
  balance,
  limit,
  limitLeft,
  total,
  fee,
  errors,
  touched,
  address,
  amount,
  isLoading,
  onChangeCoin,
  onTouchAddress,
  onChangeAddress,
  onChangeAmount,
  onChangeNetwork,
  onSubmit }) => {
  const { t } = useTranslation('profile');
  const targets = useMemo(() => withdrawPairs[coin], [coin]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={cx(styles.label)}>{t('Select Coin')}</div>
      <CoinSelect className={styles.mobile_margin} selected={coin} onSelect={onChangeCoin} withName disabled={isLoading} withLine />
      <div className={cx(styles.label)}>{t('Withdraw to')}</div>
      <TextInput
        placeholder="0x535B26df504dcBc12C6dbA49fB1F05dA05a44381"
        value={address}
        onChange={onChangeAddress}
        onBlur={onTouchAddress}
        hasError={!!(errors.address && touched.address)}
        disabled={isLoading}
        className={styles.mobile_margin}
      />

      {!!targets && (
        <WalletSelectNetwork
          coins={targets}
          selected={targetCoin} 
          onSelect={onChangeNetwork}
          disabled={isLoading}
          className={cx(styles.custom_background, styles.mobile_margin)}
        />
      )}

      {!targets || targetCoin ? (
        <WalletWithdrawFormAmount
          total={total}
          balance={balance}
          coin={coin}
          amount={amount}
          errors={errors}
          touched={touched}
          limit={limit}
          limitLeft={limitLeft}
          fee={fee}
          onChangeAmount={onChangeAmount}
          isLoading={isLoading}
        />
      ) : (
        <WalletWithdrawOtherThings
          coin={coin}
          spotBalance={0}
          minWithdrawal={0}
          feeMin={0}
          feeMax={0}
          limit={0}
          limitLeft={0}
        />
      )}
    </form>
  );
};

export { WalletWithdrawForm };
