import React, { FC, useMemo } from 'react';
import {useHistory} from "react-router-dom"
import { keys } from 'ramda';
import classNames from 'classnames';
import { Manager, Popper, Reference } from 'react-popper';
import { CoinType } from '../../../types';
import Coin from '../../Coin';
import { FontIcon, FontIconName } from '../../FontIcon';
import styles from './styles.module.scss';
import { PopperArrow } from '../../PopperArrow';
import { useFocusEvent } from '../../../hooks/useFocusEvent';
import { usePopperDropdown } from '../../../hooks/ui/usePopperDropdown';
import { WalletSelectPopup } from '../WalletSelectPopup';
import { Balance } from '../../Balance';
import {HeaderToggleButton} from "@betnomi/client/src/components/layout/HeaderToggleButton";

export interface WalletSelectProps {
  balances: Partial<Record<CoinType, number>>;
  rates: Partial<Record<CoinType, number>>;
  selected: CoinType;
  onChange: (val: CoinType) => void;
  onDepositClick: () => void;
  onSettingsClick: () => void;
  viewInUSD: boolean
  setViewInUSD: (value: boolean) => void
}

const WalletSelect: FC<WalletSelectProps> = ({
  balances,
  selected,
  rates,
  onChange,
  onDepositClick,
  onSettingsClick,
  setViewInUSD,
  viewInUSD,
}) => {
  const { focused, onFocus, onBlur } = useFocusEvent();
  const modifiers = usePopperDropdown(0, 25);
  const history = useHistory();

  const selectedCoin = useMemo(
    () => (keys(balances).includes(selected) ? selected : ''),
    [selected, balances],
  );
  
  const balance = useMemo(() => {
    if (viewInUSD) {
      return (rates[selected] || 0) * (balances[selected] || 0);
    }
    
    return balances[selected] || 0;
  }, [balances, rates, viewInUSD, selected]);

  return (
      <div className={styles.wrap}>
        <div className={styles.manager}>
          <Manager>
            <Reference>
              {({ ref }) => (
                  <button
                      className={styles.widget}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      ref={ref}
                  >
                    <div className={styles.selected}>
                      {!!selectedCoin && <Coin coin={selected} size={16} />}

                      <span>{selectedCoin}</span>

                      <FontIcon name={FontIconName.IconArrowBottom} size={12} />
                    </div>
                    <div className={styles.balance}>
                      {viewInUSD && (<span>$</span>)}
                      <Balance value={balance} precision={6} />
                    </div>
                  </button>
              )}
            </Reference>

            <Popper modifiers={modifiers}>
              {({ ref, style, arrowProps }) => (
                  <div
                      className={classNames(styles.floating, {
                        [styles.hidden]: !focused || keys(balances).length === 0,
                      })}
                      ref={ref}
                      style={style}
                  >
                    <PopperArrow props={arrowProps} />
                    <WalletSelectPopup
                        onSelect={onChange}
                        balances={balances}
                        rates={rates}
                        selected={selected}
                        onDepositClick={onDepositClick}
                        onSettingsClick={onSettingsClick}
                        viewInUSD={viewInUSD}
                        setViewInUSD={setViewInUSD}
                    />
                  </div>
              )}
            </Popper>
          </Manager>
        </div>

        <HeaderToggleButton
            onClick={() => {history.push('/profile/wallet')}}
            icon={FontIconName.Wallet}
            className={styles.wallet}
        />
      </div>
  );
};

export { WalletSelect };
