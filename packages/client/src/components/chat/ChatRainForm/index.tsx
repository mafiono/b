import React, { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { ButtonColor, CoinType } from '@betnomi/libs/types';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { TextArea } from '@betnomi/libs/components/TextArea';
import { Button } from '@betnomi/libs/components';
import { AmountInput } from '@betnomi/libs/components/AmountInput';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { ChatTotalValue } from '../ChatTotalValue';
import { ChatMinValue } from '../ChatMinValue';

type InputField = 'coin' | 'amount' | 'message' | 'persons';

interface IProps {
  coin: CoinType;
  balances: Partial<Record<CoinType, number>>;
  amount?: number;
  min: number;
  message: string;
  persons: number;
  errors: Partial<Record<InputField, string>>
  touched: Partial<Record<InputField, boolean>>
  isLoading: boolean

  onTouchAmount: (e: any) => void;
  onTouchMessage: (e: any) => void;
  onTouchPersons: (e: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChangeCoin: (val: CoinType) => void;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  onChangeMessage: ChangeEventHandler<HTMLTextAreaElement>;
  onChangePersons: ChangeEventHandler<HTMLInputElement>;
}

const ChatRainForm: FC<IProps> = ({
  coin,
  balances,
  amount,
  message,
  min,
  persons,
  errors,
  touched,
  isLoading,
  onTouchAmount,
  onTouchMessage,
  onTouchPersons,
  onSubmit,
  onChangeCoin,
  onChangeAmount,
  onChangeMessage,
  onChangePersons,
}) => {
  const { t } = useTranslation('main');
  const balance = balances[coin];

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <CoinSelect selected={coin} onSelect={onChangeCoin} disabled={isLoading} />

      <AmountInput
        amount={amount}
        balance={balance || 0}
        onChangeAmount={onChangeAmount}
        hasError={!!(errors.amount && touched.amount)}
        name="amount"
        onBlur={onTouchAmount}
        disabled={isLoading}
      />

      <ChatMinValue min={min} coin={coin} />

      <TextInput
        left={<FontIcon name={FontIconName.Users} size={16} />}
        right={t('1~100')}
        type="number"
        onChange={onChangePersons}
        value={persons || 0}
        placeholder={t('Number of people')}
        hasError={!!(errors.persons && touched.persons)}
        name="persons"
        onBlur={onTouchPersons}
        disabled={isLoading}
      />

      <TextArea
        className={styles.textarea}
        placeholder={t('Message (Optional)')}
        maxLength={32}
        value={message}
        onChange={onChangeMessage}
        hasError={!!(errors.message && touched.message)}
        name="message"
        onBlur={onTouchMessage}
        disabled={isLoading}
      />

      <div className={styles.total}>
        <ChatTotalValue total={amount || 0} coin={coin} />
      </div>

      <Button color={ButtonColor.Primary} fullWidth type="submit" isLoading={isLoading}>
        {t('Make it rain')}
      </Button>
    </form>
  );
};

export { ChatRainForm };
