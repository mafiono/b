import React, { FC, useCallback } from 'react';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useTranslation } from '../../../../i18n';
import { WalletDepositForm } from '../../../../components/wallet/WalletDepositForm';
import { useProfileDepositFormik } from '../../../../hooks/formik/useProfileDepositFormik';

interface Props {
  isMobile: boolean;
}

export const ProfileWalletDeposit: FC<Props> = ({ isMobile }) => {
  const { t } = useTranslation('profile');
  const { showSuccessToast } = useToasts();

  const { formik: { values, handleChange },
    isLoadingDepositAddress,
    depositAddress,
    balance,
    networks,
    arrivalTime } = useProfileDepositFormik();

  const onAddressCopy = useCallback(() => showSuccessToast(t('The address was copied to your clipboard')), [
    showSuccessToast,
  ]);

  return (
    <div>
      <WalletDepositForm
        coin={values.coin}
        network={values.network}
        depositAddress={depositAddress}
        balance={balance}
        networks={networks}
        arrivalTime={arrivalTime}
        onChangeCoin={handleChange('coin')}
        onChangeNetwork={handleChange('network')}
        onAddressCopy={onAddressCopy}
        isLoadingDepositAddress={isLoadingDepositAddress}
        isMobile={isMobile}
      />
    </div>
  );
};
