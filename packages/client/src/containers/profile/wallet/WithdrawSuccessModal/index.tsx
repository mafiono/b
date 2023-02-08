import React, { FC } from 'react';
import { ModalComponentProps } from '../../../../components/modal/Modal';
import { WalletWithdrawSecuritySuccess } from '../../../../components/wallet/WalletWithdrawSecuritySuccess';
import { useWithdrawConfirmFormik } from '../../../../hooks/formik/useWithdrawConfirmFormik';

interface Props extends ModalComponentProps {}

const WithdrawSuccessModal: FC<Props> = ({ onCloseModal }) => {
  const {
    coin, amount, fee, address, 
  } = useWithdrawConfirmFormik(); 

  return (
    <WalletWithdrawSecuritySuccess
      coin={coin}
      amount={amount}
      fee={fee}
      address={address}
      onClose={onCloseModal}
    />
  );
};

export { WithdrawSuccessModal };
