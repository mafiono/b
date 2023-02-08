import React, { FC } from 'react';
import { ModalComponentProps } from '../../../../components/modal/Modal';
import { WalletWithdrawSecurityConfirmation } from '../../../../components/wallet/WalletWithdrawSecurityConfirmation';
import { useWithdrawConfirmFormik } from '../../../../hooks/formik/useWithdrawConfirmFormik';

interface Props extends ModalComponentProps {
}

const WithdrawConfirmModal: FC<Props> = ({ onCloseModal }) => {
  const {
    coin, amount, address, formik, fee, isLoading, onRequestCode, email, 
  } = useWithdrawConfirmFormik();

  return (
    <WalletWithdrawSecurityConfirmation
      coin={coin}
      amount={amount}
      fee={fee}
      email={email}
      emailCode={formik.values.emailCode}
      googleCode={formik.values.googleCode}
      address={address}
      onChangeEmailCode={formik.handleChange('emailCode')}
      onChangeGoogleCode={formik.handleChange('googleCode')}
      onSubmit={formik.handleSubmit}
      onRequestCode={onRequestCode}
      onClose={onCloseModal}
      isLoading={isLoading}
    />
  );
};

export { WithdrawConfirmModal };
