import React, { ChangeEventHandler, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isNil } from 'ramda';
import classNames from 'classnames';
import { TextInput, TextInputProps } from '../TextInput';
import styles from './styles.module.scss';
import { CoinType } from '../../types';

interface IProps extends TextInputProps {
  amount?: number;
  max: number;
  precision?: number;
  coin: CoinType;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const WithdrawAmountInput: FC<IProps> = ({ max, amount, onChangeAmount, coin, ...props }) => {
  const { t } = useTranslation('main');

  const onClickMax = useCallback(() => onChangeAmount({ target: { value: max } } as any), [max, onChangeAmount]);

  return (
    <TextInput
      right={(
        <span className={styles.right}>
          <button className={styles.max} type="button" onClick={onClickMax}>
            {t('MAX')}
          </button>

          <button className={styles.coin} type="button">
            {coin}
          </button>
        </span>
      )}
      type="number"
      onChange={onChangeAmount}
      placeholder={props.placeholder || t('Amount')}
      min={0}
      step="any"
      value={isNil(amount) ? '' : amount}
      className={classNames(styles.mobile_margin, styles.background)}
      {...props}
    />
  );
};

export { WithdrawAmountInput };
