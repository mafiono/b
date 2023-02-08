import React, { ChangeEventHandler, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isNil } from 'ramda';
import { FontIcon, FontIconName } from '../FontIcon';
import { TextInput, TextInputProps } from '../TextInput';
import styles from './styles.module.scss';

interface IProps extends TextInputProps {
  amount?: number;
  balance: number;
  precision?: number;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
}

const AmountInput: FC<IProps> = ({ balance, amount, onChangeAmount, precision = 8, ...props }) => {
  const { t } = useTranslation('main');
  const count = useMemo(() => parseFloat((balance || 0).toFixed(precision)), [balance, precision]);
  const Balance = () => <p className={styles.balance}>{t('Balance {{count}}', { count })}</p>;
  return (
    <TextInput
      left={<FontIcon name={FontIconName.Bitcoin} size={16} />}
      right={!amount ? <Balance /> : <></>}
      type="number"
      onChange={onChangeAmount}
      placeholder={props.placeholder || t('Amount')}
      min={0}
      step="any"
      value={isNil(amount) ? '' : amount}
      className={styles.icon}
      {...props}
    />
  );
};

export { AmountInput };
