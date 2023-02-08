import React, { FC, useCallback, useMemo, ButtonHTMLAttributes } from 'react';
import { coinNames, CoinType } from '@betnomi/libs/types';
import { Option, Select } from '@betnomi/libs/components/Select';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

interface Props {
  coins: CoinType[];
  onSelect: (val: CoinType) => void;
  selected?: CoinType;
  disabled?: boolean;
  className?: string;
}

const valueRenderer = (val: Option<CoinType>) => (
  <div className={styles.value}>
    <div className={styles.value__name}>
      {val.value}
    </div>
    <div className={styles.value__coin}>
      {coinNames[val.value]}
    </div>
  </div>
);

const optionRenderer = (val: Option<CoinType>) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.option}>
      <div className={styles.option__left}>
        <div className={styles.option__name}>
          {val.value}
        </div>

        <div className={styles.option__label}>
          {coinNames[val.value]}
        </div>
      </div>

      <div className={styles.option__right}>
        <span className={styles.arrival}>{t('Arrival time')}</span>
        {' '}
        <span className={styles.arrival__mins}>{t('≈ {{count}} mins', { count: 2 })}</span>
      </div>
    </div>
  );
};

const WalletSelectNetwork: FC<Props> = ({
  coins, selected, onSelect, disabled, className
}) => {
  const { t } = useTranslation('profile');

  const variants = useMemo(
    () => coins.map((coin) => ({ label: coinNames[coin], value: coin })),
    [coins],
  );

  const value = useMemo(
    () => selected && variants.find((item) => item.value === selected),
    [variants, selected],
  );

  const onChange = useCallback(
    (val: Option<CoinType>) => {
      onSelect(val.value);
    },
    [onSelect],
  );

  return (
    <Select
      variants={variants}
      value={value}
      onChange={onChange}
      placeholder={t('Network')}
      valueRenderer={valueRenderer}
      optionRenderer={optionRenderer}
      disabled={disabled}
      className={className}
    />
  );
};

export { WalletSelectNetwork };
