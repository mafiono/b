import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

interface IProps {
  checked: boolean;
  onCheck: (val: boolean) => void;
  className?: string;
  hasError?: boolean;
  disabled?: boolean;
}

const RadioButton: FC<IProps> = ({
  checked, onCheck, children, className, hasError, disabled,
}) => {
  const onMouseDown = useCallback((event) => {
    if (disabled) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    onCheck(!checked);
  }, [checked, disabled]);

  return (
    <button
      className={classNames(
        styles.checkbox, className,
        { [styles.checked]: checked },
        { [styles.disabled]: disabled },
      )}
      onMouseDown={onMouseDown}
      type="button"
    >
      <span className={classNames(styles.inner, { [styles.error]: hasError })}>
        {checked && <i className={styles.inner_circle} />}
        {disabled && !checked && 
        <FontIcon name={FontIconName.Close} size={12} className={styles.close} />}
      </span>
      {!!children && <div className={styles.label}>{children}</div>}
    </button>
  );
};

export { RadioButton };
