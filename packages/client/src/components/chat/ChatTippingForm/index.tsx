import React, { ChangeEventHandler, FC, FormEventHandler, useCallback, useMemo } from 'react';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { ButtonColor, CoinType } from '@betnomi/libs/types';
import { AmountInput } from '@betnomi/libs/components/AmountInput';
import Button from '@betnomi/libs/components/Button';
import { Option } from '@betnomi/libs/components/Autocomplete';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { ChatTotalValue } from '../ChatTotalValue';
import { ChatMinValue } from '../ChatMinValue';
import { UserAutocomplete } from '../../../containers/inputs/UserAutocomplete';
import { Checkbox } from '../../../../../libs/components';

type InputField = 'coin' | 'amount' | 'recipientLabel' | 'recipientValue';

interface IProps {
  coin: CoinType;
  amount?: number;
  min: number;
  balance: number;
  recipientLabel: string;
  recipientValue: string;
  errors: Partial<Record<InputField, string>>;
  touched: Partial<Record<InputField, boolean>>;
  excludeUser?: string;
  formClassName?: string;
  amountClassName?: string;
  submitClassName?: string;
  isPrivate: boolean;

  onTouchAmount: (e: any) => void;
  onTouchCoin: (e: any) => void;
  onTouchRecipient: (e: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onRecipientLabelChange: (val: string) => void;
  onRecipientValueChange: (val: string) => void;
  onChangeCoin: (val: CoinType) => void;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  onChangePrivate: (val: boolean) => void;
}

const ChatTippingForm: FC<IProps> = ({ coin,
  amount,
  balance,
  min,
  recipientLabel,
  recipientValue,
  touched,
  errors,
  isPrivate,
  excludeUser,
  formClassName,
  amountClassName,
  submitClassName,
  onTouchAmount,
  onTouchRecipient,
  onSubmit,
  onChangeCoin,
  onChangeAmount,
  onRecipientLabelChange,
  onRecipientValueChange,
  onChangePrivate }) => {
  const { t } = useTranslation('main');

  const recipient = useMemo<Option>(() => ({ label: recipientLabel, value: recipientValue }), [
    recipientLabel,
    recipientValue,
  ]);

  const onRecipientChange = useCallback(
    (value: Option) => {
      onRecipientLabelChange(value.label);
      onRecipientValueChange(value.value);
    },
    [onRecipientLabelChange, onRecipientValueChange],
  );

  const exclude = useMemo(() => (excludeUser ? [excludeUser] : undefined), [excludeUser]);

  return (
    <form className={classNames(styles.form, formClassName)} onSubmit={onSubmit}>
      <CoinSelect selected={coin} onSelect={onChangeCoin} />

      <AmountInput
        amount={amount}
        balance={balance}
        onChangeAmount={onChangeAmount}
        hasError={!!(errors.amount && touched.amount)}
        onBlur={onTouchAmount}
        min={0}
      />

      <ChatMinValue min={min} coin={coin} />

      <UserAutocomplete
        value={recipient}
        onChange={onRecipientChange}
        label={t('Username or Email')}
        hasError={!!(errors.recipientValue && touched.recipientValue)}
        onBlur={onTouchRecipient}
        exclude={exclude}
        className={styles.background}
      />

      <div className={styles.private}>
        <Checkbox checked={isPrivate} onCheck={onChangePrivate}>
          {t('Make tip private (will not appear on global chat)')}
        </Checkbox>
      </div>

      <hr />

      <div className={classNames(styles.total, amountClassName)}>
        <ChatTotalValue total={amount || 0} coin={coin} />
      </div>

      <Button color={ButtonColor.Primary} type="submit" className={classNames(submitClassName, styles.btn)}>
        {t('Send a tip')}
      </Button>
    </form>
  );
};

export { ChatTippingForm };
