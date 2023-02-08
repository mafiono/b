import React, { FC, ReactNode } from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import classNames from 'classnames';
import { Placement } from '@popperjs/core';
import { PopperUpdater } from '@betnomi/client/src/components/layout/PopperUpdater';
import { useFocusEvent } from '../../hooks/useFocusEvent';
import styles from './styles.module.scss';
import { usePopperDropdown } from '../../hooks/ui/usePopperDropdown';

interface IProps {
  label: ReactNode;
  offset?: number;
  placement?: Placement;
  deps?: any[];
  delay?: number;
}

const Dropdown: FC<IProps> = ({
  label, placement, offset = 0, children,
  deps, delay,
}) => {
  const { onFocus, focused, onBlur } = useFocusEvent();
  const modifiers = usePopperDropdown(0, offset);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button ref={ref} onFocus={onFocus} onBlur={onBlur} type="button" className={styles.button}>
            {label}
          </button>
        )}
      </Reference>

      <Popper modifiers={modifiers} placement={placement}>
        {({ ref, style, update }) => (
          <PopperUpdater update={update} deps={deps} delay={delay}>
            <div
              ref={ref}
              style={style}
              className={classNames(styles.popper, { [styles.hidden]: !focused })}
            >
              {children}
            </div>
          </PopperUpdater>
        )}
      </Popper>
    </Manager>
  );
};

export { Dropdown };
