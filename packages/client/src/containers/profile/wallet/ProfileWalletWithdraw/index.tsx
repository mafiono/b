import React, { FC } from 'react';
import { WalletWithdrawForm } from '../../../../components/wallet/WalletWithdrawForm';
import { useProfileWithdrawFormik } from '../../../../hooks/formik/useProfileWithdrawFormik';
import styles from './styles.module.scss';

interface Props {}

const ProfileWalletWithdraw: FC<Props> = () => {
  const {
    formik: {
      values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
    },
    balance,
    limit,
    limitLeft,
    total,
    fee,
  } = useProfileWithdrawFormik();

  return (
    <div className={styles.form}>
      <WalletWithdrawForm
        coin={values.coin}
        balance={balance}
        limit={limit}
        limitLeft={limitLeft}
        total={total}
        amount={values.amount}
        fee={fee}
        errors={errors}
        touched={touched}
        address={values.address}
        targetCoin={values.network}
        isLoading={isSubmitting}
        onChangeCoin={handleChange('coin')}
        onChangeNetwork={handleChange('network')}
        onChangeAddress={handleChange('address')}
        onChangeAmount={handleChange('amount')}
        onTouchAddress={handleBlur('address')}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { ProfileWalletWithdraw };
