import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ButtonColor, coinOrder, CoinType } from '../../../types';
import Coin from '../../Coin';
import styles from './styles.module.scss';
import Button from '../../Button';
import { FontIcon, FontIconName } from '../../FontIcon';
import { Balance } from '../../Balance';
import { Toggle } from '../../Toggle';

interface Props {
  balances: Partial<Record<CoinType, number>>;
  selected: CoinType;
  rates: Partial<Record<CoinType, number>>;
  onSelect: (val: CoinType) => void;
  onDepositClick: () => void;
  onSettingsClick: () => void;
  viewInUSD: boolean
  setViewInUSD: (value: boolean) => void
}

const Row: FC<{
  coin: CoinType;
  balance: number;
  rate: number;
  withRates: boolean;
}> = ({
  coin, balance, rate, withRates, 
}) => (
  <>
    <Coin coin={coin} size={16} />

    <div className={styles.coin_name}>{coin}</div>

    {withRates ? (
      <div className={styles.coin_rate}>
        <div className={styles.coin_in_usd}>
          $
          <Balance value={rate * balance} precision={6} />
        </div>

        <div className={styles.coin_rate_balance}>
          <Balance value={balance} />
        </div>
      </div>
    ) : (
      <div className={styles.coin_balance}>
        <Balance value={balance} />
      </div>
    )}
  </>
);

const WalletSelectPopup: FC<Props> = ({
  balances,
  rates,
  selected,
  onSelect,
  onDepositClick,
  onSettingsClick,
  viewInUSD,
  setViewInUSD,
}) => {
  const { t } = useTranslation('main');
  const [hovered, setHovered] = useState<CoinType>(selected);

  const toggleWithRates = useCallback(() => setViewInUSD(!viewInUSD), [
    viewInUSD,
    setViewInUSD,
  ]);

  return (
    <div className={styles.list}>
      <div className={styles.head}>
        <div>{t('Your coins')}</div>
        <Button
          color={ButtonColor.Primary}
          size={32}
          className={styles.deposit}
          type="button"
          onMouseDown={onDepositClick}
        >
          {t('Deposit')}
        </Button>
      </div>

      <div
        className={styles.coins}
        onMouseOut={() => setHovered(selected)}
        onBlur={() => setHovered(selected)}
      >
        {coinOrder.map((coin) => (
          <button
            className={classNames(styles.coin, {
              [styles.with_rate]: viewInUSD,
            })}
            onMouseDown={() => onSelect(coin)}
            onMouseOver={() => setHovered(coin)}
            onFocus={() => setHovered(coin)}
            key={coin}
          >
            <Row
              coin={coin}
              balance={balances[coin] || 0}
              rate={rates[coin] || 0}
              withRates={viewInUSD}
            />
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.settings} type="button" onMouseDown={onSettingsClick}>
          <FontIcon name={FontIconName.Settings} size={16} />
        </button>

        <div className={styles.price}>
          <div className={styles.price_row}>
            {hovered ? (
              <>
                <span className={styles.gray}>
                  {t('{{coin}} price', { coin: hovered })}
                  {': '}
                </span>
                <span>
                  <span className={styles.dollar}>$</span>
                  {hovered ? parseFloat(rates[hovered]?.toFixed(4) || '') : 0}
                </span>
              </>
            ) : (
              <span> </span>
            )}
          </div>
          <div className={styles.price_row}>
            <span className={styles.gray}>{t('View in')}</span>
            <span>USD</span>
            <span className={styles.toggle}>
              <Toggle value={viewInUSD} onChange={toggleWithRates} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WalletSelectPopup };
