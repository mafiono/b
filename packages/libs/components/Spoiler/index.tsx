import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

type Props = {
  title: JSX.Element | string;
  openedByDefault?: boolean;
};

export const Spoiler: React.FC<Props> = ({
  title, children, openedByDefault = false,
}) => {
  const [isOpen, setOpen] = useState(openedByDefault);

  const toggleOpen = useCallback(() => setOpen(!isOpen), [isOpen]);

  return (
    <div className={cx(
      styles.wrap,
      { [styles.active]: isOpen },
    )}
    >
      <button
        onClick={toggleOpen}
        className={styles.button}
        type="button"
      >
        {title}
        <div className={styles.arrow}>
          <FontIcon
            name={FontIconName.IconArrowBottom}
            size={12}
          />
        </div>
      </button>
      {isOpen && (
      <div className={styles.hide}>
        {children}
      </div>
      )}
    </div>
  );
};
