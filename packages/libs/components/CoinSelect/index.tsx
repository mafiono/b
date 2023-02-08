import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import classNames from 'classnames';
import { coinNames, coinOrder, CoinType } from '../../types/ui';
import { TextInputWrap } from '../TextInputWrap';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from '../FontIcon';
import Coin from '../Coin';
import { useFocusEvent } from '../../hooks/useFocusEvent';
import { usePopperDropdown } from '../../hooks/ui/usePopperDropdown';

interface IProps {
  selected: CoinType;
  onSelect: (val: CoinType) => void;
  disabled?: boolean;
  withName?: boolean;
  withLine?: boolean;
  className?: string;
}

interface RowProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  coin: CoinType;
  withName?: boolean;
  withLine?: boolean;
  className?: string;
}

const Row: FC<RowProps> = ({ coin, withName, withLine, ...props }) => (
  <button className={styles.button} {...props} type="button">
    <div className={styles.icon}>
      <Coin coin={coin} size={16} />
      {withLine && <div className={styles.line} />}
    </div>

    <div className={styles.name}>{coinNames[coin]}</div>

    {withName && <div className={styles.type}>{coin}</div>}
  </button>
);

const CoinSelect: FC<IProps> = ({ selected, onSelect, disabled, withName, withLine, className }) => {
  const { onFocus, onBlur, focused } = useFocusEvent();
  const modifiers = usePopperDropdown(0, 10, true);
  return (
    <Manager>
      <TextInputWrap className={className}>
        <Reference>
          {({ ref }) => (
            <div className={classNames(styles.select)} ref={ref}>
              <Row
                coin={selected}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                withName={withName}
                withLine={withLine}
              />
              <button className={styles.icon} onFocus={onFocus} onBlur={onBlur} disabled={disabled} type="button">
                <FontIcon name={FontIconName.IconArrowBottom} size={16} />
              </button>
            </div>
          )}
        </Reference>
      </TextInputWrap>

      <Popper modifiers={modifiers} placement="bottom-start">
        {({ ref, style }) => (
          <div className={classNames(styles.float, { [styles.hidden]: !focused })} ref={ref} style={style}>
            <div className={styles.list}>
              {coinOrder
                .filter((coin) => coin !== selected)
                .map((coin) => (
                  <Row coin={coin} onMouseDown={() => onSelect(coin)} key={coin} withName={withName} />
                ))}
            </div>
          </div>
        )}
      </Popper>
    </Manager>
  );
};
export { CoinSelect };
