import React, { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { ButtonColor, CoinType } from '@betnomi/libs/types';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { Button } from '@betnomi/libs/components';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { WalletWithdrawSecuritySummary } from '../WalletWithdrawSecuritySummary';
import { HocModal } from '../../modal/HocModal';

interface Props {
  coin: CoinType;
  amount: number;
  fee: number;
  email: string;
  emailCode: string;
  googleCode: string;
  address: string;
  precision?: number;
  isLoading: boolean;
  onChangeEmailCode: ChangeEventHandler<HTMLInputElement>;
  onChangeGoogleCode: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onRequestCode: () => void;
  onClose: () => void;
}

const RequestCode: FC<{ onRequestCode: () => void }> = ({ onRequestCode }) => {
  const { t } = useTranslation('profile');

  return (
    <button
      onClick={onRequestCode}
      type="button"
      className={styles.request_code}
    >
      {t('Click to get code')}
    </button>
  );
};

const WalletWithdrawSecurityConfirmation: FC<Props> = ({
  coin,
  amount,
  precision = 8,
  fee,
  emailCode,
  googleCode,
  email,
  address,
  isLoading,
  onChangeEmailCode,
  onChangeGoogleCode,
  onSubmit,
  onRequestCode,
  onClose,
}) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      onClose={onClose}
      title={
        <span className={styles.header}>{t('Security verification')}</span>
      }
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <WalletWithdrawSecuritySummary
          address={address}
          coin={coin}
          amount={amount}
          precision={precision}
          fee={fee}
        />

        <div className={styles.label}>{t('E-mail verification code')}</div>

        <TextInput
          placeholder={t('Enter code')}
          right={<RequestCode onRequestCode={onRequestCode} />}
          onChange={onChangeEmailCode}
          value={emailCode}
          disabled={isLoading}
        />

        <div className={styles.caption}>
          {t('Enter the 6 digit code received by')}
          &nbsp;
          <span className={styles.bold}>{email}</span>
        </div>

        <hr />

        <div className={styles.label}>{t('Google verification code')}</div>

        <TextInput
          placeholder={t('Enter code')}
          onChange={onChangeGoogleCode}
          value={googleCode}
          disabled={isLoading}
        />

        <div className={styles.caption}>
          {t('Enter the 6 digit code from Google Authenticator.')}
        </div>

        <Button
          color={ButtonColor.Primary}
          disabled={!googleCode && !emailCode}
          fullWidth
          size={52}
          className={styles.submit}
          isLoading={isLoading}
          type="submit"
        >
          {t('Submit')}
        </Button>
      </form>
    </HocModal>
  );
};

export { WalletWithdrawSecurityConfirmation };
